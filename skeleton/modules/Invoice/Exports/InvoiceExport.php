<?php

declare(strict_types=1);

namespace Modules\Invoice\Exports;

use Illuminate\Database\Eloquent\Model;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\DataTable\DataTableBuilder;
use Yuan\AdminCore\Exports\ModuleExport;

/**
 * The invoice list as a spreadsheet, with the list's current search, filters
 * and sort. NPWP isn't exported; the base class neutralizes formula-like text.
 *
 * @extends ModuleExport<Invoice>
 */
final class InvoiceExport extends ModuleExport
{
    /**
     * @return DataTableBuilder<Invoice>
     */
    protected function baseQuery(): DataTableBuilder
    {
        return Invoice::query()->visibleTo($this->user)->with('customer');
    }

    /**
     * @return list<string>
     */
    public function headings(): array
    {
        return [__('Nomor'), __('Pelanggan'), __('Tanggal'), __('Jatuh tempo'), __('Status'), __('Cara bayar'), __('Total'), __('PPN (%)')];
    }

    /**
     * @param  Invoice  $row
     * @return list<string|int|float|null>
     */
    protected function row(Model $row): array
    {
        return [
            $row->number,
            $row->customer->name,
            $row->issued_on->toDateString(),
            $row->due_at?->format('Y-m-d H:i'),
            $row->status->label(),
            $row->payment_method?->label(),
            $row->total,
            (float) $row->tax_rate,
        ];
    }
}
