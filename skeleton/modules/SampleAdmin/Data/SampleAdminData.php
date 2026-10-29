<?php

declare(strict_types=1);

namespace Modules\SampleAdmin\Data;

use Modules\SampleAdmin\Models\SampleAdmin;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/** One contoh khusus super admin record, for its Show and Edit pages. */
#[TypeScript]
final class SampleAdminData extends Data
{
    public function __construct(
        public int $id,
        public string $judul,
        public ?string $catatan,
        public int $lock_version,
    ) {}

    public static function fromModel(SampleAdmin $sampleAdmin): self
    {
        return new self(
            id: $sampleAdmin->id,
            judul: $sampleAdmin->judul,
            catatan: $sampleAdmin->catatan,
            lock_version: $sampleAdmin->lock_version,
        );
    }
}
