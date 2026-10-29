<?php

declare(strict_types=1);

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia;
use Modules\Invoice\Models\Invoice;
use Tests\Fixtures\FailingExport;
use Yuan\AdminCore\Audit\ImmutableActivity;
use Yuan\AdminCore\Exports\ExportJob;
use Yuan\AdminCore\Exports\ExportStatus;
use Yuan\AdminCore\Exports\QueuedExport;
use Yuan\AdminCore\Testing\ModuleAssertions;

use function Pest\Laravel\get;
use function Pest\Laravel\travel;

// Queued downloads on the production queue driver: the job is stored in the
// `jobs` table, read back by a worker (the user restored from its id), and
// run there, which the `sync` test queue skips.

uses(RefreshDatabase::class);

beforeEach(function (): void {
    Storage::fake('local');
    config(['queue.default' => 'database', 'admin-core.exports.queue_threshold' => 1]);
});

function workOnce(): void
{
    Artisan::call('queue:work', ['connection' => 'database', '--once' => true, '--stop-when-empty' => true]);
}

it('stores the job, and a worker writes the file as the requesting user', function (): void {
    Invoice::factory()->count(3)->create();
    $user = ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.download']);

    get('/admin/invoices/download');

    $queued = QueuedExport::query()->sole();
    expect($queued->status)->toBe(ExportStatus::Processing)
        ->and(DB::table('jobs')->count())->toBe(1);

    workOnce();

    $queued->refresh();
    $row = ImmutableActivity::query()->where('event', 'exported')->sole();
    expect($queued->status)->toBe(ExportStatus::Ready)
        ->and($queued->row_count)->toBe(3)
        ->and(DB::table('jobs')->count())->toBe(0)
        ->and($row->causer_id)->toBe($user->getKey())
        ->and($row->properties?->get('context')['channel'] ?? null)->toBe('queue')
        ->and($row->properties?->get('meta')['queued'] ?? null)->toBeTrue();
    Storage::disk('local')->assertExists((string) $queued->path);
    AssertableInertia::fromTestResponse(get('/admin/invoices'))->where('downloads.ready_count', 1);
});

it('marks the export failed with its message after the last try, leaving nothing processing or queued', function (): void {
    $user = ModuleAssertions::actingAsLevelWith(['invoices.view', 'invoices.download']);
    $queued = QueuedExport::query()->create(['user_id' => $user->getKey(), 'module' => 'invoices', 'filters' => ['format' => 'xlsx'], 'row_count' => 3, 'status' => ExportStatus::Processing]);
    ExportJob::dispatch($queued, $user, FailingExport::class);

    // Three tries (#[Tries(3)]), the backoff (10 s, then 60 s) between them.
    workOnce();
    expect($queued->refresh()->status)->toBe(ExportStatus::Processing);
    travel(11)->seconds();
    workOnce();
    travel(61)->seconds();
    workOnce();

    $queued->refresh();
    expect($queued->status)->toBe(ExportStatus::Failed)
        ->and($queued->error)->toBe('Ekspor gagal. Coba lagi, atau hubungi administrator.')
        ->and($queued->path)->toBeNull()
        ->and(QueuedExport::query()->where('status', ExportStatus::Processing)->exists())->toBeFalse()
        ->and(DB::table('jobs')->count())->toBe(0)
        ->and(DB::table('failed_jobs')->count())->toBe(1)
        ->and(ImmutableActivity::query()->where('event', 'exported')->exists())->toBeFalse();
    AssertableInertia::fromTestResponse(get('/admin/invoices'))->where('downloads.ready_count', 0);
});
