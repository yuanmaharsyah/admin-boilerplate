import { ActivityHistory } from '@admin-core/components/admin/ActivityHistory';
import { ConfirmDialog } from '@admin-core/components/admin/ConfirmDialog';
import { DetailGrid } from '@admin-core/components/admin/DetailGrid';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { StatusBadge } from '@admin-core/components/admin/StatusBadge';
import { Tabs } from '@admin-core/components/admin/Tabs';
import { Button } from '@admin-core/components/ui/button';
import { useAction } from '@admin-core/hooks/useAction';
import { usePermission } from '@admin-core/hooks/usePermission';
import { formatLocalDate, formatNumber } from '@admin-core/lib/format';
import { useT } from '@admin-core/lib/i18n';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { destroy, edit, index } from '@/routes/kanban';

type Props = {
    task: Modules.Task.Data.TaskData;

    /** The Riwayat tab's optional prop; null without `audit-log.view`. */
    history?: Yuan.AdminCore.Data.Audit.ActivityHistoryData | null;
};

/** One kanban (generated from the approved pattern-show). */
export default function Show({ task, history }: Props) {
    const t = useT();
    const { can, isSuperAdmin } = usePermission();
    const [tab, setTab] = useState('detail');
    const removing = useAction();
    const [deleting, setDeleting] = useState(false);

    return (
        <>
            <Head title={task.title} />
            <div className="flex flex-col gap-5">
                <PageHeader
                    title={task.title}
                    backHref={index()}
                    actions={
                        <>
                            {can('kanban.edit') && (
                                <Button asChild>
                                    <Link href={edit(task.id)}>
                                        <Pencil />
                                        {t('table.edit')}
                                    </Link>
                                </Button>
                            )}
                            {can('kanban.delete') && (
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
                                                label: t('kanban.title'),
                                                value: task.title,
                                            },
                                            {
                                                label: t('kanban.description'),
                                                value: task.description,
                                            },
                                            {
                                                label: t('kanban.status'),
                                                value: (
                                                    <StatusBadge
                                                        label={
                                                            task.status_label
                                                        }
                                                    />
                                                ),
                                            },
                                            {
                                                label: t('kanban.priority'),
                                                value: (
                                                    <StatusBadge
                                                        label={
                                                            task.priority_label
                                                        }
                                                    />
                                                ),
                                            },
                                            {
                                                label: t('kanban.assignee'),
                                                value: task.assignee,
                                            },
                                            {
                                                label: t('kanban.due_on'),
                                                value:
                                                    task.due_on !== null &&
                                                    formatLocalDate(
                                                        task.due_on,
                                                    ),
                                            },
                                            {
                                                label: t('kanban.position'),
                                                value: formatNumber(
                                                    task.position,
                                                ),
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
                title={t('kanban.delete_title')}
                itemName={task.title}
                loading={removing.pending}
                onConfirm={() =>
                    removing.run((done) =>
                        router.delete(destroy(task.id), {
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
