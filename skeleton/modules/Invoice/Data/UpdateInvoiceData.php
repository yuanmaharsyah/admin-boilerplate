<?php

declare(strict_types=1);

namespace Modules\Invoice\Data;

use Illuminate\Validation\Rule;
use Modules\Customer\Models\Customer;
use Modules\Invoice\Enums\InvoiceStatus;
use Modules\Invoice\Enums\PaymentMethod;
use Modules\Invoice\Models\Invoice;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\LiteralTypeScriptType;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Yuan\AdminCore\Attachments\AttachmentUploads;
use Yuan\AdminCore\Validation\VisibleRecord;

/** The edit form; `lock_version` is the version it loaded (PreventsStaleUpdates). */
#[TypeScript]
final class UpdateInvoiceData extends Data
{
    /**
     * @param  array<string, mixed>  $files  Attachment slot => an upload, or a list of uploads (`attachmentSlots()`).
     */
    public function __construct(
        public string $number,
        public int $customer_id,
        public string $issued_on,
        public ?string $due_at,
        public InvoiceStatus $status,
        public ?PaymentMethod $payment_method,
        public int $total,
        public float $tax_rate,
        public bool $send_reminder,
        public ?string $npwp,
        public ?string $notes,
        public int $lock_version,
        #[LiteralTypeScriptType('Record<string, File | File[] | null>')]
        public array $files = [],
    ) {}

    /**
     * @return array<string, list<mixed>>
     */
    public static function rules(): array
    {
        return [
            'number' => ['required', 'string', 'max:30', Rule::unique('invoices', 'number')->ignore(request()->route('invoice'))],
            'customer_id' => ['required', 'integer', new VisibleRecord(Customer::class)],
            'issued_on' => ['required', 'date_format:Y-m-d'],
            'due_at' => ['nullable', 'date_format:Y-m-d H:i', 'after_or_equal:issued_on'],
            'status' => ['required', Rule::enum(InvoiceStatus::class)],
            'payment_method' => ['nullable', Rule::enum(PaymentMethod::class)],
            'total' => ['required', 'integer', 'min:0', 'max:999999999999'],
            'tax_rate' => ['required', 'numeric', 'min:0', 'max:100'],
            'send_reminder' => ['boolean'],
            'npwp' => ['nullable', 'digits_between:15,16'],
            'notes' => ['nullable', 'string', 'max:2000'],
            'lock_version' => ['required', 'integer', 'min:0'],
            ...AttachmentUploads::rules(Invoice::class, is_numeric($id = request()->route('invoice')) ? Invoice::query()->find((int) $id) : null),
        ];
    }

    /**
     * Field names in validation messages.
     *
     * @return array<string, string>
     */
    public static function attributes(): array
    {
        return [
            'number' => __('nomor'),
            'customer_id' => __('pelanggan'),
            'issued_on' => __('tanggal'),
            'due_at' => __('jatuh tempo'),
            'status' => __('status'),
            'payment_method' => __('cara bayar'),
            'total' => __('total'),
            'tax_rate' => __('PPN'),
            'send_reminder' => __('pengingat'),
            'npwp' => __('NPWP'),
            'notes' => __('catatan'),
            ...AttachmentUploads::attributes(Invoice::class),
        ];
    }
}
