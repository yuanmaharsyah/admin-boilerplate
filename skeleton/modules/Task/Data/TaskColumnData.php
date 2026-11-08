<?php

declare(strict_types=1);

namespace Modules\Task\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/** One status column of the board: its card ids in order. */
#[TypeScript]
final class TaskColumnData extends Data
{
    /**
     * @param  list<int>  $ids
     */
    public function __construct(
        public string $key,
        public string $label,
        public array $ids,
    ) {}
}
