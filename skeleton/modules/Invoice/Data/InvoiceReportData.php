<?php

declare(strict_types=1);

namespace Modules\Invoice\Data;

use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\LiteralTypeScriptType;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/** The Laporan page: invoices per month (last 12) or per year (last 5), newest first. */
#[TypeScript]
final class InvoiceReportData extends Data
{
    /**
     * @param  list<InvoiceReportRowData>  $rows
     */
    public function __construct(
        #[LiteralTypeScriptType("'monthly' | 'yearly'")]
        public string $period,
        #[DataCollectionOf(InvoiceReportRowData::class)]
        public array $rows,
    ) {}
}
