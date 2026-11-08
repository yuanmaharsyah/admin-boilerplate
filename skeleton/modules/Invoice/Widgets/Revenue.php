<?php

declare(strict_types=1);

namespace Modules\Invoice\Widgets;

use Illuminate\Contracts\Auth\Authenticatable;
use Modules\Invoice\Enums\InvoiceStatus;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Dashboard\DashboardRange;
use Yuan\AdminCore\Dashboard\Widget;
use Yuan\AdminCore\Dashboard\WidgetType;
use Yuan\AdminCore\Data\Widgets\StatWidgetData;

/** "Pendapatan" in Beranda's welcome card: paid invoices issued in the range, against the previous range. */
final class Revenue extends Widget
{
    public function key(): string
    {
        return 'invoices.revenue';
    }

    public function label(): string
    {
        return 'Pendapatan';
    }

    public function type(): WidgetType
    {
        return WidgetType::Stat;
    }

    public function highlight(): bool
    {
        return true;
    }

    public function order(): int
    {
        return 1;
    }

    public function data(Authenticatable $user, DashboardRange $range): StatWidgetData
    {
        $sum = fn (DashboardRange $window): int => (int) Invoice::query()->visibleTo($user)
            ->where('status', InvoiceStatus::Paid)
            ->whereBetween('issued_on', [$window->from->toDateString(), $window->to->toDateString()])
            ->sum('total');
        $total = $sum($range);

        return new StatWidgetData(value: $total, icon: 'wallet', format: 'currency', change: DashboardRange::change($total, $sum($range->previous())));
    }
}
