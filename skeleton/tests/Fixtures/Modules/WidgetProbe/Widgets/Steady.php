<?php

declare(strict_types=1);

namespace Tests\Fixtures\Modules\WidgetProbe\Widgets;

use Illuminate\Contracts\Auth\Authenticatable;
use Yuan\AdminCore\Dashboard\DashboardRange;
use Yuan\AdminCore\Dashboard\Widget;
use Yuan\AdminCore\Dashboard\WidgetType;
use Yuan\AdminCore\Data\Widgets\StatWidgetData;

/** Answers the range's day count, without a cache (range reload tests). */
final class Steady extends Widget
{
    public function key(): string
    {
        return 'widget-probe.steady';
    }

    public function label(): string
    {
        return 'Stabil';
    }

    public function type(): WidgetType
    {
        return WidgetType::Stat;
    }

    public function cacheSeconds(): int
    {
        return 0;
    }

    public function data(Authenticatable $user, DashboardRange $range): StatWidgetData
    {
        return new StatWidgetData(value: DashboardRange::DAYS[$range->key]);
    }
}
