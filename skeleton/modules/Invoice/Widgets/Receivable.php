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

/** "Piutang" in Beranda's welcome card: sent, unpaid invoices issued in the range, against the previous range. */
final class Receivable extends Widget
{
    public function key(): string
    {
        return 'invoices.receivable';
    }

    public function label(): string
    {
        return 'Piutang';
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
        return 2;
    }

    public function data(Authenticatable $user, DashboardRange $range): StatWidgetData
    {
        $sum = fn (DashboardRange $window): int => (int) Invoice::query()->visibleTo($user)
            ->where('status', InvoiceStatus::Sent)
            ->whereBetween('issued_on', [$window->from->toDateString(), $window->to->toDateString()])
            ->sum('total');
        $total = $sum($range);

        return new StatWidgetData(value: $total, icon: 'hourglass', format: 'currency', change: DashboardRange::change($total, $sum($range->previous())));
    }
}
