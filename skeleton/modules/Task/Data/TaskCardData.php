<?php

declare(strict_types=1);

namespace Modules\Task\Data;

use Modules\Task\Enums\TaskPriority;
use Modules\Task\Models\Task;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/** One card on the Kanban board. */
#[TypeScript]
final class TaskCardData extends Data
{
    public function __construct(
        public int $id,
        public string $title,
        public ?string $description,
        public TaskPriority $priority,
        public string $priority_label,
        public ?string $assignee,
        public ?string $due_on,
    ) {}

    public static function fromModel(Task $task): self
    {
        return new self(
            id: $task->id,
            title: $task->title,
            description: $task->description,
            priority: $task->priority,
            priority_label: $task->priority->label(),
            assignee: $task->assignee,
            due_on: $task->due_on?->toDateString(),
        );
    }
}
