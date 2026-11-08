<?php

declare(strict_types=1);

namespace Modules\Invoice\Widgets;

use Illuminate\Contracts\Auth\Authenticatable;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Dashboard\DashboardRange;
use Yuan\AdminCore\Dashboard\Widget;
use Yuan\AdminCore\Dashboard\WidgetType;
use Yuan\AdminCore\Data\Widgets\StatWidgetData;

/** "Invoice baru": invoices issued in the range, against the previous range. */
final class NewInvoices extends Widget
{
    public function key(): string
    {
        return 'invoices.new';
    }

    public function label(): string
    {
        return 'Invoice baru';
    }

    public function type(): WidgetType
    {
        return WidgetType::Stat;
    }

    public function order(): int
    {
        return 20;
    }

    public function data(Authenticatable $user, DashboardRange $range): StatWidgetData
    {
        $count = fn (DashboardRange $window): int => Invoice::query()->visibleTo($user)
            ->whereBetween('issued_on', [$window->from->toDateString(), $window->to->toDateString()])
            ->count();
        $total = $count($range);

        return new StatWidgetData(value: $total, icon: 'file-plus', change: DashboardRange::change($total, $count($range->previous())), caption: __('dibanding periode sebelumnya'));
    }
}
