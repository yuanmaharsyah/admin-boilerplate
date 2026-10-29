<?php

declare(strict_types=1);

namespace Modules\Customer\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Customer\Data\CustomerListItemData;
use Modules\Customer\Models\Customer;
use Yuan\AdminCore\Data\LookupData;
use Yuan\AdminCore\Data\OptionData;
use Yuan\AdminCore\Data\PaginatedData;
use Yuan\AdminCore\Data\SelectionData;
use Yuan\AdminCore\DataTable\DataTableQuery;
use Yuan\AdminCore\Trash\Trash;

final class CustomerController
{
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Customer::class);

        return Inertia::render('Customer::Index', [
            'customers' => PaginatedData::fromPaginator(Customer::query()->visibleTo($request->user())->dataTable($request), CustomerListItemData::class),
            'table' => Customer::dataTableState($request),
        ]);
    }

    /** The RelationSelect lookup: up to 20 customers whose name or city matches `search`. */
    public function lookup(Request $request): LookupData
    {
        Gate::authorize('viewAny', Customer::class);

        $query = Customer::query()->visibleTo($request->user());
        DataTableQuery::applySearch($query, ['name', 'city'], DataTableQuery::search($request));

        return new LookupData(array_values(
            $query->orderBy('name')->limit(LookupData::LIMIT)->get()
                ->map(fn (Customer $customer): OptionData => new OptionData((string) $customer->id, $customer->name))
                ->all(),
        ));
    }

    public function destroy(Request $request, int $customer): RedirectResponse
    {
        $model = Customer::query()->visibleTo($request->user())->findOrFail($customer);
        Gate::authorize('delete', $model);

        Trash::delete($model->newCollection([$model]), 'customers');

        return back();
    }

    public function bulkDestroy(Request $request, SelectionData $data): RedirectResponse
    {
        $customers = Customer::query()->visibleTo($request->user())->whereKey($data->ids)->get();
        $customers->each(fn (Customer $customer) => Gate::authorize('delete', $customer));

        Trash::delete($customers, 'customers');

        return back();
    }
}
