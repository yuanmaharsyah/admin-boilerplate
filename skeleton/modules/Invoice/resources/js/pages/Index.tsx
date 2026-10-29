import { ConfirmDialog } from '@admin-core/components/admin/ConfirmDialog';
import { DataTable } from '@admin-core/components/admin/DataTable';
import type {
    DataTableColumn,
    RowAction,
} from '@admin-core/components/admin/DataTable';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { Button } from '@admin-core/components/ui/button';
import { usePermission } from '@admin-core/hooks/usePermission';
import { formatCurrency, formatLocalDate } from '@admin-core/lib/format';
import { useAction } from '@admin-core/hooks/useAction';
import { useT } from '@admin-core/lib/i18n';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Pencil, Plus, Receipt, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
    bulkDestroy,
    create,
    destroy,
    download,
    edit,
    show,
    trash,
} from '@/routes/invoices';
import { InvoiceStatusBadge } from '../components/InvoiceStatusBadge';

type Row = Modules.Invoice.Data.InvoiceListItemData;

type Props = {
    invoices: Yuan.AdminCore.Data.PaginatedData<Row>;
    table: Yuan.AdminCore.Data.DataTableStateData;
};

export default function Index({ invoices, table }: Props) {
    const t = useT();
    const removing = useAction();
    const { can, isSuperAdmin } = usePermission();
    const [deleting, setDeleting] = useState<Row | null>(null);

    const columns: DataTableColumn<Row>[] = [
        {
            key: 'number',
            label: t('invoices.number'),
            className: 'font-medium',
            hideable: false,
        },
        { key: 'customer_name', label: t('invoices.customer') },
        {
            key: 'issued_on',
            label: t('invoices.issued_on'),
            cell: (row) => formatLocalDate(row.issued_on),
        },
        {
            key: 'status',
            label: t('invoices.status'),
            cell: (row) => (
                <InvoiceStatusBadge
                    status={row.status}
                    label={row.status_label}
                />
            ),
        },
        {
            key: 'total',
            label: t('invoices.total'),
            align: 'right',
            cell: (row) => formatCurrency(row.total),
        },
    ];

    const rowActions = (row: Row): RowAction[] => [
        ...(can('invoices.view')
            ? [{ label: t('table.view'), icon: Eye, href: show(row.id) }]
            : []),
        ...(can('invoices.edit')
            ? [{ label: t('table.edit'), icon: Pencil, href: edit(row.id) }]
            : []),
        ...(can('invoices.delete')
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

    const createButton = can('invoices.create') && (
        <Button asChild>
            <Link href={create()}>
                <Plus />
                {t('table.create')}
            </Link>
        </Button>
    );

    return (
        <>
            <Head title={t('invoices.title')} />
            <div className="flex flex-col gap-5">
                <PageHeader
                    title={t('invoices.title')}
                    description={t('invoices.description')}
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
                    data={invoices}
                    state={table}
                    columns={columns}
                    slug="invoices"
                    label={t('invoices.list')}
                    itemLabel={t('invoices.item')}
                    rowLabel={(row) => row.number}
                    searchPlaceholder={t('invoices.search')}
                    rowHref={
                        can('invoices.view') ? (row) => show(row.id) : undefined
                    }
                    rowActions={rowActions}
                    bulkDelete={
                        can('invoices.delete')
                            ? (ids, onFinish) =>
                                  router.delete(bulkDestroy(), {
                                      onFinish,
                                      data: { ids },
                                      preserveScroll: true,
                                  })
                            : undefined
                    }
                    download={can('invoices.download') ? download() : undefined}
                    empty={{
                        icon: Receipt,
                        title: t('invoices.empty_title'),
                        description: t('invoices.empty_text'),
                        action: createButton,
                    }}
                />
            </div>
            <ConfirmDialog
                open={deleting !== null}
                onOpenChange={(open) => !open && setDeleting(null)}
                title={t('invoices.delete_title')}
                itemName={deleting?.number ?? ''}
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
