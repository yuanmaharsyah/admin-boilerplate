import { ConfirmDialog } from '@admin-core/components/admin/ConfirmDialog';
import { DataTable } from '@admin-core/components/admin/DataTable';
import type {
    DataTableColumn,
    RowAction,
} from '@admin-core/components/admin/DataTable';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { StatTile } from '@admin-core/components/admin/StatTile';
import { StatusBadge } from '@admin-core/components/admin/StatusBadge';
import { Button } from '@admin-core/components/ui/button';
import { useAction } from '@admin-core/hooks/useAction';
import { usePermission } from '@admin-core/hooks/usePermission';
import { useT } from '@admin-core/lib/i18n';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Pencil, Plus, Ticket, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
    bulkDestroy,
    create,
    destroy,
    edit,
    show,
    trash,
} from '@/routes/tickets';

type Row = Modules.Ticket.Data.TicketListItemData;

type Props = {
    tickets: Yuan.AdminCore.Data.PaginatedData<Row>;
    table: Yuan.AdminCore.Data.DataTableStateData;
    summary: Modules.Ticket.Data.TicketSummaryData;
};

/** The ticket list (generated from the approved pattern-index): KPI tiles, then the table with the message in each row's details. */
export default function Index({ tickets, table, summary }: Props) {
    const t = useT();
    const { can, isSuperAdmin } = usePermission();
    const removing = useAction();
    const [deleting, setDeleting] = useState<Row | null>(null);

    const columns: DataTableColumn<Row>[] = [
        {
            key: 'number',
            label: t('tickets.number'),
            className: 'font-medium',
            hideable: false,
        },
        { key: 'subject', label: t('tickets.subject') },
        { key: 'requester', label: t('tickets.requester') },
        {
            key: 'priority',
            label: t('tickets.priority'),
            cell: (row) => <StatusBadge label={row.priority_label} />,
        },
        {
            key: 'status',
            label: t('tickets.status'),
            cell: (row) => <StatusBadge label={row.status_label} />,
        },
        { key: 'assignee', label: t('tickets.assignee') },
    ];

    const rowActions = (row: Row): RowAction[] => [
        ...(can('tickets.view')
            ? [{ label: t('table.view'), icon: Eye, href: show(row.id) }]
            : []),
        ...(can('tickets.edit')
            ? [{ label: t('table.edit'), icon: Pencil, href: edit(row.id) }]
            : []),
        ...(can('tickets.delete')
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

    const createButton = can('tickets.create') && (
        <Button asChild>
            <Link href={create()}>
                <Plus />
                {t('table.create')}
            </Link>
        </Button>
    );

    return (
        <>
            <Head title={t('tickets.title')} />
            <div className="flex flex-col gap-5">
                <PageHeader
                    title={t('tickets.title')}
                    description={t('tickets.description')}
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
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatTile
                        icon="ticket"
                        label={t('tickets.kpi_total')}
                        value={summary.total}
                    />
                    <StatTile
                        icon="inbox"
                        label={t('tickets.kpi_new')}
                        value={summary.new}
                    />
                    <StatTile
                        icon="clock"
                        label={t('tickets.kpi_open')}
                        value={summary.open}
                    />
                    <StatTile
                        icon="circle-check"
                        label={t('tickets.kpi_done')}
                        value={summary.done}
                    />
                </div>
                <DataTable
                    data={tickets}
                    state={table}
                    columns={columns}
                    slug="tickets"
                    label={t('tickets.list')}
                    itemLabel={t('tickets.item')}
                    rowLabel={(row) => row.number}
                    searchPlaceholder={t('tickets.search')}
                    rowHref={
                        can('tickets.view') ? (row) => show(row.id) : undefined
                    }
                    rowActions={rowActions}
                    expandable={(row) => (
                        <div className="flex flex-col gap-2">
                            <span className="text-label text-muted-foreground uppercase">
                                {t('tickets.message')}
                            </span>
                            <p className="m-0 whitespace-pre-line">
                                {row.message}
                            </p>
                        </div>
                    )}
                    bulkDelete={
                        can('tickets.delete')
                            ? (ids, onFinish) =>
                                  router.delete(bulkDestroy(), {
                                      onFinish,
                                      data: { ids },
                                      preserveScroll: true,
                                  })
                            : undefined
                    }
                    empty={{
                        icon: Ticket,
                        title: t('tickets.empty_title'),
                        description: t('tickets.empty_text'),
                        action: createButton,
                    }}
                />
            </div>
            <ConfirmDialog
                open={deleting !== null}
                onOpenChange={(open) => !open && setDeleting(null)}
                title={t('tickets.delete_title')}
                itemName={deleting ? deleting.number : ''}
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
