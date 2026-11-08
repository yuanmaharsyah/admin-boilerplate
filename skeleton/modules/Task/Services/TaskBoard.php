<?php

declare(strict_types=1);

namespace Modules\Task\Services;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Modules\Task\Enums\TaskStatus;
use Modules\Task\Models\Task;
use Yuan\AdminCore\Audit\Audit;

/**
 * A board move (Kanban → Papan): every column's card ids in their new order.
 * Each card must be one the user may see and update; changed cards save their
 * status and position in one transaction and one audit batch.
 */
final class TaskBoard
{
    /**
     * @param  array<string, list<int>>  $columns
     */
    public function move(array $columns, ?Authenticatable $user): void
    {
        $ids = array_merge(...array_values($columns));
        $tasks = Task::query()->visibleTo($user)->whereKey($ids)->get()->keyBy('id');
        abort_if($tasks->count() !== count($ids), 404);

        Audit::batch(fn () => DB::transaction(function () use ($columns, $tasks, $user): void {
            foreach ($columns as $status => $columnIds) {
                foreach ($columnIds as $position => $id) {
                    $task = $tasks->get($id);

                    if ($task instanceof Task) {
                        Gate::forUser($user)->authorize('update', $task);
                        $task->fill(['status' => TaskStatus::from($status), 'position' => $position]);

                        if ($task->isDirty()) {
                            $task->save();
                        }
                    }
                }
            }
        }));
    }
}
