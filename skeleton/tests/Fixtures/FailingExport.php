<?php

declare(strict_types=1);

namespace Tests\Fixtures;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Modules\Invoice\Models\Invoice;
use RuntimeException;
use Yuan\AdminCore\Exports\ListExport;

/**
 * An export whose query breaks, as a bad filter or a lost database
 * connection would, for the queued-export failure test.
 *
 * @extends ListExport<Invoice>
 */
final class FailingExport extends ListExport
{
    public function query(): Builder
    {
        throw new RuntimeException('The export fails on purpose.');
    }

    public function headings(): array
    {
        return ['Nomor'];
    }

    protected function row(Model $row): array
    {
        return [];
    }
}
