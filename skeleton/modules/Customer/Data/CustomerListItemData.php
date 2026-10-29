<?php

declare(strict_types=1);

namespace Modules\Customer\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
final class CustomerListItemData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public ?string $city,
        public ?string $no_hp,
    ) {}
}
