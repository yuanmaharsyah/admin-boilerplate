<?php

declare(strict_types=1);

namespace Tests\Fixtures\Modules\WidgetProbe\Widgets;

use Illuminate\Contracts\Auth\Authenticatable;
use RuntimeException;
use Yuan\AdminCore\Dashboard\DashboardRange;
use Yuan\AdminCore\Dashboard\Widget;
use Yuan\AdminCore\Dashboard\WidgetType;
use Yuan\AdminCore\Data\Widgets\StatWidgetData;

/** Fails in data(), as a widget whose query breaks would. */
final class Broken extends Widget
{
    public function key(): string
    {
        return 'widget-probe.broken';
    }

    public function label(): string
    {
        return 'Rusak';
    }

    public function type(): WidgetType
    {
        return WidgetType::Stat;
    }

    public function usesRange(): bool
    {
        return false;
    }

    public function data(Authenticatable $user, DashboardRange $range): StatWidgetData
    {
        throw new RuntimeException('The probe widget fails on purpose.');
    }
}
