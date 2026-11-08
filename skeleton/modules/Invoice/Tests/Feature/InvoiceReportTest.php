<?php

declare(strict_types=1);

use Carbon\CarbonImmutable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Modules\Invoice\Enums\InvoiceStatus;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Testing\ModuleAssertions;

use function Pest\Laravel\get;

// Invoice → Laporan → Bulanan / Tahunan: the three-level menu example (spec §3.1).

uses(RefreshDatabase::class);

dataset('reports', ['/admin/invoices/reports/monthly', '/admin/invoices/reports/yearly']);

it('redirects guests to login', function (string $uri): void {
    ModuleAssertions::assertGuestRedirected('get', $uri);
})->with('reports');

it('needs invoices.view', function (string $uri): void {
    ModuleAssertions::assertForbiddenWithout('invoices.view', 'get', $uri);
})->with('reports');

it('reads only the invoices the user may see', function (string $uri): void {
    ModuleAssertions::actingAsLevelWith(['invoices.view']);

    ModuleAssertions::assertScopedToUser(Invoice::class, 'get', $uri);
})->with('reports');

it('sums each month of the last twelve, newest first', function (): void {
    CarbonImmutable::setTestNow('2026-11-08 10:00');
    Invoice::factory()->create(['issued_on' => '2026-11-02', 'status' => InvoiceStatus::Paid, 'total' => 1_000_000]);
    Invoice::factory()->create(['issued_on' => '2026-11-05', 'status' => InvoiceStatus::Sent, 'total' => 500_000]);
    Invoice::factory()->create(['issued_on' => '2025-10-31', 'status' => InvoiceStatus::Paid, 'total' => 9_000_000]);
    ModuleAssertions::actingAsLevelWith(['invoices.view']);

    AssertableInertia::fromTestResponse(get('/admin/invoices/reports/monthly')->assertOk())
        ->component('Invoice::Report')
        ->where('report.period', 'monthly')
        ->has('report.rows', 12)
        ->where('report.rows.0.key', '2026-11')
        ->where('report.rows.0.count', 2)
        ->where('report.rows.0.paid', 1_000_000)
        ->where('report.rows.0.total', 1_500_000)
        ->where('report.rows.11.key', '2025-12');
});

it('shows the third menu level with its links', function (): void {
    ModuleAssertions::actingAsLevelWith(['invoices.view']);

    AssertableInertia::fromTestResponse(get('/admin/invoices/reports/yearly')->assertOk())
        ->where('menu.0.items.0.slug', 'invoices')
        ->where('menu.0.items.0.children.1.label', 'Laporan')
        ->where('menu.0.items.0.children.1.children.1.route', 'invoices.reports.yearly');
});
