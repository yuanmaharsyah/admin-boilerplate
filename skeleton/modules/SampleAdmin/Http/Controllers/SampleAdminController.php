<?php

declare(strict_types=1);

namespace Modules\SampleAdmin\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Modules\SampleAdmin\Data\SampleAdminData;
use Modules\SampleAdmin\Data\SampleAdminListItemData;
use Modules\SampleAdmin\Data\StoreSampleAdminData;
use Modules\SampleAdmin\Data\UpdateSampleAdminData;
use Modules\SampleAdmin\Models\SampleAdmin;
use Yuan\AdminCore\Attachments\AttachmentController;
use Yuan\AdminCore\Attachments\AttachmentUploads;
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

final class SampleAdminController
{
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', SampleAdmin::class);

        return Inertia::render('SampleAdmin::Index', [
            'sampleAdmins' => PaginatedData::fromPaginator(SampleAdmin::query()->visibleTo($request->user())->dataTable($request), SampleAdminListItemData::class),
            'table' => SampleAdmin::dataTableState($request),
        ]);
    }

    /** The RelationSelect lookup of other modules: up to 20 records matching `search`. */
    public function lookup(Request $request): LookupData
    {
        Gate::authorize('viewAny', SampleAdmin::class);

        $query = SampleAdmin::query()->visibleTo($request->user());
        DataTableQuery::applySearch($query, (new SampleAdmin)->dataTableSearch(), DataTableQuery::search($request));

        return new LookupData(array_values(
            $query->latest('id')->limit(LookupData::LIMIT)->get()
                ->map(fn (SampleAdmin $model): OptionData => new OptionData((string) $model->id, $model->auditLabel()))
                ->all(),
        ));
    }

    public function show(Request $request, int $sampleAdmin): Response
    {
        $model = SampleAdmin::query()->visibleTo($request->user())->findOrFail($sampleAdmin);
        Gate::authorize('view', $model);

        return Inertia::render('SampleAdmin::Show', [
            'sampleAdmin' => SampleAdminData::fromModel($model),
            'attachments' => AttachmentController::data($model, $request->user()),
            'history' => ActivityHistory::prop($model, $request->user()),
            'breadcrumbs' => self::breadcrumbs(new BreadcrumbData(label: $model->auditLabel(), href: null)),
        ]);
    }

    public function create(Request $request): Response
    {
        Gate::authorize('create', SampleAdmin::class);

        return Inertia::render('SampleAdmin::Create', [
            'attachments' => AttachmentController::data(new SampleAdmin, $request->user()),
            'breadcrumbs' => self::breadcrumbs(new BreadcrumbData(label: __('Tambah'), href: null)),
        ]);
    }

    public function store(Request $request, StoreSampleAdminData $data): RedirectResponse
    {
        Gate::authorize('create', SampleAdmin::class);

        $sampleAdmin = AttachmentUploads::saveWith(fn (): SampleAdmin => SampleAdmin::query()->create($data->except('files')->toArray()), $data->files, $request->user());
        Inertia::flash((new FlashData(success: __('Contoh khusus Super Admin dibuat.'), description: $sampleAdmin->auditLabel()))->toArray());

        return to_route('sample-admin.show', $sampleAdmin);
    }

    public function edit(Request $request, int $sampleAdmin): Response
    {
        $model = SampleAdmin::query()->visibleTo($request->user())->findOrFail($sampleAdmin);
        Gate::authorize('update', $model);

        return Inertia::render('SampleAdmin::Edit', [
            'sampleAdmin' => SampleAdminData::fromModel($model),
            'attachments' => AttachmentController::data($model, $request->user()),
            'breadcrumbs' => self::breadcrumbs(
                new BreadcrumbData(label: $model->auditLabel(), href: route('sample-admin.show', $model)),
                new BreadcrumbData(label: __('Edit'), href: null),
            ),
        ]);
    }

    public function update(Request $request, UpdateSampleAdminData $data, int $sampleAdmin): RedirectResponse
    {
        $model = SampleAdmin::query()->visibleTo($request->user())->findOrFail($sampleAdmin);
        Gate::authorize('update', $model);

        AttachmentUploads::saveWith(function () use ($model, $data): SampleAdmin {
            $model->updateUnlessStale($data->except('lock_version', 'files')->toArray(), $data->lock_version);

            return $model;
        }, $data->files, $request->user());
        Inertia::flash((new FlashData(success: __('Perubahan disimpan.'), description: $model->auditLabel()))->toArray());

        return to_route('sample-admin.show', $model);
    }

    public function destroy(Request $request, int $sampleAdmin): RedirectResponse
    {
        $model = SampleAdmin::query()->visibleTo($request->user())->findOrFail($sampleAdmin);
        Gate::authorize('delete', $model);

        Trash::delete($model->newCollection([$model]), 'sample-admin');

        return to_route('sample-admin.index');
    }

    public function bulkDestroy(Request $request, SelectionData $data): RedirectResponse
    {
        $records = SampleAdmin::query()->visibleTo($request->user())->whereKey($data->ids)->get();
        $records->each(fn (SampleAdmin $record) => Gate::authorize('delete', $record));

        Trash::delete($records, 'sample-admin');

        return back();
    }

    private static function breadcrumbs(BreadcrumbData ...$items): BreadcrumbsData
    {
        return BreadcrumbsData::of(new BreadcrumbData(label: __('Contoh khusus Super Admin'), href: route('sample-admin.index')), ...$items);
    }
}
