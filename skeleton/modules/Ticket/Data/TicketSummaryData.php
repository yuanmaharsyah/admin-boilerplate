<?php

declare(strict_types=1);

namespace Modules\Ticket\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/** The KPI tiles above the ticket list: counts of the tickets the user may see. */
#[TypeScript]
final class TicketSummaryData extends Data
{
    public function __construct(
        public int $total,
        public int $new,
        public int $open,
        public int $done,
    ) {}
}
