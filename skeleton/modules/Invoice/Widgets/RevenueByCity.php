<?php

declare(strict_types=1);

namespace Modules\Invoice\Widgets;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Number;
use Modules\Invoice\Enums\InvoiceStatus;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Dashboard\DashboardRange;
use Yuan\AdminCore\Dashboard\Widget;
use Yuan\AdminCore\Dashboard\WidgetType;
use Yuan\AdminCore\Data\Widgets\ListRowData;
use Yuan\AdminCore\Data\Widgets\ListWidgetData;

/** "Pendapatan per kota": paid revenue per customer city in the range, each with its change against the previous range. */
final class RevenueByCity extends Widget
{
    public function key(): string
    {
        return 'invoices.revenue_by_city';
    }

    public function label(): string
    {
        return 'Pendapatan per kota';
    }

    public function type(): WidgetType
    {
        return WidgetType::List;
    }

    public function order(): int
    {
        return 42;
    }

    public function data(Authenticatable $user, DashboardRange $range): ListWidgetData
    {
        $byCity = fn (DashboardRange $window): array => Invoice::query()->visibleTo($user)
            ->join('customers', 'customers.id', '=', 'invoices.customer_id')
            ->where('invoices.status', InvoiceStatus::Paid)
            ->whereBetween('invoices.issued_on', [$window->from->toDateString(), $window->to->toDateString()])
            ->whereNotNull('customers.city')
            ->groupBy('customers.city')
            ->selectRaw('customers.city as city, sum(invoices.total) as total')
            ->toBase()
            ->pluck('total', 'city')
            ->map(fn (mixed $total): int => (int) $total)
            ->all();
        $current = $byCity($range);
        $previous = $byCity($range->previous());
        arsort($current);

        return new ListWidgetData(array_map(fn (string $city, int $total): ListRowData => new ListRowData(
            key: $city,
            title: (string) Number::currency($total, 'IDR', 'id', 0),
            value: '',
            icon: 'map-pin',
            subtitle: $city,
            change: DashboardRange::change($total, $previous[$city] ?? 0),
        ), array_keys(array_slice($current, 0, ListWidgetData::MAX_ROWS, true)), array_slice($current, 0, ListWidgetData::MAX_ROWS)));
    }
}
