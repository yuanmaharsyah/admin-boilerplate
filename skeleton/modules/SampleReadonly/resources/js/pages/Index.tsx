import { DataTable } from '@admin-core/components/admin/DataTable';
import type {
    DataTableColumn,
    RowAction,
} from '@admin-core/components/admin/DataTable';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { StatusBadge } from '@admin-core/components/admin/StatusBadge';
import { usePermission } from '@admin-core/hooks/usePermission';
import { formatLocalDate, formatNumber } from '@admin-core/lib/format';
import { useT } from '@admin-core/lib/i18n';
import { Head } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { show } from '@/routes/sample-readonly';

type Row = Modules.SampleReadonly.Data.SampleReadonlyListItemData;

type Props = {
    sampleReadonlies: Yuan.AdminCore.Data.PaginatedData<Row>;
    table: Yuan.AdminCore.Data.DataTableStateData;
};

/** The contoh baca saja list (generated from the approved pattern-index). */
export default function Index({ sampleReadonlies, table }: Props) {
    const t = useT();
    const { can } = usePermission();

    const columns: DataTableColumn<Row>[] = [
        {
            key: 'nama',
            label: t('sample-readonly.nama'),
            className: 'font-medium',
            hideable: false,
        },
        {
            key: 'jumlah',
            label: t('sample-readonly.jumlah'),
            align: 'right',
            cell: (row) => formatNumber(row.jumlah),
        },
        {
            key: 'status',
            label: t('sample-readonly.status'),
            cell: (row) => <StatusBadge label={row.status_label} />,
        },
        {
            key: 'tanggal',
            label: t('sample-readonly.tanggal'),
            cell: (row) =>
                row.tanggal === null ? '—' : formatLocalDate(row.tanggal),
        },
    ];

    const rowActions = (row: Row): RowAction[] => [
        ...(can('sample-readonly.view')
            ? [{ label: t('table.view'), icon: Eye, href: show(row.id) }]
            : []),
    ];

    return (
        <>
            <Head title={t('sample-readonly.title')} />
            <div className="flex flex-col gap-5">
                <PageHeader
                    title={t('sample-readonly.title')}
                    description={t('sample-readonly.description')}
                />
                <DataTable
                    data={sampleReadonlies}
                    state={table}
                    columns={columns}
                    slug="sample-readonly"
                    label={t('sample-readonly.list')}
                    itemLabel={t('sample-readonly.item')}
                    rowLabel={(row) => row.nama}
                    searchPlaceholder={t('sample-readonly.search')}
                    rowHref={
                        can('sample-readonly.view')
                            ? (row) => show(row.id)
                            : undefined
                    }
                    rowActions={rowActions}

                    empty={{
                        icon: Eye,
                        title: t('sample-readonly.empty_title'),
                        description: t('sample-readonly.empty_text'),
                    }}
                />
            </div>
        </>
    );
}
