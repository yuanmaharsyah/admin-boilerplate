<?php

declare(strict_types=1);

namespace Modules\SampleReadonly\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Modules\SampleReadonly\Data\SampleReadonlyData;
use Modules\SampleReadonly\Data\SampleReadonlyListItemData;
use Modules\SampleReadonly\Models\SampleReadonly;
use Yuan\AdminCore\Audit\ActivityHistory;
use Yuan\AdminCore\Data\BreadcrumbData;
use Yuan\AdminCore\Data\BreadcrumbsData;
use Yuan\AdminCore\Data\LookupData;
use Yuan\AdminCore\Data\OptionData;
use Yuan\AdminCore\Data\PaginatedData;
use Yuan\AdminCore\DataTable\DataTableQuery;

final class SampleReadonlyController
{
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', SampleReadonly::class);

        return Inertia::render('SampleReadonly::Index', [
            'sampleReadonlies' => PaginatedData::fromPaginator(SampleReadonly::query()->visibleTo($request->user())->dataTable($request), SampleReadonlyListItemData::class),
            'table' => SampleReadonly::dataTableState($request),
        ]);
    }

    /** The RelationSelect lookup of other modules: up to 20 records matching `search`. */
    public function lookup(Request $request): LookupData
    {
        Gate::authorize('viewAny', SampleReadonly::class);

        $query = SampleReadonly::query()->visibleTo($request->user());
        DataTableQuery::applySearch($query, (new SampleReadonly)->dataTableSearch(), DataTableQuery::search($request));

        return new LookupData(array_values(
            $query->latest('id')->limit(LookupData::LIMIT)->get()
                ->map(fn (SampleReadonly $model): OptionData => new OptionData((string) $model->id, $model->auditLabel()))
                ->all(),
        ));
    }

    public function show(Request $request, int $sampleReadonly): Response
    {
        $model = SampleReadonly::query()->visibleTo($request->user())->findOrFail($sampleReadonly);
        Gate::authorize('view', $model);

        return Inertia::render('SampleReadonly::Show', [
            'sampleReadonly' => SampleReadonlyData::fromModel($model),
            'history' => ActivityHistory::prop($model, $request->user()),
            'breadcrumbs' => self::breadcrumbs(new BreadcrumbData(label: $model->auditLabel(), href: null)),
        ]);
    }

    private static function breadcrumbs(BreadcrumbData ...$items): BreadcrumbsData
    {
        return BreadcrumbsData::of(new BreadcrumbData(label: __('Contoh baca saja'), href: route('sample-readonly.index')), ...$items);
    }
}
