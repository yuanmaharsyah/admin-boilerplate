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
import {
    formatCurrency,
    formatLocalDate,
    formatLocalDateTime,
    formatNumber,
} from '@admin-core/lib/format';
import { useT } from '@admin-core/lib/i18n';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, FlaskConical, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
    bulkDestroy,
    create,
    destroy,
    download,
    edit,
    show,
    trash,
} from '@/routes/samples';

type Row = Modules.Sample.Data.SampleListItemData;

type Props = {
    samples: Yuan.AdminCore.Data.PaginatedData<Row>;
    table: Yuan.AdminCore.Data.DataTableStateData;
};

/** The contoh list (generated from the approved pattern-index). */
export default function Index({ samples, table }: Props) {
    const t = useT();
    const { can, isSuperAdmin } = usePermission();
    const removing = useAction();
    const [deleting, setDeleting] = useState<Row | null>(null);

    const columns: DataTableColumn<Row>[] = [
        {
            key: 'nama',
            label: t('samples.nama'),
            className: 'font-medium',
            hideable: false,
        },
        { key: 'kode', label: t('samples.kode') },
        {
            key: 'jumlah',
            label: t('samples.jumlah'),
            align: 'right',
            cell: (row) => formatNumber(row.jumlah),
        },
        { key: 'tahun', label: t('samples.tahun') },
        {
            key: 'berat',
            label: t('samples.berat'),
            align: 'right',
            cell: (row) =>
                row.berat === null ? '—' : formatNumber(row.berat, 3),
        },
        {
            key: 'harga',
            label: t('samples.harga'),
            align: 'right',
            cell: (row) => formatCurrency(row.harga),
        },
        {
            key: 'mulai_tanggal',
            label: t('samples.mulai_tanggal'),
            cell: (row) => formatLocalDate(row.mulai_tanggal),
        },
        {
            key: 'selesai_pada',
            label: t('samples.selesai_pada'),
            cell: (row) =>
                row.selesai_pada === null
                    ? '—'
                    : formatLocalDateTime(row.selesai_pada),
        },
        {
            key: 'status',
            label: t('samples.status'),
            cell: (row) => <StatusBadge label={row.status_label} />,
        },
        { key: 'customer_name', label: t('samples.customer_id') },
    ];

    const rowActions = (row: Row): RowAction[] => [
        ...(can('samples.view')
            ? [{ label: t('table.view'), icon: Eye, href: show(row.id) }]
            : []),
        ...(can('samples.edit')
            ? [{ label: t('table.edit'), icon: Pencil, href: edit(row.id) }]
            : []),
        ...(can('samples.delete')
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

    const createButton = can('samples.create') && (
        <Button asChild>
            <Link href={create()}>
                <Plus />
                {t('table.create')}
            </Link>
        </Button>
    );

    return (
        <>
            <Head title={t('samples.title')} />
            <div className="flex flex-col gap-5">
                <PageHeader
                    title={t('samples.title')}
                    description={t('samples.description')}
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
                    data={samples}
                    state={table}
                    columns={columns}
                    slug="samples"
                    label={t('samples.list')}
                    itemLabel={t('samples.item')}
                    rowLabel={(row) => row.nama}
                    searchPlaceholder={t('samples.search')}
                    rowHref={
                        can('samples.view') ? (row) => show(row.id) : undefined
                    }
                    rowActions={rowActions}
                    bulkDelete={
                        can('samples.delete')
                            ? (ids, onFinish) =>
                                  router.delete(bulkDestroy(), {
                                      onFinish,
                                      data: { ids },
                                      preserveScroll: true,
                                  })
                            : undefined
                    }
                    download={can('samples.download') ? download() : undefined}
                    empty={{
                        icon: FlaskConical,
                        title: t('samples.empty_title'),
                        description: t('samples.empty_text'),
                        action: createButton,
                    }}
                />
            </div>
            <ConfirmDialog
                open={deleting !== null}
                onOpenChange={(open) => !open && setDeleting(null)}
                title={t('samples.delete_title')}
                itemName={deleting ? deleting.nama : ''}
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
