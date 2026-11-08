<?php

declare(strict_types=1);

namespace Modules\Task\Data;

use Illuminate\Validation\Rule;
use Modules\Task\Enums\TaskPriority;
use Modules\Task\Enums\TaskStatus;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/** The create form of a kanban record. */
#[TypeScript]
final class StoreTaskData extends Data
{
    public function __construct(
        public string $title,
        public ?string $description,
        public TaskStatus $status,
        public TaskPriority $priority,
        public ?string $assignee,
        public ?string $due_on,
        public int $position,
    ) {}

    /**
     * @return array<string, list<mixed>>
     */
    public static function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'status' => ['required', Rule::enum(TaskStatus::class)],
            'priority' => ['required', Rule::enum(TaskPriority::class)],
            'assignee' => ['nullable', 'string', 'max:255'],
            'due_on' => ['nullable', 'date_format:Y-m-d'],
            'position' => ['required', 'integer'],
        ];
    }

    /**
     * Field names in validation messages.
     *
     * @return array<string, string>
     */
    public static function attributes(): array
    {
        return [
            'title' => __('title'),
            'description' => __('description'),
            'status' => __('status'),
            'priority' => __('priority'),
            'assignee' => __('assignee'),
            'due_on' => __('due on'),
            'position' => __('position'),
        ];
    }
}
