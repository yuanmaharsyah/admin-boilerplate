<?php

declare(strict_types=1);

namespace Modules\Task\Data;

use Modules\Task\Enums\TaskPriority;
use Modules\Task\Enums\TaskStatus;
use Modules\Task\Models\Task;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/** One kanban record, for its Show and Edit pages. */
#[TypeScript]
final class TaskData extends Data
{
    public function __construct(
        public int $id,
        public string $title,
        public ?string $description,
        public TaskStatus $status,
        public string $status_label,
        public TaskPriority $priority,
        public string $priority_label,
        public ?string $assignee,
        public ?string $due_on,
        public int $position,
        public int $lock_version,
    ) {}

    public static function fromModel(Task $task): self
    {
        return new self(
            id: $task->id,
            title: $task->title,
            description: $task->description,
            status: $task->status,
            status_label: $task->status->label(),
            priority: $task->priority,
            priority_label: $task->priority->label(),
            assignee: $task->assignee,
            due_on: $task->due_on?->toDateString(),
            position: $task->position,
            lock_version: $task->lock_version,
        );
    }
}
