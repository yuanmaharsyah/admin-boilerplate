<?php

declare(strict_types=1);

namespace Modules\Sample\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Sample\Data\SampleData;
use Modules\Sample\Data\SampleFormOptionsData;
use Modules\Sample\Data\SampleListItemData;
use Modules\Sample\Data\StoreSampleData;
use Modules\Sample\Data\UpdateSampleData;
use Modules\Sample\Exports\SampleExport;
use Modules\Sample\Models\Sample;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;
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
use Yuan\AdminCore\Exports\ExportManager;
use Yuan\AdminCore\Trash\Trash;

final class SampleController
{
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Sample::class);

        return Inertia::render('Sample::Index', [
            'samples' => PaginatedData::fromPaginator(Sample::query()->visibleTo($request->user())->with('customer')->dataTable($request), SampleListItemData::class),
            'table' => Sample::dataTableState($request),
        ]);
    }

    /** The RelationSelect lookup of other modules: up to 20 records matching `search`. */
    public function lookup(Request $request): LookupData
    {
        Gate::authorize('viewAny', Sample::class);

        $query = Sample::query()->visibleTo($request->user());
        DataTableQuery::applySearch($query, (new Sample)->dataTableSearch(), DataTableQuery::search($request));

        return new LookupData(array_values(
            $query->latest('id')->limit(LookupData::LIMIT)->get()
                ->map(fn (Sample $model): OptionData => new OptionData((string) $model->id, $model->auditLabel()))
                ->all(),
        ));
    }

    public function show(Request $request, int $sample): Response
    {
        $model = Sample::query()->visibleTo($request->user())->with('customer')->findOrFail($sample);
        Gate::authorize('view', $model);

        return Inertia::render('Sample::Show', [
            'sample' => SampleData::fromModel($model),
            'attachments' => AttachmentController::data($model, $request->user()),
            'history' => ActivityHistory::prop($model, $request->user()),
            'breadcrumbs' => self::breadcrumbs(new BreadcrumbData(label: $model->auditLabel(), href: null)),
        ]);
    }

    public function download(Request $request): SymfonyResponse
    {
        Gate::authorize('download', Sample::class);

        return ExportManager::for(SampleExport::class, $request);
    }

    public function create(Request $request): Response
    {
        Gate::authorize('create', Sample::class);

        return Inertia::render('Sample::Create', [
            'options' => SampleFormOptionsData::make(),
            'attachments' => AttachmentController::data(new Sample, $request->user()),
            'breadcrumbs' => self::breadcrumbs(new BreadcrumbData(label: __('Tambah'), href: null)),
        ]);
    }

    public function store(Request $request, StoreSampleData $data): RedirectResponse
    {
        Gate::authorize('create', Sample::class);

        $sample = AttachmentUploads::saveWith(fn (): Sample => Sample::query()->create($data->except('files')->toArray()), $data->files, $request->user());
        Inertia::flash((new FlashData(success: __('Contoh dibuat.'), description: $sample->auditLabel()))->toArray());

        return to_route('samples.show', $sample);
    }

    public function edit(Request $request, int $sample): Response
    {
        $model = Sample::query()->visibleTo($request->user())->with('customer')->findOrFail($sample);
        Gate::authorize('update', $model);

        return Inertia::render('Sample::Edit', [
            'sample' => SampleData::fromModel($model),
            'options' => SampleFormOptionsData::make(),
            'attachments' => AttachmentController::data($model, $request->user()),
            'breadcrumbs' => self::breadcrumbs(
                new BreadcrumbData(label: $model->auditLabel(), href: route('samples.show', $model)),
                new BreadcrumbData(label: __('Edit'), href: null),
            ),
        ]);
    }

    public function update(Request $request, UpdateSampleData $data, int $sample): RedirectResponse
    {
        $model = Sample::query()->visibleTo($request->user())->findOrFail($sample);
        Gate::authorize('update', $model);

        AttachmentUploads::saveWith(function () use ($model, $data): Sample {
            $model->updateUnlessStale($data->except('lock_version', 'files')->toArray(), $data->lock_version);

            return $model;
        }, $data->files, $request->user());
        Inertia::flash((new FlashData(success: __('Perubahan disimpan.'), description: $model->auditLabel()))->toArray());

        return to_route('samples.show', $model);
    }

    public function destroy(Request $request, int $sample): RedirectResponse
    {
        $model = Sample::query()->visibleTo($request->user())->findOrFail($sample);
        Gate::authorize('delete', $model);

        Trash::delete($model->newCollection([$model]), 'samples');

        return to_route('samples.index');
    }

    public function bulkDestroy(Request $request, SelectionData $data): RedirectResponse
    {
        $records = Sample::query()->visibleTo($request->user())->whereKey($data->ids)->get();
        $records->each(fn (Sample $record) => Gate::authorize('delete', $record));

        Trash::delete($records, 'samples');

        return back();
    }

    private static function breadcrumbs(BreadcrumbData ...$items): BreadcrumbsData
    {
        return BreadcrumbsData::of(new BreadcrumbData(label: __('Contoh'), href: route('samples.index')), ...$items);
    }
}
