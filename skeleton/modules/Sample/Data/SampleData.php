<?php

declare(strict_types=1);

namespace Modules\Sample\Data;

use Modules\Sample\Enums\SampleStatus;
use Modules\Sample\Models\Sample;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/** One contoh record, for its Show and Edit pages. */
#[TypeScript]
final class SampleData extends Data
{
    public function __construct(
        public int $id,
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
        public string $status_label,
        public int $customer_id,
        public string $customer_name,
        public int $lock_version,
    ) {}

    public static function fromModel(Sample $sample): self
    {
        return new self(
            id: $sample->id,
            nama: $sample->nama,
            kode: $sample->kode,
            catatan: $sample->catatan,
            jumlah: $sample->jumlah,
            tahun: $sample->tahun,
            berat: $sample->berat === null ? null : (float) $sample->berat,
            harga: $sample->harga,
            aktif: $sample->aktif,
            mulai_tanggal: $sample->mulai_tanggal->toDateString(),
            selesai_pada: $sample->selesai_pada?->format('Y-m-d H:i'),
            status: $sample->status,
            status_label: $sample->status->label(),
            customer_id: $sample->customer_id,
            customer_name: $sample->customer->auditLabel(),
            lock_version: $sample->lock_version,
        );
    }
}
