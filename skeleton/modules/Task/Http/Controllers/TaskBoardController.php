<?php

declare(strict_types=1);

namespace Modules\Task\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Task\Data\MoveTasksData;
use Modules\Task\Data\TaskBoardData;
use Modules\Task\Data\TaskCardData;
use Modules\Task\Data\TaskColumnData;
use Modules\Task\Enums\TaskStatus;
use Modules\Task\Models\Task;
use Modules\Task\Services\TaskBoard;
use Yuan\AdminCore\Data\BreadcrumbData;
use Yuan\AdminCore\Data\BreadcrumbsData;

/**
 * Kanban → Papan (demo module, restyle 03): the tasks the user may see, one
 * column per status, ordered by position; a move goes through TaskBoard.
 */
final class TaskBoardController
{
    public function board(Request $request): Response
    {
        Gate::authorize('viewAny', Task::class);

        $tasks = Task::query()->visibleTo($request->user())->orderBy('position')->orderBy('id')->limit(TaskBoardData::LIMIT)->get();

        return Inertia::render('Task::Board', [
            'board' => new TaskBoardData(
                columns: array_map(fn (TaskStatus $status): TaskColumnData => new TaskColumnData(
                    key: $status->value,
                    label: $status->label(),
                    ids: array_values($tasks->filter(fn (Task $task): bool => $task->status === $status)->pluck('id')->map(fn (mixed $id): int => (int) $id)->all()),
                ), TaskStatus::cases()),
                cards: array_values($tasks->map(fn (Task $task): TaskCardData => TaskCardData::fromModel($task))->all()),
                move_href: Gate::allows('update', new Task) ? route('kanban.board.move') : null,
            ),
            'breadcrumbs' => BreadcrumbsData::of(
                new BreadcrumbData(label: __('Kanban'), href: route('kanban.index')),
                new BreadcrumbData(label: __('Papan')),
            ),
        ]);
    }

    public function move(Request $request, MoveTasksData $data, TaskBoard $board): RedirectResponse
    {
        $board->move($data->columns, $request->user());

        return to_route('kanban.board');
    }
}
