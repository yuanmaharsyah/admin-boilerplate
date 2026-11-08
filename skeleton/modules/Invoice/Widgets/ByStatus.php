<?php

declare(strict_types=1);

namespace Modules\Invoice\Widgets;

use Illuminate\Contracts\Auth\Authenticatable;
use Modules\Invoice\Enums\InvoiceStatus;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Dashboard\DashboardRange;
use Yuan\AdminCore\Dashboard\Widget;
use Yuan\AdminCore\Dashboard\WidgetType;
use Yuan\AdminCore\Data\Widgets\DonutWidgetData;
use Yuan\AdminCore\Data\Widgets\WidgetFigureData;

/** "Invoice per status": invoices issued in the range, per status; a segment opens the list filtered to it. */
final class ByStatus extends Widget
{
    public function key(): string
    {
        return 'invoices.by_status';
    }

    public function label(): string
    {
        return 'Invoice per status';
    }

    public function type(): WidgetType
    {
        return WidgetType::Donut;
    }

    public function order(): int
    {
        return 41;
    }

    public function data(Authenticatable $user, DashboardRange $range): DonutWidgetData
    {
        /** @var array<string, int> $counts */
        $counts = Invoice::query()->visibleTo($user)
            ->whereBetween('issued_on', [$range->from->toDateString(), $range->to->toDateString()])
            ->groupBy('status')
            ->selectRaw('status, count(*) as total')
            ->toBase()
            ->pluck('total', 'status')
            ->map(fn (mixed $total): int => (int) $total)
            ->all();

        return new DonutWidgetData(
            value: array_sum($counts),
            segments: array_map(fn (InvoiceStatus $status): WidgetFigureData => new WidgetFigureData(
                key: $status->value,
                label: $status->label(),
                value: $counts[$status->value] ?? 0,
                href: route('invoices.index', ['filter' => ['status' => $status->value]]),
            ), InvoiceStatus::cases()),
            caption: __('invoice dalam rentang'),
        );
    }
}
