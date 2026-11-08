<?php

declare(strict_types=1);

namespace Modules\Invoice\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/** One period of an invoice report: `key` is `Y-m` or `Y`. */
#[TypeScript]
final class InvoiceReportRowData extends Data
{
    public function __construct(
        public string $key,
        public string $label,
        public int $count,
        public int $paid,
        public int $total,
    ) {}
}
