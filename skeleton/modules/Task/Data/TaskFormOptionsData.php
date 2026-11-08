<?php

declare(strict_types=1);

namespace Modules\Task\Data;

use Modules\Task\Enums\TaskPriority;
use Modules\Task\Enums\TaskStatus;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Yuan\AdminCore\Data\OptionData;

/** The choices of the kanban form's selects. */
#[TypeScript]
final class TaskFormOptionsData extends Data
{
    /**
     * @param  list<OptionData>  $status_options
     * @param  list<OptionData>  $priority_options
     */
    public function __construct(
        public array $status_options,
        public array $priority_options,
    ) {}

    public static function make(): self
    {
        return new self(status_options: TaskStatus::options(), priority_options: TaskPriority::options());
    }
}
