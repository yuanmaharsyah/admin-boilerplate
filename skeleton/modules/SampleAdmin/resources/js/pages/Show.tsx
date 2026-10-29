import { ActivityHistory } from '@admin-core/components/admin/ActivityHistory';
import { AttachmentSlots } from '@admin-core/components/admin/AttachmentList';
import { ConfirmDialog } from '@admin-core/components/admin/ConfirmDialog';
import { DetailGrid } from '@admin-core/components/admin/DetailGrid';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { Tabs } from '@admin-core/components/admin/Tabs';
import { Button } from '@admin-core/components/ui/button';
import { useAction } from '@admin-core/hooks/useAction';
import { usePermission } from '@admin-core/hooks/usePermission';
import { useT } from '@admin-core/lib/i18n';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { destroy, edit, index } from '@/routes/sample-admin';

type Props = {
    sampleAdmin: Modules.SampleAdmin.Data.SampleAdminData;
    attachments: Yuan.AdminCore.Data.AttachmentsData;
    /** The Riwayat tab's optional prop; null without `audit-log.view`. */
    history?: Yuan.AdminCore.Data.Audit.ActivityHistoryData | null;
};

/** One contoh khusus super admin (generated from the approved pattern-show). */
export default function Show({ sampleAdmin, attachments, history }: Props) {
    const t = useT();
    const { can, isSuperAdmin } = usePermission();
    const [tab, setTab] = useState('detail');
    const removing = useAction();
    const [deleting, setDeleting] = useState(false);

    return (
        <>
            <Head title={sampleAdmin.judul} />
            <div className="flex flex-col gap-5">
                <PageHeader
                    title={sampleAdmin.judul}
                    backHref={index()}
                    actions={
                        <>
                            {isSuperAdmin && (
                                <Button asChild>
                                    <Link href={edit(sampleAdmin.id)}>
                                        <Pencil />
                                        {t('table.edit')}
                                    </Link>
                                </Button>
                            )}
                            {isSuperAdmin && (
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
                                                label: t('sample-admin.judul'),
                                                value: sampleAdmin.judul,
                                            },
                                            {
                                                label: t(
                                                    'sample-admin.catatan',
                                                ),
                                                value: sampleAdmin.catatan,
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
                title={t('sample-admin.delete_title')}
                itemName={sampleAdmin.judul}
                loading={removing.pending}
                onConfirm={() =>
                    removing.run((done) =>
                        router.delete(destroy(sampleAdmin.id), {
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
