<?php

declare(strict_types=1);

namespace Modules\SampleReadonly\Data;

use Modules\SampleReadonly\Enums\SampleReadonlyStatus;
use Modules\SampleReadonly\Models\SampleReadonly;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/** One contoh baca saja record, for its Show and Edit pages. */
#[TypeScript]
final class SampleReadonlyData extends Data
{
    public function __construct(
        public int $id,
        public string $nama,
        public int $jumlah,
        public SampleReadonlyStatus $status,
        public string $status_label,
        public ?string $tanggal,
    ) {}

    public static function fromModel(SampleReadonly $sampleReadonly): self
    {
        return new self(
            id: $sampleReadonly->id,
            nama: $sampleReadonly->nama,
            jumlah: $sampleReadonly->jumlah,
            status: $sampleReadonly->status,
            status_label: $sampleReadonly->status->label(),
            tanggal: $sampleReadonly->tanggal?->toDateString(),
        );
    }
}
