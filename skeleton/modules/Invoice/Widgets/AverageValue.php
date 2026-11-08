<?php

declare(strict_types=1);

namespace Modules\Invoice\Widgets;

use Illuminate\Contracts\Auth\Authenticatable;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Dashboard\DashboardRange;
use Yuan\AdminCore\Dashboard\Widget;
use Yuan\AdminCore\Dashboard\WidgetType;
use Yuan\AdminCore\Data\Widgets\StatWidgetData;

/** "Rata-rata nilai invoice": the mean total of invoices issued in the range, against the previous range. */
final class AverageValue extends Widget
{
    public function key(): string
    {
        return 'invoices.average';
    }

    public function label(): string
    {
        return 'Rata-rata nilai';
    }

    public function type(): WidgetType
    {
        return WidgetType::Stat;
    }

    public function order(): int
    {
        return 21;
    }

    public function data(Authenticatable $user, DashboardRange $range): StatWidgetData
    {
        $average = fn (DashboardRange $window): int => (int) round((float) Invoice::query()->visibleTo($user)
            ->whereBetween('issued_on', [$window->from->toDateString(), $window->to->toDateString()])
            ->avg('total'));
        $value = $average($range);

        return new StatWidgetData(value: $value, icon: 'calculator', format: 'currency', change: DashboardRange::change($value, $average($range->previous())), caption: __('dibanding periode sebelumnya'));
    }
}
