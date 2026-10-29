<?php

declare(strict_types=1);

namespace Modules\Invoice\Models;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Attributes\UseFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Modules\Customer\Models\Customer;
use Modules\Invoice\Database\Factories\InvoiceFactory;
use Modules\Invoice\Enums\InvoiceStatus;
use Modules\Invoice\Enums\PaymentMethod;
use Yuan\AdminCore\Attachments\AttachmentSlot;
use Yuan\AdminCore\Attachments\HasAttachments;
use Yuan\AdminCore\Audit\HasActivityHistory;
use Yuan\AdminCore\Audit\LogsModuleActivity;
use Yuan\AdminCore\Concurrency\PreventsStaleUpdates;
use Yuan\AdminCore\Data\DataTableFilterData;
use Yuan\AdminCore\DataTable\DataTableModel;
use Yuan\AdminCore\DataTable\HasDataTable;
use Yuan\AdminCore\DataTable\HasVisibilityScope;

/**
 * @property int $id
 * @property string $number
 * @property int $customer_id
 * @property CarbonImmutable $issued_on
 * @property CarbonImmutable|null $due_at
 * @property InvoiceStatus $status
 * @property PaymentMethod|null $payment_method
 * @property int $total
 * @property string $tax_rate
 * @property bool $send_reminder
 * @property string|null $npwp
 * @property string|null $notes
 * @property Carbon $updated_at
 * @property int $lock_version
 * @property-read Customer $customer
 */
#[UseFactory(InvoiceFactory::class)]
final class Invoice extends Model implements DataTableModel
{
    /** @use HasFactory<InvoiceFactory> */
    use HasActivityHistory, HasAttachments, HasDataTable, HasFactory, HasVisibilityScope, LogsModuleActivity, PreventsStaleUpdates, SoftDeletes;

    /** @var array<string, mixed> */
    protected $attributes = ['lock_version' => 0];

    protected $fillable = [
        'number', 'customer_id', 'issued_on', 'due_at', 'status', 'payment_method',
        'total', 'tax_rate', 'send_reminder', 'npwp', 'notes',
    ];

    /**
     * @return BelongsTo<Customer, $this>
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class)->withTrashed();
    }

    /**
     * The demo's two kinds of slot: one file that a new upload replaces, and a list.
     *
     * @return array<string, AttachmentSlot>
     */
    public function attachmentSlots(): array
    {
        return [
            'bukti_bayar' => AttachmentSlot::single(__('Bukti bayar'))->mimes(['pdf', 'jpg', 'jpeg', 'png'])->maxKb(2048),
            'lampiran' => AttachmentSlot::multiple(__('Lampiran')),
        ];
    }

    public function dataTableSearch(): array
    {
        return ['number', 'notes'];
    }

    public function dataTableSorts(): array
    {
        return ['number', 'issued_on', 'total'];
    }

    public function dataTableFilters(): array
    {
        return [new DataTableFilterData('status', __('Status'), InvoiceStatus::options())];
    }

    protected function casts(): array
    {
        return [
            'customer_id' => 'integer',
            'issued_on' => 'immutable_date',
            'due_at' => 'immutable_datetime',
            'status' => InvoiceStatus::class,
            'payment_method' => PaymentMethod::class,
            'total' => 'integer',
            'tax_rate' => 'decimal:3',
            'lock_version' => 'integer',
            'send_reminder' => 'boolean',
        ];
    }
}
