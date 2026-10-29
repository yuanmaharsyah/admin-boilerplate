import { ActivityHistory } from '@admin-core/components/admin/ActivityHistory';
import { AttachmentSlots } from '@admin-core/components/admin/AttachmentList';
import { ConfirmDialog } from '@admin-core/components/admin/ConfirmDialog';
import { DetailGrid } from '@admin-core/components/admin/DetailGrid';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { Tabs } from '@admin-core/components/admin/Tabs';
import { Button } from '@admin-core/components/ui/button';
import { usePermission } from '@admin-core/hooks/usePermission';
import {
    formatCurrency,
    formatLocalDate,
    formatLocalDateTime,
    formatNumber,
} from '@admin-core/lib/format';
import { useAction } from '@admin-core/hooks/useAction';
import { useT } from '@admin-core/lib/i18n';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { destroy, edit, index } from '@/routes/invoices';
import { InvoiceStatusBadge } from '../components/InvoiceStatusBadge';

type Props = {
    invoice: Modules.Invoice.Data.InvoiceData;
    attachments: Yuan.AdminCore.Data.AttachmentsData;
    /** The Riwayat tab's optional prop; null without `audit-log.view`. */
    history?: Yuan.AdminCore.Data.Audit.ActivityHistoryData | null;
};

export default function Show({ invoice, attachments, history }: Props) {
    const t = useT();
    const removing = useAction();
    const { can } = usePermission();
    const [deleting, setDeleting] = useState(false);
    const [tab, setTab] = useState('detail');

    return (
        <>
            <Head title={invoice.number} />
            <div className="flex flex-col gap-5">
                <PageHeader
                    title={invoice.number}
                    description={invoice.customer_name}
                    backHref={index()}
                    actions={
                        <>
                            {can('invoices.edit') && (
                                <Button asChild>
                                    <Link href={edit(invoice.id)}>
                                        <Pencil />
                                        {t('table.edit')}
                                    </Link>
                                </Button>
                            )}
                            {can('invoices.delete') && (
                                <Button
                                    variant="outline"
                                    className="border-destructive bg-transparent text-destructive hover:bg-destructive/10 hover:text-destructive"
                                    onClick={() => setDeleting(true)}
                                >
                                    <Trash2 />
                                    {t('table.delete')}
                                </Button>
                            )}
                        </>
                    }
                />
                <Tabs
                    label={t('detail.tabs')}
                    value={tab}
                    onChange={setTab}
                    tabs={[
                        {
                            key: 'detail',
                            label: t('detail.title'),
                            content: (
                                <section className="rounded bg-card p-6 text-card-foreground">
                                    <DetailGrid
                                        items={[
                                            {
                                                label: t('invoices.customer'),
                                                value: invoice.customer_name,
                                            },
                                            {
                                                label: t('invoices.status'),
                                                value: (
                                                    <InvoiceStatusBadge
                                                        status={invoice.status}
                                                        label={
                                                            invoice.status_label
                                                        }
                                                    />
                                                ),
                                            },
                                            {
                                                label: t('invoices.issued_on'),
                                                value: formatLocalDate(
                                                    invoice.issued_on,
                                                ),
                                            },
                                            {
                                                label: t('invoices.due_at'),
                                                value:
                                                    invoice.due_at &&
                                                    formatLocalDateTime(
                                                        invoice.due_at,
                                                    ),
                                            },
                                            {
                                                label: t('invoices.total'),
                                                value: formatCurrency(
                                                    invoice.total,
                                                ),
                                            },
                                            {
                                                label: t('invoices.tax_rate'),
                                                value: formatNumber(
                                                    invoice.tax_rate,
                                                    3,
                                                ),
                                            },
                                            {
                                                label: t(
                                                    'invoices.payment_method',
                                                ),
                                                value: invoice.payment_method_label,
                                            },
                                            {
                                                label: t(
                                                    'invoices.send_reminder',
                                                ),
                                                value: invoice.send_reminder
                                                    ? t('invoices.yes')
                                                    : t('invoices.no'),
                                            },
                                            {
                                                label: t('invoices.npwp'),
                                                value: invoice.npwp,
                                            },
                                            {
                                                label: t('invoices.notes'),
                                                value: invoice.notes,
                                            },
                                        ]}
                                    />
                                </section>
                            ),
                        },
                        {
                            key: 'attachments',
                            label: t('attachments.tab', {
                                count: attachments.slots.reduce(
                                    (sum, slot) => sum + slot.items.length,
                                    0,
                                ),
                            }),
                            content: (
                                <section className="rounded bg-card px-6 py-4 text-card-foreground">
                                    <AttachmentSlots
                                        slots={attachments.slots}
                                    />
                                </section>
                            ),
                        },
                        ...(can('audit-log.view')
                            ? [
                                  {
                                      key: 'history',
                                      label: t('history.tab'),
                                      content: (
                                          <section className="rounded bg-card px-6 py-4 text-card-foreground">
                                              <ActivityHistory
                                                  history={history}
                                              />
                                          </section>
                                      ),
                                  },
                              ]
                            : []),
                    ]}
                />
            </div>
            <ConfirmDialog
                open={deleting}
                onOpenChange={setDeleting}
                title={t('invoices.delete_title')}
                itemName={invoice.number}
                loading={removing.pending}
                onConfirm={() =>
                    removing.run((done) =>
                        router.delete(destroy(invoice.id), {
                            onFinish: () => {
                                done();
                                setDeleting(false);
                            },
                        }),
                    )
                }
            />
        </>
    );
}
