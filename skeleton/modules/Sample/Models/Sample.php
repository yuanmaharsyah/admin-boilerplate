<?php

declare(strict_types=1);

namespace Modules\Sample\Models;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Attributes\UseFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Modules\Customer\Models\Customer;
use Modules\Sample\Database\Factories\SampleFactory;
use Modules\Sample\Enums\SampleStatus;
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
 * @property string $nama
 * @property string|null $kode
 * @property string|null $catatan
 * @property int $jumlah
 * @property int $tahun
 * @property string|null $berat
 * @property int $harga
 * @property bool $aktif
 * @property CarbonImmutable $mulai_tanggal
 * @property CarbonImmutable|null $selesai_pada
 * @property SampleStatus $status
 * @property int $customer_id
 * @property-read Customer $customer
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property int $lock_version
 */
#[UseFactory(SampleFactory::class)]
final class Sample extends Model implements DataTableModel
{
    /** @use HasFactory<SampleFactory> */
    use HasActivityHistory, HasAttachments, HasDataTable, HasFactory, HasVisibilityScope, LogsModuleActivity, PreventsStaleUpdates, SoftDeletes;

    /** @var array<string, mixed> */
    protected $attributes = ['lock_version' => 0];

    protected $fillable = ['nama', 'kode', 'catatan', 'jumlah', 'tahun', 'berat', 'harga', 'aktif', 'mulai_tanggal', 'selesai_pada', 'status', 'customer_id'];

    /**
     * @return BelongsTo<Customer, $this>
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id')->withTrashed();
    }

    /**
     * @return array<string, AttachmentSlot>
     */
    public function attachmentSlots(): array
    {
        return [
            'foto' => AttachmentSlot::single(__('Foto'))->mimes(['jpg', 'png'])->maxKb(2048),
            'dokumen' => AttachmentSlot::multiple(__('Dokumen')),
        ];
    }

    public function auditLabel(): string
    {
        return $this->nama;
    }

    public function dataTableSearch(): array
    {
        return ['nama', 'kode'];
    }

    public function dataTableSorts(): array
    {
        return ['nama', 'kode', 'jumlah', 'tahun', 'berat', 'harga', 'mulai_tanggal', 'selesai_pada'];
    }

    public function dataTableFilters(): array
    {
        return [new DataTableFilterData('status', __('Status'), SampleStatus::options())];
    }

    protected function casts(): array
    {
        return [
            'jumlah' => 'integer',
            'tahun' => 'integer',
            'berat' => 'decimal:3',
            'harga' => 'integer',
            'aktif' => 'boolean',
            'mulai_tanggal' => 'immutable_date',
            'selesai_pada' => 'immutable_datetime',
            'status' => SampleStatus::class,
            'customer_id' => 'integer',
            'lock_version' => 'integer',
        ];
    }
}
