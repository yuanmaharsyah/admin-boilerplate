<?php

declare(strict_types=1);

namespace Modules\Invoice\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Invoice\Data\InvoiceData;
use Modules\Invoice\Data\InvoiceFormOptionsData;
use Modules\Invoice\Data\InvoiceListItemData;
use Modules\Invoice\Data\StoreInvoiceData;
use Modules\Invoice\Data\UpdateInvoiceData;
use Modules\Invoice\Exports\InvoiceExport;
use Modules\Invoice\Models\Invoice;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;
use Yuan\AdminCore\Attachments\AttachmentController;
use Yuan\AdminCore\Attachments\AttachmentUploads;
use Yuan\AdminCore\Audit\ActivityHistory;
use Yuan\AdminCore\Data\BreadcrumbData;
use Yuan\AdminCore\Data\BreadcrumbsData;
use Yuan\AdminCore\Data\FlashData;
use Yuan\AdminCore\Data\PaginatedData;
use Yuan\AdminCore\Data\SelectionData;
use Yuan\AdminCore\Exports\ExportManager;
use Yuan\AdminCore\Trash\Trash;

final class InvoiceController
{
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Invoice::class);

        return Inertia::render('Invoice::Index', [
            'invoices' => PaginatedData::fromPaginator(Invoice::query()->visibleTo($request->user())->with('customer')->dataTable($request), InvoiceListItemData::class),
            'table' => Invoice::dataTableState($request),
        ]);
    }

    public function download(Request $request): SymfonyResponse
    {
        Gate::authorize('download', Invoice::class);

        return ExportManager::for(InvoiceExport::class, $request);
    }

    public function create(Request $request): Response
    {
        Gate::authorize('create', Invoice::class);

        return Inertia::render('Invoice::Create', [
            'options' => InvoiceFormOptionsData::make(),
            'attachments' => AttachmentController::data(new Invoice, $request->user()),
            'breadcrumbs' => self::breadcrumbs(new BreadcrumbData(label: __('Tambah'), href: null)),
        ]);
    }

    public function store(Request $request, StoreInvoiceData $data): RedirectResponse
    {
        Gate::authorize('create', Invoice::class);

        $invoice = AttachmentUploads::saveWith(fn (): Invoice => Invoice::query()->create($data->except('files')->toArray()), $data->files, $request->user());
        Inertia::flash((new FlashData(success: __('Invoice dibuat.'), description: $invoice->number))->toArray());

        return to_route('invoices.show', $invoice);
    }

    public function show(Request $request, int $invoice): Response
    {
        $model = Invoice::query()->visibleTo($request->user())->with('customer')->findOrFail($invoice);
        Gate::authorize('view', $model);

        return Inertia::render('Invoice::Show', [
            'invoice' => InvoiceData::fromModel($model),
            'attachments' => AttachmentController::data($model, $request->user()),
            'history' => ActivityHistory::prop($model, $request->user()),
            'breadcrumbs' => self::breadcrumbs(new BreadcrumbData(label: $model->number, href: null)),
        ]);
    }

    public function edit(Request $request, int $invoice): Response
    {
        $model = Invoice::query()->visibleTo($request->user())->with('customer')->findOrFail($invoice);
        Gate::authorize('update', $model);

        return Inertia::render('Invoice::Edit', [
            'invoice' => InvoiceData::fromModel($model),
            'options' => InvoiceFormOptionsData::make(),
            'attachments' => AttachmentController::data($model, $request->user()),
            'breadcrumbs' => self::breadcrumbs(
                new BreadcrumbData(label: $model->number, href: route('invoices.show', $model)),
                new BreadcrumbData(label: __('Edit'), href: null),
            ),
        ]);
    }

    public function update(Request $request, UpdateInvoiceData $data, int $invoice): RedirectResponse
    {
        $model = Invoice::query()->visibleTo($request->user())->findOrFail($invoice);
        Gate::authorize('update', $model);

        AttachmentUploads::saveWith(function () use ($model, $data): Invoice {
            $model->updateUnlessStale($data->except('lock_version', 'files')->toArray(), $data->lock_version);

            return $model;
        }, $data->files, $request->user());
        Inertia::flash((new FlashData(success: __('Perubahan disimpan.'), description: $model->number))->toArray());

        return to_route('invoices.show', $model);
    }

    public function destroy(Request $request, int $invoice): RedirectResponse
    {
        $model = Invoice::query()->visibleTo($request->user())->findOrFail($invoice);
        Gate::authorize('delete', $model);

        Trash::delete($model->newCollection([$model]), 'invoices');

        return to_route('invoices.index');
    }

    public function bulkDestroy(Request $request, SelectionData $data): RedirectResponse
    {
        $invoices = Invoice::query()->visibleTo($request->user())->whereKey($data->ids)->get();
        $invoices->each(fn (Invoice $invoice) => Gate::authorize('delete', $invoice));

        Trash::delete($invoices, 'invoices');

        return back();
    }

    private static function breadcrumbs(BreadcrumbData ...$items): BreadcrumbsData
    {
        return BreadcrumbsData::of(new BreadcrumbData(label: __('Invoice'), href: route('invoices.index')), ...$items);
    }
}
