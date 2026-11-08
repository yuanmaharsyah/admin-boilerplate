<?php

declare(strict_types=1);

use Carbon\CarbonImmutable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Modules\Customer\Models\Customer;
use Modules\Invoice\Enums\InvoiceStatus;
use Modules\Invoice\Models\Invoice;
use Modules\Invoice\Widgets\AverageValue;
use Modules\Invoice\Widgets\ByStatus;
use Modules\Invoice\Widgets\Latest;
use Modules\Invoice\Widgets\MonthlyInvoices;
use Modules\Invoice\Widgets\NewInvoices;
use Modules\Invoice\Widgets\Receivable;
use Modules\Invoice\Widgets\Revenue;
use Modules\Invoice\Widgets\RevenueByCity;
use Modules\Invoice\Widgets\RevenueByDay;
use Modules\Invoice\Widgets\RevenueTrend;
use Modules\Invoice\Widgets\TopCustomers;
use Yuan\AdminCore\Dashboard\DashboardRange;
use Yuan\AdminCore\Dashboard\Widget;
use Yuan\AdminCore\Data\Widgets\BarChartWidgetData;
use Yuan\AdminCore\Data\Widgets\StatWidgetData;
use Yuan\AdminCore\Testing\ModuleAssertions;

use function Pest\Laravel\get;

// The demo Invoice widgets on Beranda (spec §7.2, AGENTS.md §8): permission, scope, budget, figures.

uses(RefreshDatabase::class);

/**
 * @return list<class-string<Widget>>
 */
function invoiceWidgets(): array
{
    return [Revenue::class, Receivable::class, NewInvoices::class, AverageValue::class, RevenueByDay::class, RevenueTrend::class, Latest::class, ByStatus::class, RevenueByCity::class, MonthlyInvoices::class, TopCustomers::class];
}

it('is missing from Beranda without invoices.view', function (): void {
    foreach (invoiceWidgets() as $widget) {
        ModuleAssertions::assertWidgetHiddenWithout($widget);
    }
});

it('reads only the invoices the user may see', function (): void {
    ModuleAssertions::actingAsLevelWith(['dashboard.view', 'invoices.view']);

    foreach (invoiceWidgets() as $widget) {
        ModuleAssertions::assertWidgetUsesScope($widget, Invoice::class);
    }
});

it('stays within the widget time budget', function (): void {
    Invoice::factory()->count(300)->recycle(Customer::factory()->count(10)->create())->create();
    ModuleAssertions::actingAsLevelWith(['dashboard.view', 'invoices.view']);

    foreach (invoiceWidgets() as $widget) {
        ModuleAssertions::assertWidgetWithinBudget($widget);
    }
});

it('compares paid revenue with the previous range and shows it in the welcome card', function (): void {
    CarbonImmutable::setTestNow('2026-11-08 10:00');
    $customer = Customer::factory()->create();
    $invoice = fn (string $day, InvoiceStatus $status, int $total) => Invoice::factory()->for($customer)->create(['issued_on' => $day, 'status' => $status, 'total' => $total]);
    $invoice('2026-11-05', InvoiceStatus::Paid, 1_180_000);
    $invoice('2026-11-06', InvoiceStatus::Sent, 500_000);
    $invoice('2026-10-28', InvoiceStatus::Paid, 1_000_000);
    $user = ModuleAssertions::actingAsLevelWith(['dashboard.view', 'invoices.view']);

    /** @var StatWidgetData $revenue */
    $revenue = app(Revenue::class)->resolve($user, new DashboardRange('7d'));
    /** @var BarChartWidgetData $byDay */
    $byDay = app(RevenueByDay::class)->resolve($user, new DashboardRange('7d'));

    expect($revenue->value)->toBe(1_180_000)
        ->and($revenue->change)->toBe(18.0)
        ->and(app(Revenue::class)->meta()->highlight)->toBeTrue()
        ->and(array_column(array_map(fn ($bar): array => $bar->toArray(), $byDay->bars), 'value', 'key'))->toMatchArray(['2026-11-05' => 1.2, '2026-11-06' => 0])
        ->and(array_column(array_map(fn ($bar): array => $bar->toArray(), $byDay->negative), 'value', 'key'))->toMatchArray(['2026-11-06' => 0.5])
        ->and(array_column(array_map(fn ($figure): array => $figure->toArray(), $byDay->summary), 'value', 'key'))->toBe(['total' => 1_680_000, 'sent' => 500_000, 'paid' => 1_180_000]);
});

it('caps the cards at max_widgets without counting the two welcome-card highlights', function (): void {
    config(['admin-core.dashboard.max_widgets' => 1]);
    ModuleAssertions::actingAsLevelWith(['dashboard.view', 'invoices.view']);

    AssertableInertia::fromTestResponse(get('/admin/dashboard')->assertOk())
        ->where('dashboard.widgets', fn ($widgets): bool => array_column($widgets->all(), 'key') === ['invoices.revenue', 'invoices.receivable', 'invoices.new']);
});
