import { ConfirmDialog } from '@admin-core/components/admin/ConfirmDialog';
import { DataTable } from '@admin-core/components/admin/DataTable';
import type {
    DataTableColumn,
    RowAction,
} from '@admin-core/components/admin/DataTable';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { StatusBadge } from '@admin-core/components/admin/StatusBadge';
import { Button } from '@admin-core/components/ui/button';
import { useAction } from '@admin-core/hooks/useAction';
import { usePermission } from '@admin-core/hooks/usePermission';
import { formatLocalDate, formatNumber } from '@admin-core/lib/format';
import { useT } from '@admin-core/lib/i18n';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Pencil, Plus, SquareKanban, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
    bulkDestroy,
    create,
    destroy,
    edit,
    show,
    trash,
} from '@/routes/kanban';

type Row = Modules.Task.Data.TaskListItemData;

type Props = {
    tasks: Yuan.AdminCore.Data.PaginatedData<Row>;
    table: Yuan.AdminCore.Data.DataTableStateData;
};

/** The kanban list (generated from the approved pattern-index). */
export default function Index({ tasks, table }: Props) {
    const t = useT();
    const { can, isSuperAdmin } = usePermission();
    const removing = useAction();
    const [deleting, setDeleting] = useState<Row | null>(null);

    const columns: DataTableColumn<Row>[] = [
        {
            key: 'title',
            label: t('kanban.title'),
            className: 'font-medium',
            hideable: false,
        },
        {
            key: 'status',
            label: t('kanban.status'),
            cell: (row) => <StatusBadge label={row.status_label} />,
        },
        {
            key: 'priority',
            label: t('kanban.priority'),
            cell: (row) => <StatusBadge label={row.priority_label} />,
        },
        { key: 'assignee', label: t('kanban.assignee') },
        {
            key: 'due_on',
            label: t('kanban.due_on'),
            cell: (row) =>
                row.due_on === null ? '—' : formatLocalDate(row.due_on),
        },
        {
            key: 'position',
            label: t('kanban.position'),
            align: 'right',
            cell: (row) => formatNumber(row.position),
        },
    ];

    const rowActions = (row: Row): RowAction[] => [
        ...(can('kanban.view')
            ? [{ label: t('table.view'), icon: Eye, href: show(row.id) }]
            : []),
        ...(can('kanban.edit')
            ? [{ label: t('table.edit'), icon: Pencil, href: edit(row.id) }]
            : []),
        ...(can('kanban.delete')
            ? [
                  {
                      label: t('table.delete'),
                      icon: Trash2,
                      destructive: true,
                      onSelect: () => setDeleting(row),
                  },
              ]
            : []),
    ];

    const createButton = can('kanban.create') && (
        <Button asChild>
            <Link href={create()}>
                <Plus />
                {t('table.create')}
            </Link>
        </Button>
    );

    return (
        <>
            <Head title={t('kanban.title')} />
            <div className="flex flex-col gap-5">
                <PageHeader
                    title={t('kanban.title')}
                    description={t('kanban.description')}
                    actions={
                        <>
                            {isSuperAdmin && (
                                <Button
                                    variant="outline"
                                    asChild
                                    className="bg-transparent"
                                >
                                    <Link href={trash()}>
                                        <Trash2 />
                                        {t('trash.link')}
                                    </Link>
                                </Button>
                            )}
                            {createButton}
                        </>
                    }
                />
                <DataTable
                    data={tasks}
                    state={table}
                    columns={columns}
                    slug="kanban"
                    label={t('kanban.list')}
                    itemLabel={t('kanban.item')}
                    rowLabel={(row) => row.title}
                    searchPlaceholder={t('kanban.search')}
                    rowHref={
                        can('kanban.view') ? (row) => show(row.id) : undefined
                    }
                    rowActions={rowActions}
                    bulkDelete={
                        can('kanban.delete')
                            ? (ids, onFinish) =>
                                  router.delete(bulkDestroy(), {
                                      onFinish,
                                      data: { ids },
                                      preserveScroll: true,
                                  })
                            : undefined
                    }
                    empty={{
                        icon: SquareKanban,
                        title: t('kanban.empty_title'),
                        description: t('kanban.empty_text'),
                        action: createButton,
                    }}
                />
            </div>
            <ConfirmDialog
                open={deleting !== null}
                onOpenChange={(open) => !open && setDeleting(null)}
                title={t('kanban.delete_title')}
                itemName={deleting ? deleting.title : ''}
                loading={removing.pending}
                onConfirm={() => {
                    if (deleting) {
                        removing.run((done) =>
                            router.delete(destroy(deleting.id), {
                                preserveScroll: true,
                                onFinish: () => {
                                    done();
                                    setDeleting(null);
                                },
                            }),
                        );
                    }
                }}
            />
        </>
    );
}
