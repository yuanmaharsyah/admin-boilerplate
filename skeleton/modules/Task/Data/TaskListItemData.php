<?php

declare(strict_types=1);

namespace Modules\Task\Data;

use Modules\Task\Enums\TaskPriority;
use Modules\Task\Enums\TaskStatus;
use Modules\Task\Models\Task;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/** One row of the kanban list. */
#[TypeScript]
final class TaskListItemData extends Data
{
    public function __construct(
        public int $id,
        public string $title,
        public TaskStatus $status,
        public string $status_label,
        public TaskPriority $priority,
        public string $priority_label,
        public ?string $assignee,
        public ?string $due_on,
        public int $position,
    ) {}

    public static function fromModel(Task $task): self
    {
        return new self(
            id: $task->id,
            title: $task->title,
            status: $task->status,
            status_label: $task->status->label(),
            priority: $task->priority,
            priority_label: $task->priority->label(),
            assignee: $task->assignee,
            due_on: $task->due_on?->toDateString(),
            position: $task->position,
        );
    }
}
