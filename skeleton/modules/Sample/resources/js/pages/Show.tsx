import { ActivityHistory } from '@admin-core/components/admin/ActivityHistory';
import { AttachmentSlots } from '@admin-core/components/admin/AttachmentList';
import { ConfirmDialog } from '@admin-core/components/admin/ConfirmDialog';
import { DetailGrid } from '@admin-core/components/admin/DetailGrid';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { StatusBadge } from '@admin-core/components/admin/StatusBadge';
import { Tabs } from '@admin-core/components/admin/Tabs';
import { Button } from '@admin-core/components/ui/button';
import { useAction } from '@admin-core/hooks/useAction';
import { usePermission } from '@admin-core/hooks/usePermission';
import {
    formatCurrency,
    formatLocalDate,
    formatLocalDateTime,
    formatNumber,
} from '@admin-core/lib/format';
import { useT } from '@admin-core/lib/i18n';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { destroy, edit, index } from '@/routes/samples';

type Props = {
    sample: Modules.Sample.Data.SampleData;
    attachments: Yuan.AdminCore.Data.AttachmentsData;
    /** The Riwayat tab's optional prop; null without `audit-log.view`. */
    history?: Yuan.AdminCore.Data.Audit.ActivityHistoryData | null;
};

/** One contoh (generated from the approved pattern-show). */
export default function Show({ sample, attachments, history }: Props) {
    const t = useT();
    const { can, isSuperAdmin } = usePermission();
    const [tab, setTab] = useState('detail');
    const removing = useAction();
    const [deleting, setDeleting] = useState(false);

    return (
        <>
            <Head title={sample.nama} />
            <div className="flex flex-col gap-5">
                <PageHeader
                    title={sample.nama}
                    backHref={index()}
                    actions={
                        <>
                            {can('samples.edit') && (
                                <Button asChild>
                                    <Link href={edit(sample.id)}>
                                        <Pencil />
                                        {t('table.edit')}
                                    </Link>
                                </Button>
                            )}
                            {can('samples.delete') && (
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
                                                label: t('samples.nama'),
                                                value: sample.nama,
                                            },
                                            {
                                                label: t('samples.kode'),
                                                value: sample.kode,
                                            },
                                            {
                                                label: t('samples.catatan'),
                                                value: sample.catatan,
                                            },
                                            {
                                                label: t('samples.jumlah'),
                                                value: formatNumber(
                                                    sample.jumlah,
                                                ),
                                            },
                                            {
                                                label: t('samples.tahun'),
                                                value: sample.tahun,
                                            },
                                            {
                                                label: t('samples.berat'),
                                                value:
                                                    sample.berat !== null &&
                                                    formatNumber(
                                                        sample.berat,
                                                        3,
                                                    ),
                                            },
                                            {
                                                label: t('samples.harga'),
                                                value: formatCurrency(
                                                    sample.harga,
                                                ),
                                            },
                                            {
                                                label: t('samples.aktif'),
                                                value: sample.aktif
                                                    ? t('samples.yes')
                                                    : t('samples.no'),
                                            },
                                            {
                                                label: t(
                                                    'samples.mulai_tanggal',
                                                ),
                                                value: formatLocalDate(
                                                    sample.mulai_tanggal,
                                                ),
                                            },
                                            {
                                                label: t(
                                                    'samples.selesai_pada',
                                                ),
                                                value:
                                                    sample.selesai_pada !==
                                                        null &&
                                                    formatLocalDateTime(
                                                        sample.selesai_pada,
                                                    ),
                                            },
                                            {
                                                label: t('samples.status'),
                                                value: (
                                                    <StatusBadge
                                                        label={
                                                            sample.status_label
                                                        }
                                                    />
                                                ),
                                            },
                                            {
                                                label: t('samples.customer_id'),
                                                value: sample.customer_name,
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
                        ...(can('audit-log.view') || isSuperAdmin
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
                title={t('samples.delete_title')}
                itemName={sample.nama}
                loading={removing.pending}
                onConfirm={() =>
                    removing.run((done) =>
                        router.delete(destroy(sample.id), {
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
