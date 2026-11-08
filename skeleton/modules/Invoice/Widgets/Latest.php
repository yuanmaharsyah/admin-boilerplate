<?php

declare(strict_types=1);

namespace Modules\Invoice\Widgets;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Number;
use Modules\Invoice\Enums\InvoiceStatus;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Dashboard\DashboardRange;
use Yuan\AdminCore\Dashboard\Widget;
use Yuan\AdminCore\Dashboard\WidgetSize;
use Yuan\AdminCore\Dashboard\WidgetType;
use Yuan\AdminCore\Data\Widgets\ListRowData;
use Yuan\AdminCore\Data\Widgets\ListWidgetData;

/** "Invoice terbaru": the latest invoices with their customer and total; paid ones in green, cancelled in red. */
final class Latest extends Widget
{
    public function key(): string
    {
        return 'invoices.latest';
    }

    public function label(): string
    {
        return 'Invoice terbaru';
    }

    public function type(): WidgetType
    {
        return WidgetType::List;
    }

    public function size(): WidgetSize
    {
        return WidgetSize::Md;
    }

    public function order(): int
    {
        return 40;
    }

    // The latest invoices don't depend on the range.
    public function usesRange(): bool
    {
        return false;
    }

    public function data(Authenticatable $user, DashboardRange $range): ListWidgetData
    {
        return new ListWidgetData(array_values(Invoice::query()->visibleTo($user)
            ->with('customer')
            ->latest('issued_on')
            ->latest('id')
            ->limit(ListWidgetData::MAX_ROWS)
            ->get()
            ->map(fn (Invoice $invoice): ListRowData => new ListRowData(
                key: (string) $invoice->id,
                title: $invoice->number,
                value: (string) Number::currency($invoice->total, 'IDR', 'id', 0),
                icon: 'receipt',
                subtitle: $invoice->customer->name.' · '.$invoice->status->label(),
                tone: match ($invoice->status) {
                    InvoiceStatus::Paid => 'success',
                    InvoiceStatus::Void => 'destructive',
                    default => 'neutral',
                },
                href: route('invoices.show', $invoice),
            ))
            ->all()));
    }
}
