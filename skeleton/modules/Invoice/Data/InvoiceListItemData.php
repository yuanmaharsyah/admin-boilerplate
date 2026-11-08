<?php

declare(strict_types=1);

namespace Modules\Invoice\Data;

use Modules\Invoice\Enums\InvoiceStatus;
use Modules\Invoice\Models\Invoice;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
final class InvoiceListItemData extends Data
{
    public function __construct(
        public int $id,
        public string $number,
        public string $customer_name,
        public string $issued_on,
        public InvoiceStatus $status,
        public string $status_label,
        public int $total,
        // Shown in the row's details panel (DataTable `expandable`).
        public ?string $due_at = null,
        public ?string $payment_method_label = null,
        public ?string $notes = null,
    ) {}

    public static function fromModel(Invoice $invoice): self
    {
        return new self(
            id: $invoice->id,
            number: $invoice->number,
            customer_name: $invoice->customer->name,
            issued_on: $invoice->issued_on->toDateString(),
            status: $invoice->status,
            status_label: $invoice->status->label(),
            total: $invoice->total,
            due_at: $invoice->due_at?->toDateString(),
            payment_method_label: $invoice->payment_method?->label(),
            notes: $invoice->notes,
        );
    }
}
