<?php

declare(strict_types=1);

namespace Modules\Invoice\Widgets;

use Illuminate\Contracts\Auth\Authenticatable;
use Modules\Invoice\Enums\InvoiceStatus;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Dashboard\DashboardRange;
use Yuan\AdminCore\Dashboard\Widget;
use Yuan\AdminCore\Dashboard\WidgetType;
use Yuan\AdminCore\Data\Widgets\AreaChartWidgetData;
use Yuan\AdminCore\Data\Widgets\WidgetFigureData;

/** "Tren pendapatan": paid totals per issue day as an area, with the range total against the previous range. */
final class RevenueTrend extends Widget
{
    public function key(): string
    {
        return 'invoices.revenue_trend';
    }

    public function label(): string
    {
        return 'Tren pendapatan';
    }

    public function type(): WidgetType
    {
        return WidgetType::AreaChart;
    }

    public function order(): int
    {
        return 31;
    }

    public function data(Authenticatable $user, DashboardRange $range): AreaChartWidgetData
    {
        $paid = fn (DashboardRange $window) => Invoice::query()->visibleTo($user)
            ->where('status', InvoiceStatus::Paid)
            ->whereBetween('issued_on', [$window->from->toDateString(), $window->to->toDateString()]);
        /** @var array<string, int> $byDay */
        $byDay = [];

        foreach ($paid($range)->groupBy('issued_on')->selectRaw('issued_on as day, sum(total) as total')->toBase()->get() as $row) {
            $byDay[substr((string) $row->day, 0, 10)] = (int) $row->total;
        }

        $points = [];

        for ($day = $range->from; $day <= $range->to; $day = $day->addDay()) {
            $points[] = new WidgetFigureData(key: $day->toDateString(), label: $day->toDateString(), value: $byDay[$day->toDateString()] ?? 0, format: 'currency');
        }

        $total = array_sum($byDay);

        return new AreaChartWidgetData(
            value: $total,
            points: $points,
            format: 'currency',
            change: DashboardRange::change($total, (int) $paid($range->previous())->sum('total')),
            caption: __('dibanding periode sebelumnya'),
        );
    }
}
