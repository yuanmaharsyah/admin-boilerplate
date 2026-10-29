<?php

declare(strict_types=1);

namespace Modules\SampleAdmin\Data;

use Modules\SampleAdmin\Models\SampleAdmin;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/** One row of the contoh khusus super admin list. */
#[TypeScript]
final class SampleAdminListItemData extends Data
{
    public function __construct(
        public int $id,
        public string $judul,
    ) {}

    public static function fromModel(SampleAdmin $sampleAdmin): self
    {
        return new self(
            id: $sampleAdmin->id,
            judul: $sampleAdmin->judul,
        );
    }
}
