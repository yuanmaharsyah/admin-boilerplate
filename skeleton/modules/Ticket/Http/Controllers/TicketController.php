<?php

declare(strict_types=1);

namespace Modules\Ticket\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Ticket\Data\StoreTicketData;
use Modules\Ticket\Data\TicketData;
use Modules\Ticket\Data\TicketFormOptionsData;
use Modules\Ticket\Data\TicketListItemData;
use Modules\Ticket\Data\TicketSummaryData;
use Modules\Ticket\Data\UpdateTicketData;
use Modules\Ticket\Enums\TicketStatus;
use Modules\Ticket\Models\Ticket;
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

final class TicketController
{
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Ticket::class);

        return Inertia::render('Ticket::Index', [
            'tickets' => PaginatedData::fromPaginator(Ticket::query()->visibleTo($request->user())->dataTable($request), TicketListItemData::class),
            'table' => Ticket::dataTableState($request),
            'summary' => self::summary($request),
        ]);
    }

    private static function summary(Request $request): TicketSummaryData
    {
        /** @var array<string, int> $counts */
        $counts = Ticket::query()->visibleTo($request->user())
            ->groupBy('status')
            ->selectRaw('status, count(*) as total')
            ->toBase()
            ->pluck('total', 'status')
            ->map(fn (mixed $total): int => (int) $total)
            ->all();

        return new TicketSummaryData(
            total: array_sum($counts),
            new: $counts[TicketStatus::Baru->value] ?? 0,
            open: ($counts[TicketStatus::Dibuka->value] ?? 0) + ($counts[TicketStatus::Menunggu->value] ?? 0),
            done: $counts[TicketStatus::Selesai->value] ?? 0,
        );
    }

    /** The RelationSelect lookup of other modules: up to 20 records matching `search`. */
    public function lookup(Request $request): LookupData
    {
        Gate::authorize('viewAny', Ticket::class);

        $query = Ticket::query()->visibleTo($request->user());
        DataTableQuery::applySearch($query, (new Ticket)->dataTableSearch(), DataTableQuery::search($request));

        return new LookupData(array_values(
            $query->latest('id')->limit(LookupData::LIMIT)->get()
                ->map(fn (Ticket $model): OptionData => new OptionData((string) $model->id, $model->auditLabel()))
                ->all(),
        ));
    }

    public function show(Request $request, int $ticket): Response
    {
        $model = Ticket::query()->visibleTo($request->user())->findOrFail($ticket);
        Gate::authorize('view', $model);

        return Inertia::render('Ticket::Show', [
            'ticket' => TicketData::fromModel($model),
            'history' => ActivityHistory::prop($model, $request->user()),
            'breadcrumbs' => self::breadcrumbs(new BreadcrumbData(label: $model->auditLabel(), href: null)),
        ]);
    }

    public function create(Request $request): Response
    {
        Gate::authorize('create', Ticket::class);

        return Inertia::render('Ticket::Create', [
            'options' => TicketFormOptionsData::make(),
            'breadcrumbs' => self::breadcrumbs(new BreadcrumbData(label: __('Tambah'), href: null)),
        ]);
    }

    public function store(Request $request, StoreTicketData $data): RedirectResponse
    {
        Gate::authorize('create', Ticket::class);

        $ticket = Ticket::query()->create($data->toArray());
        Inertia::flash((new FlashData(success: __('Tiket dibuat.'), description: $ticket->auditLabel()))->toArray());

        return to_route('tickets.show', $ticket);
    }

    public function edit(Request $request, int $ticket): Response
    {
        $model = Ticket::query()->visibleTo($request->user())->findOrFail($ticket);
        Gate::authorize('update', $model);

        return Inertia::render('Ticket::Edit', [
            'ticket' => TicketData::fromModel($model),
            'options' => TicketFormOptionsData::make(),
            'breadcrumbs' => self::breadcrumbs(
                new BreadcrumbData(label: $model->auditLabel(), href: route('tickets.show', $model)),
                new BreadcrumbData(label: __('Edit'), href: null),
            ),
        ]);
    }

    public function update(Request $request, UpdateTicketData $data, int $ticket): RedirectResponse
    {
        $model = Ticket::query()->visibleTo($request->user())->findOrFail($ticket);
        Gate::authorize('update', $model);

        $model->updateUnlessStale($data->except('lock_version')->toArray(), $data->lock_version);
        Inertia::flash((new FlashData(success: __('Perubahan disimpan.'), description: $model->auditLabel()))->toArray());

        return to_route('tickets.show', $model);
    }

    public function destroy(Request $request, int $ticket): RedirectResponse
    {
        $model = Ticket::query()->visibleTo($request->user())->findOrFail($ticket);
        Gate::authorize('delete', $model);

        Trash::delete($model->newCollection([$model]), 'tickets');

        return to_route('tickets.index');
    }

    public function bulkDestroy(Request $request, SelectionData $data): RedirectResponse
    {
        $records = Ticket::query()->visibleTo($request->user())->whereKey($data->ids)->get();
        $records->each(fn (Ticket $record) => Gate::authorize('delete', $record));

        Trash::delete($records, 'tickets');

        return back();
    }

    private static function breadcrumbs(BreadcrumbData ...$items): BreadcrumbsData
    {
        return BreadcrumbsData::of(new BreadcrumbData(label: __('Tiket'), href: route('tickets.index')), ...$items);
    }
}
