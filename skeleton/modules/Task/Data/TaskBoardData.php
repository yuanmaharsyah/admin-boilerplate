<?php

declare(strict_types=1);

namespace Modules\Task\Data;

use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/** Props of `Task::Board`: the columns and the cards (at most LIMIT); `move_href` is null without `kanban.edit`. */
#[TypeScript]
final class TaskBoardData extends Data
{
    public const int LIMIT = 200;

    /**
     * @param  list<TaskColumnData>  $columns
     * @param  list<TaskCardData>  $cards
     */
    public function __construct(
        #[DataCollectionOf(TaskColumnData::class)]
        public array $columns,
        #[DataCollectionOf(TaskCardData::class)]
        public array $cards,
        public ?string $move_href,
    ) {}
}
