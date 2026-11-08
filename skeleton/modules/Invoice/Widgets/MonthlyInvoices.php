<?php

declare(strict_types=1);

namespace Modules\Invoice\Widgets;

use Carbon\CarbonImmutable;
use Illuminate\Contracts\Auth\Authenticatable;
use Modules\Invoice\Enums\InvoiceStatus;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Dashboard\DashboardRange;
use Yuan\AdminCore\Dashboard\Widget;
use Yuan\AdminCore\Dashboard\WidgetSize;
use Yuan\AdminCore\Dashboard\WidgetType;
use Yuan\AdminCore\Data\Widgets\BarChartWidgetData;
use Yuan\AdminCore\Data\Widgets\WidgetFigureData;

/** "Invoice per bulan": invoices issued and those paid, side by side, for each of the last six months. */
final class MonthlyInvoices extends Widget
{
    private const int MONTHS = 6;

    public function key(): string
    {
        return 'invoices.monthly';
    }

    public function label(): string
    {
        return 'Invoice per bulan';
    }

    public function type(): WidgetType
    {
        return WidgetType::BarChart;
    }

    public function size(): WidgetSize
    {
        return WidgetSize::Md;
    }

    public function order(): int
    {
        return 50;
    }

    // Always the last six months.
    public function usesRange(): bool
    {
        return false;
    }

    public function data(Authenticatable $user, DashboardRange $range): BarChartWidgetData
    {
        $first = CarbonImmutable::today()->startOfMonth()->subMonths(self::MONTHS - 1);
        $issued = $paid = [];

        foreach (Invoice::query()->visibleTo($user)->where('issued_on', '>=', $first->toDateString())->get(['issued_on', 'status']) as $invoice) {
            $month = $invoice->issued_on->format('Y-m');
            $issued[$month] = ($issued[$month] ?? 0) + 1;

            if ($invoice->status === InvoiceStatus::Paid) {
                $paid[$month] = ($paid[$month] ?? 0) + 1;
            }
        }

        $bars = $compare = [];

        for ($month = $first; $month->lte(CarbonImmutable::today()); $month = $month->addMonth()) {
            $key = $month->format('Y-m');
            $label = $month->translatedFormat('M');
            $bars[] = new WidgetFigureData(key: $key, label: $label, value: $issued[$key] ?? 0);
            $compare[] = new WidgetFigureData(key: $key, label: $label, value: $paid[$key] ?? 0);
        }

        return new BarChartWidgetData(
            bars: $bars,
            unit: __('invoice'),
            compare: $compare,
            series: __('Diterbitkan'),
            compare_series: __('Lunas'),
        );
    }
}
