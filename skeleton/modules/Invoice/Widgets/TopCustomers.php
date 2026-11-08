<?php

declare(strict_types=1);

namespace Modules\Invoice\Widgets;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Number;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Dashboard\DashboardRange;
use Yuan\AdminCore\Dashboard\Widget;
use Yuan\AdminCore\Dashboard\WidgetSize;
use Yuan\AdminCore\Dashboard\WidgetType;
use Yuan\AdminCore\Data\Widgets\ListRowData;
use Yuan\AdminCore\Data\Widgets\ListWidgetData;

/** "Pelanggan teratas": the customers billed most in the range, with their share of the top one as a bar. */
final class TopCustomers extends Widget
{
    public function key(): string
    {
        return 'invoices.top_customers';
    }

    public function label(): string
    {
        return 'Pelanggan teratas';
    }

    public function type(): WidgetType
    {
        return WidgetType::List;
    }

    public function size(): WidgetSize
    {
        return WidgetSize::Md;
    }

    public function order(): int
    {
        return 51;
    }

    public function data(Authenticatable $user, DashboardRange $range): ListWidgetData
    {
        $rows = Invoice::query()->visibleTo($user)
            ->join('customers', 'customers.id', '=', 'invoices.customer_id')
            ->whereBetween('invoices.issued_on', [$range->from->toDateString(), $range->to->toDateString()])
            ->groupBy('customers.id', 'customers.name')
            ->selectRaw('customers.id as id, customers.name as name, count(*) as invoices, sum(invoices.total) as total')
            ->orderByDesc('total')
            ->limit(ListWidgetData::MAX_ROWS)
            ->toBase()
            ->get();
        $top = max(1, (int) ($rows->first()->total ?? 1));

        return new ListWidgetData(array_values($rows->map(fn (object $row): ListRowData => new ListRowData(
            key: (string) $row->id,
            title: (string) $row->name,
            value: (string) Number::currency((int) $row->total, 'IDR', 'id', 0),
            icon: 'user-round',
            subtitle: trans_choice(':count invoice', (int) $row->invoices),
            progress: round((int) $row->total / $top, 3),
        ))->all()));
    }
}
