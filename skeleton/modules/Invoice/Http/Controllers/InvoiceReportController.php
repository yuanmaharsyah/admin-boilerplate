<?php

declare(strict_types=1);

namespace Modules\Invoice\Http\Controllers;

use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Invoice\Data\InvoiceReportData;
use Modules\Invoice\Data\InvoiceReportRowData;
use Modules\Invoice\Enums\InvoiceStatus;
use Modules\Invoice\Models\Invoice;
use Yuan\AdminCore\Data\BreadcrumbData;
use Yuan\AdminCore\Data\BreadcrumbsData;

/**
 * Invoice → Laporan → Bulanan / Tahunan: the three-level menu example
 * (spec §3.1). Totals per period of the invoices the user may see.
 */
final class InvoiceReportController
{
    public function monthly(Request $request): Response
    {
        return $this->render($request, 'monthly', CarbonImmutable::today()->startOfMonth()->subMonths(11), 'Y-m');
    }

    public function yearly(Request $request): Response
    {
        return $this->render($request, 'yearly', CarbonImmutable::today()->startOfYear()->subYears(4), 'Y');
    }

    private function render(Request $request, string $period, CarbonImmutable $from, string $format): Response
    {
        Gate::authorize('viewAny', Invoice::class);

        /** @var array<string, array{count: int, paid: int, total: int}> $sums */
        $sums = [];

        foreach (Invoice::query()->visibleTo($request->user())->where('issued_on', '>=', $from->toDateString())->get(['issued_on', 'status', 'total']) as $invoice) {
            $key = $invoice->issued_on->format($format);
            $sum = $sums[$key] ?? ['count' => 0, 'paid' => 0, 'total' => 0];
            $sums[$key] = [
                'count' => $sum['count'] + 1,
                'paid' => $sum['paid'] + ($invoice->status === InvoiceStatus::Paid ? $invoice->total : 0),
                'total' => $sum['total'] + $invoice->total,
            ];
        }

        $rows = [];

        for ($at = $from; $at->lte(CarbonImmutable::today()); $at = $period === 'monthly' ? $at->addMonth() : $at->addYear()) {
            $key = $at->format($format);
            $rows[] = new InvoiceReportRowData(
                key: $key,
                label: $period === 'monthly' ? $at->translatedFormat('F Y') : $key,
                count: $sums[$key]['count'] ?? 0,
                paid: $sums[$key]['paid'] ?? 0,
                total: $sums[$key]['total'] ?? 0,
            );
        }

        $title = $period === 'monthly' ? __('Laporan bulanan') : __('Laporan tahunan');

        return Inertia::render('Invoice::Report', [
            'report' => new InvoiceReportData(period: $period, rows: array_reverse($rows)),
            'breadcrumbs' => BreadcrumbsData::of(
                new BreadcrumbData(label: __('Invoice'), href: route('invoices.index')),
                new BreadcrumbData(label: is_string($title) ? $title : $period),
            ),
        ]);
    }
}
