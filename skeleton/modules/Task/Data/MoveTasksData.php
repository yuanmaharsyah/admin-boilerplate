<?php

declare(strict_types=1);

namespace Modules\Task\Data;

use Modules\Task\Enums\TaskStatus;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/** A board move: every column's card ids in their new order. */
#[TypeScript]
final class MoveTasksData extends Data
{
    /**
     * @param  array<string, list<int>>  $columns
     */
    public function __construct(
        public array $columns,
    ) {}

    /**
     * @return array<string, list<mixed>>
     */
    public static function rules(): array
    {
        return [
            'columns' => ['required', 'array:'.implode(',', array_column(TaskStatus::cases(), 'value'))],
            'columns.*' => ['array'],
            'columns.*.*' => ['integer', 'distinct'],
        ];
    }
}
