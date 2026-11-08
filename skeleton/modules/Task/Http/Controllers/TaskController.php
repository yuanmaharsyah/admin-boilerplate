<?php

declare(strict_types=1);

namespace Modules\Task\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Task\Data\StoreTaskData;
use Modules\Task\Data\TaskData;
use Modules\Task\Data\TaskFormOptionsData;
use Modules\Task\Data\TaskListItemData;
use Modules\Task\Data\UpdateTaskData;
use Modules\Task\Models\Task;
use Yuan\AdminCore\Audit\ActivityHistory;
use Yuan\AdminCore\Data\BreadcrumbData;
use Yuan\AdminCore\Data\BreadcrumbsData;
use Yuan\AdminCore\Data\FlashData;
use Yuan\AdminCore\Data\LookupData;
use Yuan\AdminCore\Data\OptionData;
use Yuan\AdminCore\Data\PaginatedData;
use Yuan\AdminCore\Data\SelectionData;
use Yuan\AdminCore\DataTable\DataTableQuery;
use Yuan\AdminCore\Trash\Trash;

final class TaskController
{
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Task::class);

        return Inertia::render('Task::Index', [
            'tasks' => PaginatedData::fromPaginator(Task::query()->visibleTo($request->user())->dataTable($request), TaskListItemData::class),
            'table' => Task::dataTableState($request),
        ]);
    }

    /** The RelationSelect lookup of other modules: up to 20 records matching `search`. */
    public function lookup(Request $request): LookupData
    {
        Gate::authorize('viewAny', Task::class);

        $query = Task::query()->visibleTo($request->user());
        DataTableQuery::applySearch($query, (new Task)->dataTableSearch(), DataTableQuery::search($request));

        return new LookupData(array_values(
            $query->latest('id')->limit(LookupData::LIMIT)->get()
                ->map(fn (Task $model): OptionData => new OptionData((string) $model->id, $model->auditLabel()))
                ->all(),
        ));
    }

    public function show(Request $request, int $task): Response
    {
        $model = Task::query()->visibleTo($request->user())->findOrFail($task);
        Gate::authorize('view', $model);

        return Inertia::render('Task::Show', [
            'task' => TaskData::fromModel($model),
            'history' => ActivityHistory::prop($model, $request->user()),
            'breadcrumbs' => self::breadcrumbs(new BreadcrumbData(label: $model->auditLabel(), href: null)),
        ]);
    }

    public function create(Request $request): Response
    {
        Gate::authorize('create', Task::class);

        return Inertia::render('Task::Create', [
            'options' => TaskFormOptionsData::make(),
            'breadcrumbs' => self::breadcrumbs(new BreadcrumbData(label: __('Tambah'), href: null)),
        ]);
    }

    public function store(Request $request, StoreTaskData $data): RedirectResponse
    {
        Gate::authorize('create', Task::class);

        $task = Task::query()->create($data->toArray());
        Inertia::flash((new FlashData(success: __('Kanban dibuat.'), description: $task->auditLabel()))->toArray());

        return to_route('kanban.show', $task);
    }

    public function edit(Request $request, int $task): Response
    {
        $model = Task::query()->visibleTo($request->user())->findOrFail($task);
        Gate::authorize('update', $model);

        return Inertia::render('Task::Edit', [
            'task' => TaskData::fromModel($model),
            'options' => TaskFormOptionsData::make(),
            'breadcrumbs' => self::breadcrumbs(
                new BreadcrumbData(label: $model->auditLabel(), href: route('kanban.show', $model)),
                new BreadcrumbData(label: __('Edit'), href: null),
            ),
        ]);
    }

    public function update(Request $request, UpdateTaskData $data, int $task): RedirectResponse
    {
        $model = Task::query()->visibleTo($request->user())->findOrFail($task);
        Gate::authorize('update', $model);

        $model->updateUnlessStale($data->except('lock_version')->toArray(), $data->lock_version);
        Inertia::flash((new FlashData(success: __('Perubahan disimpan.'), description: $model->auditLabel()))->toArray());

        return to_route('kanban.show', $model);
    }

    public function destroy(Request $request, int $task): RedirectResponse
    {
        $model = Task::query()->visibleTo($request->user())->findOrFail($task);
        Gate::authorize('delete', $model);

        Trash::delete($model->newCollection([$model]), 'kanban');

        return to_route('kanban.index');
    }

    public function bulkDestroy(Request $request, SelectionData $data): RedirectResponse
    {
        $records = Task::query()->visibleTo($request->user())->whereKey($data->ids)->get();
        $records->each(fn (Task $record) => Gate::authorize('delete', $record));

        Trash::delete($records, 'kanban');

        return back();
    }

    private static function breadcrumbs(BreadcrumbData ...$items): BreadcrumbsData
    {
        return BreadcrumbsData::of(new BreadcrumbData(label: __('Kanban'), href: route('kanban.index')), ...$items);
    }
}
