<?php

declare(strict_types=1);

namespace Modules\Task\Models;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Attributes\UseFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Modules\Task\Database\Factories\TaskFactory;
use Modules\Task\Enums\TaskPriority;
use Modules\Task\Enums\TaskStatus;
use Yuan\AdminCore\Audit\HasActivityHistory;
use Yuan\AdminCore\Audit\LogsModuleActivity;
use Yuan\AdminCore\Concurrency\PreventsStaleUpdates;
use Yuan\AdminCore\Data\DataTableFilterData;
use Yuan\AdminCore\DataTable\DataTableModel;
use Yuan\AdminCore\DataTable\HasDataTable;
use Yuan\AdminCore\DataTable\HasVisibilityScope;

/**
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property TaskStatus $status
 * @property TaskPriority $priority
 * @property string|null $assignee
 * @property CarbonImmutable|null $due_on
 * @property int $position
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property int $lock_version
 */
#[UseFactory(TaskFactory::class)]
final class Task extends Model implements DataTableModel
{
    /** @use HasFactory<TaskFactory> */
    use HasActivityHistory, HasDataTable, HasFactory, HasVisibilityScope, LogsModuleActivity, PreventsStaleUpdates, SoftDeletes;

    /** @var array<string, mixed> */
    protected $attributes = ['lock_version' => 0];

    protected $fillable = ['title', 'description', 'status', 'priority', 'assignee', 'due_on', 'position'];

    public function dataTableSearch(): array
    {
        return ['title', 'assignee'];
    }

    public function dataTableSorts(): array
    {
        return ['title', 'assignee', 'due_on', 'position'];
    }

    public function dataTableFilters(): array
    {
        return [new DataTableFilterData('status', __('Status'), TaskStatus::options()), new DataTableFilterData('priority', __('Prioritas'), TaskPriority::options())];
    }

    protected function casts(): array
    {
        return [
            'status' => TaskStatus::class,
            'priority' => TaskPriority::class,
            'due_on' => 'immutable_date',
            'position' => 'integer',
            'lock_version' => 'integer',
        ];
    }
}
