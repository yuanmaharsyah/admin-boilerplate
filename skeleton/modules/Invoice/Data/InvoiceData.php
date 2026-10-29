<?php

declare(strict_types=1);

namespace Modules\Invoice\Data;

use Modules\Invoice\Enums\InvoiceStatus;
use Modules\Invoice\Enums\PaymentMethod;
use Modules\Invoice\Models\Invoice;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/** One invoice, for its Show and Edit pages; `due_at` is `Y-m-d H:i` in the app timezone. */
#[TypeScript]
final class InvoiceData extends Data
{
    public function __construct(
        public int $id,
        public string $number,
        public int $customer_id,
        public string $customer_name,
        public string $issued_on,
        public ?string $due_at,
        public InvoiceStatus $status,
        public string $status_label,
        public ?PaymentMethod $payment_method,
        public ?string $payment_method_label,
        public int $total,
        public float $tax_rate,
        public bool $send_reminder,
        public ?string $npwp,
        public ?string $notes,
        public int $lock_version,
    ) {}

    public static function fromModel(Invoice $invoice): self
    {
        return new self(
            id: $invoice->id,
            number: $invoice->number,
            customer_id: $invoice->customer_id,
            customer_name: $invoice->customer->name,
            issued_on: $invoice->issued_on->toDateString(),
            due_at: $invoice->due_at?->format('Y-m-d H:i'),
            status: $invoice->status,
            status_label: $invoice->status->label(),
            payment_method: $invoice->payment_method,
            payment_method_label: $invoice->payment_method?->label(),
            total: $invoice->total,
            tax_rate: (float) $invoice->tax_rate,
            send_reminder: $invoice->send_reminder,
            npwp: $invoice->npwp,
            notes: $invoice->notes,
            lock_version: $invoice->lock_version,
        );
    }
}
