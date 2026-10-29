<?php

declare(strict_types=1);

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Storage;
use Inertia\Support\SessionKey;
use Inertia\Testing\AssertableInertia;
use Maatwebsite\Excel\Facades\Excel;
use Modules\Customer\Models\Customer;
use Modules\Invoice\Enums\InvoiceStatus;
use Modules\Invoice\Exports\InvoiceExport;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Audit\ImmutableActivity;
use Yuan\AdminCore\Exports\ExportJob;
use Yuan\AdminCore\Exports\ExportStatus;
use Yuan\AdminCore\Exports\QueuedExport;
use Yuan\AdminCore\Testing\ModuleAssertions;

use function Pest\Laravel\call;
use function Pest\Laravel\get;

uses(RefreshDatabase::class);

/**
 * Headers of an Inertia visit from the current page version.
 *
 * @return array<string, string>
 */
function inertiaVisit(): array
{
    return ['X-Inertia' => 'true', 'X-Inertia-Version' => (string) app(HandleInertiaRequests::class)->version(Request::create('/'))];
}

beforeEach(function (): void {
    Invoice::factory()->count(2)->create(['status' => InvoiceStatus::Paid]);
    Invoice::factory()->create(['status' => InvoiceStatus::Draft]);
});

it('needs a signed-in user with invoices.download', function (): void {
    ModuleAssertions::assertGuestRedirected('get', '/admin/invoices/download');
    ModuleAssertions::assertForbiddenWithout('invoices.download', 'get', '/admin/invoices/download');
});

it('streams the filtered list and audits the download', function (): void {
    Excel::fake();
    $user = ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.download']);

    get('/admin/invoices/download?filter[status]=paid&sort=number&format=csv')->assertOk();

    Excel::assertDownloaded(
        'invoices-'.now()->format('Ymd-His').'.csv',
        fn (InvoiceExport $export): bool => $export->query()->count() === 2,
    );
    $row = ImmutableActivity::query()->where('event', 'exported')->sole();
    expect($row->causer_id)->toBe($user->getKey())
        ->and($row->log_name)->toBe('invoices')
        ->and($row->getProperty('meta'))->toMatchArray(['rows' => 2, 'format' => 'csv', 'filters' => ['filter' => ['status' => 'paid'], 'sort' => 'number']]);
});

it('sends an Inertia request to the same URL as a plain download', function (): void {
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.download']);

    get('/admin/invoices/download?filter[status]=paid', inertiaVisit())
        ->assertStatus(409)
        ->assertHeader('X-Inertia-Location', url('/admin/invoices/download?filter%5Bstatus%5D=paid'));

    expect(ImmutableActivity::query()->where('event', 'exported')->exists())->toBeFalse();
});

it('queues a download above the threshold and tells the user', function (): void {
    Queue::fake();
    config(['admin-core.exports.queue_threshold' => 1]);
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.download']);

    get('/admin/invoices/download?filter[status]=paid', inertiaVisit())->assertRedirect();

    $queued = QueuedExport::query()->sole();
    expect($queued->only(['module', 'row_count', 'status']))->toBe(['module' => 'invoices', 'row_count' => 2, 'status' => ExportStatus::Processing])
        ->and(session(SessionKey::FLASH_DATA))->toBe(['info' => 'Ekspor diproses, cek Unduhan', 'description' => '2 baris sesuai filter']);
    Queue::assertPushed(ExportJob::class, fn (ExportJob $job): bool => $job->queued->is($queued));
});

it('writes a queued download for the requesting user, who is the causer', function (): void {
    Storage::fake('local');
    config(['admin-core.exports.queue_threshold' => 1]);
    $user = ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.download']);

    get('/admin/invoices/download?filter[status]=paid'); // the test queue is sync: the job runs now

    $queued = QueuedExport::query()->sole();
    expect($queued->status)->toBe(ExportStatus::Ready)
        ->and($queued->expires_at?->isFuture())->toBeTrue()
        ->and($queued->path)->toEndWith('.xlsx');
    Storage::disk('local')->assertExists((string) $queued->path);
    expect(ImmutableActivity::query()->where('event', 'exported')->sole()->causer_id)->toBe($user->getKey());

    AssertableInertia::fromTestResponse(get('/admin/invoices'))->where('downloads.ready_count', 1);
});

it('scopes the download to the signed-in user', function (): void {
    Excel::fake();
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.download']);

    ModuleAssertions::assertScopedToUser(Invoice::class, 'get', '/admin/invoices/download');
});

it('turns formula-like text into plain text in the file', function (): void {
    $invoice = Invoice::factory()->for(Customer::factory()->state(['name' => '=HYPERLINK("http://x","klik")']))->create(['number' => '+INV-1']);
    $user = ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.download']);

    $row = (new InvoiceExport($user, []))->map($invoice->fresh());

    expect($row[0])->toBe("'+INV-1")
        ->and($row[1])->toBe('\'=HYPERLINK("http://x","klik")')
        ->and($row[6])->toBe($invoice->total);
});

it('builds, queues and audits nothing for a HEAD request or a browser prefetch', function (string $method, array $headers): void {
    Queue::fake();
    Excel::fake();
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.download']);

    foreach ([1, 5000] as $threshold) {
        config(['admin-core.exports.queue_threshold' => $threshold]);

        call($method, '/admin/invoices/download', server: array_combine(
            array_map(fn (string $name): string => 'HTTP_'.strtoupper(str_replace('-', '_', $name)), array_keys($headers)),
            $headers,
        ))->assertNoContent();
    }

    expect(ImmutableActivity::query()->where('event', 'exported')->exists())->toBeFalse()
        ->and(QueuedExport::query()->exists())->toBeFalse();
    Queue::assertNothingPushed();
})->with([
    'HEAD' => ['HEAD', []],
    'Chrome prefetch' => ['GET', ['Sec-Purpose' => 'prefetch']],
    'Chrome prerender' => ['GET', ['Sec-Purpose' => 'prefetch;prerender']],
    'older Purpose header' => ['GET', ['Purpose' => 'prefetch']],
]);

it('writes exactly one exported row for a real download', function (): void {
    Excel::fake();
    ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.download']);

    get('/admin/invoices/download')->assertOk();

    expect(ImmutableActivity::query()->where('event', 'exported')->count())->toBe(1);
});
