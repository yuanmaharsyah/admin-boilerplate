<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia;
use Yuan\AdminCore\Audit\ImmutableActivity;
use Yuan\AdminCore\Exports\ExportStatus;
use Yuan\AdminCore\Exports\QueuedExport;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\artisan;
use function Pest\Laravel\get;
use function Pest\Laravel\getJson;
use function Pest\Laravel\travel;

// The signed-in user's queued downloads (/account/downloads).

uses(RefreshDatabase::class);

beforeEach(fn () => Storage::fake('local'));

/**
 * @param  array<string, mixed>  $attributes
 */
function download(User $user, array $attributes = []): QueuedExport
{
    $export = QueuedExport::query()->create([
        'user_id' => $user->id,
        'module' => 'invoices',
        'filters' => ['format' => 'xlsx'],
        'row_count' => 240,
        'status' => ExportStatus::Ready,
        'expires_at' => now()->addDay(),
        ...$attributes,
    ]);

    if ($export->status === ExportStatus::Ready && ! array_key_exists('path', $attributes)) {
        $export->update(['path' => "exports/{$export->id}/invoices.xlsx"]);
        Storage::disk('local')->put((string) $export->path, 'xlsx');
    }

    return $export;
}

function signedFileUrl(QueuedExport $export): string
{
    return (string) getJson("/account/downloads/{$export->id}/url")->assertOk()->json('url');
}

it('redirects guests to login', function (): void {
    get('/account/downloads')->assertRedirect(route('login'));
});

it('lists only the user\'s own exports, with each status and the failure message', function (): void {
    $user = User::factory()->create();
    $ready = download($user);
    download($user, ['status' => ExportStatus::Processing, 'expires_at' => null]);
    download($user, ['status' => ExportStatus::Failed, 'expires_at' => null, 'error' => 'Ekspor gagal. Coba lagi, atau hubungi administrator.']);
    download($user, ['expires_at' => now()->subMinute()]);
    download(User::factory()->create());
    actingAs($user);

    AssertableInertia::fromTestResponse(get('/account/downloads')->assertOk())
        ->component('Core::Downloads/Index')
        ->count('downloads_list.items', 4)
        ->where('downloads_list.items.0.status', 'expired')
        ->where('downloads_list.items.0.url_href', null)
        ->where('downloads_list.items.1.status', 'failed')
        ->where('downloads_list.items.1.error', 'Ekspor gagal. Coba lagi, atau hubungi administrator.')
        ->where('downloads_list.items.2.status', 'processing')
        ->where('downloads_list.items.2.url_href', null)
        ->where('downloads_list.items.3.status', 'ready')
        ->where('downloads_list.items.3.module_label', 'Invoice')
        ->where('downloads_list.items.3.url_href', route('account.downloads.url', $ready))
        ->where('downloads_list.ttl_hours', 24);
});

it('downloads a ready file without a second exported audit row', function (): void {
    $user = User::factory()->create();
    $export = download($user);
    actingAs($user);

    get(signedFileUrl($export))->assertOk()->assertDownload('invoices.xlsx');

    expect(ImmutableActivity::query()->where('event', 'exported')->count())->toBe(0);
});

it('answers 404 for another user\'s export, on the URL and on a validly signed file link', function (): void {
    $owner = User::factory()->create();
    $export = download($owner);
    actingAs($owner);
    $url = signedFileUrl($export);

    actingAs(User::factory()->create());

    getJson("/account/downloads/{$export->id}/url")->assertNotFound();
    get($url)->assertNotFound();
});

it('refuses an expired export, even through a link signed before it expired', function (): void {
    $user = User::factory()->create();
    $export = download($user, ['expires_at' => now()->addMinute()]);
    actingAs($user);
    $url = signedFileUrl($export);

    $export->update(['expires_at' => now()->subSecond()]);

    getJson("/account/downloads/{$export->id}/url")->assertStatus(410);
    get($url)->assertStatus(410);
});

it('refuses an expired, tampered or unsigned file link', function (): void {
    $user = User::factory()->create();
    [$first, $second] = [download($user), download($user)];
    actingAs($user);
    $url = signedFileUrl($first);

    get("/account/downloads/{$first->id}/file")->assertForbidden();
    get(str_replace("downloads/{$first->id}/", "downloads/{$second->id}/", $url))->assertForbidden();
    travel(6)->minutes();
    get($url)->assertForbidden();
});

it('deletes expired exports and their files in the scheduled cleanup', function (): void {
    $user = User::factory()->create();
    $expired = download($user, ['expires_at' => now()->addMinute()]);
    $kept = download($user);
    travel(2)->minutes();

    artisan('model:prune', ['--model' => [QueuedExport::class]])->assertSuccessful();

    expect(QueuedExport::query()->pluck('id')->all())->toBe([$kept->id]);
    Storage::disk('local')->assertMissing("exports/{$expired->id}/invoices.xlsx");
    Storage::disk('local')->assertExists("exports/{$kept->id}/invoices.xlsx");
});

it('schedules the cleanup daily', function (): void {
    artisan('schedule:list')->expectsOutputToContain('model:prune')->assertSuccessful();
});

it('counts only ready, unexpired exports of the user in the topbar badge', function (): void {
    $user = User::factory()->create();
    download($user);
    download($user, ['expires_at' => now()->subMinute()]);
    download($user, ['status' => ExportStatus::Processing, 'expires_at' => null]);
    download($user, ['status' => ExportStatus::Failed, 'expires_at' => null]);
    download(User::factory()->create());
    actingAs($user);

    AssertableInertia::fromTestResponse(get('/account/downloads'))->where('downloads.ready_count', 1);
});
