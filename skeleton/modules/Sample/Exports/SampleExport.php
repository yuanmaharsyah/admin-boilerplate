<?php

declare(strict_types=1);

namespace Modules\Sample\Exports;

use Illuminate\Database\Eloquent\Model;
use Modules\Sample\Models\Sample;
use Yuan\AdminCore\DataTable\DataTableBuilder;
use Yuan\AdminCore\Exports\ModuleExport;

/**
 * The contoh list as a spreadsheet, with the list's current search,
 * filters and sort; the base class neutralizes formula-like text.
 *
 * @extends ModuleExport<Sample>
 */
final class SampleExport extends ModuleExport
{
    /**
     * @return DataTableBuilder<Sample>
     */
    protected function baseQuery(): DataTableBuilder
    {
        return Sample::query()->visibleTo($this->user)->with('customer');
    }

    /**
     * @return list<string>
     */
    public function headings(): array
    {
        return [__('Nama'), __('Kode'), __('Jumlah'), __('Tahun'), __('Berat'), __('Harga'), __('Mulai tanggal'), __('Selesai pada'), __('Status'), __('Customer')];
    }

    /**
     * @param  Sample  $row
     * @return list<string|int|float|bool|null>
     */
    protected function row(Model $row): array
    {
        return [
            $row->nama,
            $row->kode,
            $row->jumlah,
            $row->tahun,
            $row->berat === null ? null : (float) $row->berat,
            $row->harga,
            $row->mulai_tanggal->toDateString(),
            $row->selesai_pada?->format('Y-m-d H:i'),
            $row->status->label(),
            $row->customer->auditLabel(),
        ];
    }
}
