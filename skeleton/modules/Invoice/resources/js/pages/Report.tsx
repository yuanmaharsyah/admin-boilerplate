import { BarChartCard } from '@admin-core/components/admin/BarChartCard';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { formatCurrency, formatNumber } from '@admin-core/lib/format';
import { useT } from '@admin-core/lib/i18n';
import { Head } from '@inertiajs/react';

type Props = { report: Modules.Invoice.Data.InvoiceReportData };

/**
 * Invoice → Laporan → Bulanan / Tahunan (the three-level menu example):
 * a chart of the totals and the same figures as a table whose rows fade up
 * (`data-rows-in`, ui-design §1 "Motion").
 */
export default function Report({ report }: Props) {
    const t = useT();
    const title = t(
        report.period === 'monthly'
            ? 'invoices.report_monthly'
            : 'invoices.report_yearly',
    );
    const chronological = [...report.rows].reverse();
    const label = (key: string) =>
        report.rows.find((row) => row.key === key)?.label ?? key;

    return (
        <>
            <Head title={title} />
            <div className="flex flex-col gap-6">
                <PageHeader
                    title={title}
                    description={t('invoices.report_description')}
                />
                <BarChartCard
                    title={t('invoices.report_chart')}
                    data={chronological.map((row) => ({
                        x: row.key,
                        y: Math.round(row.total / 100_000) / 10,
                        c: Math.round(row.paid / 100_000) / 10,
                    }))}
                    xFormat={label}
                    legend={[
                        t('invoices.report_total'),
                        t('invoices.report_paid'),
                    ]}
                    valueLabel={t('invoices.report_unit')}
                    tooltip={(x, y) => ({
                        title: `${formatNumber(y)} ${t('invoices.report_unit')}`,
                        detail: label(x),
                    })}
                />
                <section className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground">
                    <table className="w-full border-collapse text-table tabular-nums">
                        <thead>
                            <tr className="h-12 border-b border-border text-left">
                                <th
                                    scope="col"
                                    className="px-6 text-base font-semibold"
                                >
                                    {t('invoices.report_period')}
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 text-right text-base font-semibold"
                                >
                                    {t('invoices.report_count')}
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 text-right text-base font-semibold"
                                >
                                    {t('invoices.report_paid')}
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 text-right text-base font-semibold"
                                >
                                    {t('invoices.report_total')}
                                </th>
                            </tr>
                        </thead>
                        <tbody data-rows-in>
                            {report.rows.map((row) => (
                                <tr
                                    key={row.key}
                                    className="h-14 border-b border-border last:border-0"
                                >
                                    <td className="px-6 font-medium">
                                        {row.label}
                                    </td>
                                    <td className="px-6 text-right">
                                        {formatNumber(row.count)}
                                    </td>
                                    <td className="px-6 text-right">
                                        {formatCurrency(row.paid)}
                                    </td>
                                    <td className="px-6 text-right font-semibold">
                                        {formatCurrency(row.total)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
}
