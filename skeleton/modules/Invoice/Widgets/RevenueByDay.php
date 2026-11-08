<?php

declare(strict_types=1);

namespace Modules\Invoice\Widgets;

use Illuminate\Contracts\Auth\Authenticatable;
use Modules\Invoice\Enums\InvoiceStatus;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Dashboard\DashboardRange;
use Yuan\AdminCore\Dashboard\Widget;
use Yuan\AdminCore\Dashboard\WidgetSize;
use Yuan\AdminCore\Dashboard\WidgetType;
use Yuan\AdminCore\Data\Widgets\BarChartWidgetData;
use Yuan\AdminCore\Data\Widgets\WidgetFigureData;

/**
 * "Pendapatan per hari": paid invoices above zero and unpaid (sent) ones below,
 * in millions of Rupiah per issue day, with the range totals beside the chart.
 */
final class RevenueByDay extends Widget
{
    public function key(): string
    {
        return 'invoices.revenue_by_day';
    }

    public function label(): string
    {
        return 'Pendapatan per hari';
    }

    public function type(): WidgetType
    {
        return WidgetType::BarChart;
    }

    public function size(): WidgetSize
    {
        return WidgetSize::Lg;
    }

    public function order(): int
    {
        return 30;
    }

    public function data(Authenticatable $user, DashboardRange $range): BarChartWidgetData
    {
        /** @var array<string, array<string, int>> $sums status => day => total */
        $sums = [];

        foreach (Invoice::query()->visibleTo($user)
            ->whereIn('status', [InvoiceStatus::Paid, InvoiceStatus::Sent])
            ->whereBetween('issued_on', [$range->from->toDateString(), $range->to->toDateString()])
            ->groupBy('status', 'issued_on')
            ->selectRaw('status, issued_on as day, sum(total) as total')
            ->toBase()
            ->get() as $row) {
            $sums[(string) $row->status][substr((string) $row->day, 0, 10)] = (int) $row->total;
        }

        $millions = fn (int $rupiah): float => round($rupiah / 1_000_000, 1);
        $bars = $negative = [];

        for ($day = $range->from; $day <= $range->to; $day = $day->addDay()) {
            $key = $day->toDateString();
            $bars[] = new WidgetFigureData(key: $key, label: $key, value: $millions($sums[InvoiceStatus::Paid->value][$key] ?? 0));
            $negative[] = new WidgetFigureData(key: $key, label: $key, value: $millions($sums[InvoiceStatus::Sent->value][$key] ?? 0));
        }

        $paid = array_sum($sums[InvoiceStatus::Paid->value] ?? []);
        $sent = array_sum($sums[InvoiceStatus::Sent->value] ?? []);

        return new BarChartWidgetData(
            bars: $bars,
            unit: __('juta Rupiah'),
            negative: $negative,
            summary: [
                new WidgetFigureData(key: 'total', label: __('Total ditagihkan'), value: $paid + $sent, format: 'currency'),
                new WidgetFigureData(key: 'sent', label: __('Belum dibayar'), value: $sent, format: 'currency'),
                new WidgetFigureData(key: 'paid', label: __('Lunas'), value: $paid, format: 'currency'),
            ],
        );
    }
}
