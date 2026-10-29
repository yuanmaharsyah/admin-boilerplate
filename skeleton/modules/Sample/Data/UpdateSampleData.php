<?php

declare(strict_types=1);

namespace Modules\Sample\Data;

use Illuminate\Validation\Rule;
use Modules\Customer\Models\Customer;
use Modules\Sample\Enums\SampleStatus;
use Modules\Sample\Models\Sample;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\LiteralTypeScriptType;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Yuan\AdminCore\Attachments\AttachmentUploads;
use Yuan\AdminCore\Validation\VisibleRecord;

/** The edit form; `lock_version` is the version it loaded (PreventsStaleUpdates). */
#[TypeScript]
final class UpdateSampleData extends Data
{
    /**
     * @param  array<string, mixed>  $files  Attachment slot => an upload, or a list of uploads (`attachmentSlots()`).
     */
    public function __construct(
        public string $nama,
        public ?string $kode,
        public ?string $catatan,
        public int $jumlah,
        public int $tahun,
        public ?float $berat,
        public int $harga,
        public bool $aktif,
        public string $mulai_tanggal,
        public ?string $selesai_pada,
        public SampleStatus $status,
        public int $customer_id,
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
            'nama' => ['required', 'string', 'max:255'],
            'kode' => ['nullable', 'string', 'max:255'],
            'catatan' => ['nullable', 'string', 'max:5000'],
            'jumlah' => ['required', 'integer'],
            'tahun' => ['required', 'integer', 'between:1900,2100'],
            'berat' => ['nullable', 'numeric'],
            'harga' => ['required', 'integer', 'min:0'],
            'aktif' => ['boolean'],
            'mulai_tanggal' => ['required', 'date_format:Y-m-d'],
            'selesai_pada' => ['nullable', 'date_format:Y-m-d H:i'],
            'status' => ['required', Rule::enum(SampleStatus::class)],
            'customer_id' => ['required', 'integer', new VisibleRecord(Customer::class)],
            'lock_version' => ['required', 'integer', 'min:0'],
            ...AttachmentUploads::rules(Sample::class, is_numeric($id = request()->route('sample')) ? Sample::query()->find((int) $id) : null),
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
            'nama' => __('nama'),
            'kode' => __('kode'),
            'catatan' => __('catatan'),
            'jumlah' => __('jumlah'),
            'tahun' => __('tahun'),
            'berat' => __('berat'),
            'harga' => __('harga'),
            'aktif' => __('aktif'),
            'mulai_tanggal' => __('mulai tanggal'),
            'selesai_pada' => __('selesai pada'),
            'status' => __('status'),
            'customer_id' => __('customer'),
            ...AttachmentUploads::attributes(Sample::class),
        ];
    }
}
