<?php

declare(strict_types=1);

namespace Modules\Customer\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/** One customer, for its Show page. */
#[TypeScript]
final class CustomerData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public ?string $city,
        public ?string $no_hp,
        public string $updated_at,
    ) {}
}
