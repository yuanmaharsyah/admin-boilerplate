import { ActivityHistory } from '@admin-core/components/admin/ActivityHistory';
import { ConfirmDialog } from '@admin-core/components/admin/ConfirmDialog';
import { DetailGrid } from '@admin-core/components/admin/DetailGrid';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { StatusBadge } from '@admin-core/components/admin/StatusBadge';
import { Tabs } from '@admin-core/components/admin/Tabs';
import { Button } from '@admin-core/components/ui/button';
import { useAction } from '@admin-core/hooks/useAction';
import { usePermission } from '@admin-core/hooks/usePermission';
import { useT } from '@admin-core/lib/i18n';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { destroy, edit, index } from '@/routes/tickets';

type Props = {
    ticket: Modules.Ticket.Data.TicketData;

    /** The Riwayat tab's optional prop; null without `audit-log.view`. */
    history?: Yuan.AdminCore.Data.Audit.ActivityHistoryData | null;
};

/** One tiket (generated from the approved pattern-show). */
export default function Show({ ticket, history }: Props) {
    const t = useT();
    const { can, isSuperAdmin } = usePermission();
    const [tab, setTab] = useState('detail');
    const removing = useAction();
    const [deleting, setDeleting] = useState(false);

    return (
        <>
            <Head title={ticket.number} />
            <div className="flex flex-col gap-5">
                <PageHeader
                    title={ticket.number}
                    backHref={index()}
                    actions={
                        <>
                            {can('tickets.edit') && (
                                <Button asChild>
                                    <Link href={edit(ticket.id)}>
                                        <Pencil />
                                        {t('table.edit')}
                                    </Link>
                                </Button>
                            )}
                            {can('tickets.delete') && (
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
                                                label: t('tickets.number'),
                                                value: ticket.number,
                                            },
                                            {
                                                label: t('tickets.subject'),
                                                value: ticket.subject,
                                            },
                                            {
                                                label: t('tickets.requester'),
                                                value: ticket.requester,
                                            },
                                            {
                                                label: t('tickets.message'),
                                                value: ticket.message,
                                            },
                                            {
                                                label: t('tickets.priority'),
                                                value: (
                                                    <StatusBadge
                                                        label={
                                                            ticket.priority_label
                                                        }
                                                    />
                                                ),
                                            },
                                            {
                                                label: t('tickets.status'),
                                                value: (
                                                    <StatusBadge
                                                        label={
                                                            ticket.status_label
                                                        }
                                                    />
                                                ),
                                            },
                                            {
                                                label: t('tickets.assignee'),
                                                value: ticket.assignee,
                                            },
                                        ]}
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
                title={t('tickets.delete_title')}
                itemName={ticket.number}
                loading={removing.pending}
                onConfirm={() =>
                    removing.run((done) =>
                        router.delete(destroy(ticket.id), {
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
