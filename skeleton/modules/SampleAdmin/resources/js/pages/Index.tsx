import { ConfirmDialog } from '@admin-core/components/admin/ConfirmDialog';
import { DataTable } from '@admin-core/components/admin/DataTable';
import type {
    DataTableColumn,
    RowAction,
} from '@admin-core/components/admin/DataTable';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { Button } from '@admin-core/components/ui/button';
import { useAction } from '@admin-core/hooks/useAction';
import { usePermission } from '@admin-core/hooks/usePermission';
import { useT } from '@admin-core/lib/i18n';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Pencil, Plus, ShieldCheck, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
    bulkDestroy,
    create,
    destroy,
    edit,
    show,
    trash,
} from '@/routes/sample-admin';

type Row = Modules.SampleAdmin.Data.SampleAdminListItemData;

type Props = {
    sampleAdmins: Yuan.AdminCore.Data.PaginatedData<Row>;
    table: Yuan.AdminCore.Data.DataTableStateData;
};

/** The contoh khusus super admin list (generated from the approved pattern-index). */
export default function Index({ sampleAdmins, table }: Props) {
    const t = useT();
    const { isSuperAdmin } = usePermission();
    const removing = useAction();
    const [deleting, setDeleting] = useState<Row | null>(null);

    const columns: DataTableColumn<Row>[] = [
        {
            key: 'judul',
            label: t('sample-admin.judul'),
            className: 'font-medium',
            hideable: false,
        },
    ];

    const rowActions = (row: Row): RowAction[] => [
        ...(isSuperAdmin
            ? [{ label: t('table.view'), icon: Eye, href: show(row.id) }]
            : []),
        ...(isSuperAdmin
            ? [{ label: t('table.edit'), icon: Pencil, href: edit(row.id) }]
            : []),
        ...(isSuperAdmin
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

    const createButton = isSuperAdmin && (
        <Button asChild>
            <Link href={create()}>
                <Plus />
                {t('table.create')}
            </Link>
        </Button>
    );

    return (
        <>
            <Head title={t('sample-admin.title')} />
            <div className="flex flex-col gap-5">
                <PageHeader
                    title={t('sample-admin.title')}
                    description={t('sample-admin.description')}
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
                    data={sampleAdmins}
                    state={table}
                    columns={columns}
                    slug="sample-admin"
                    label={t('sample-admin.list')}
                    itemLabel={t('sample-admin.item')}
                    rowLabel={(row) => row.judul}
                    searchPlaceholder={t('sample-admin.search')}
                    rowHref={isSuperAdmin ? (row) => show(row.id) : undefined}
                    rowActions={rowActions}
                    bulkDelete={
                        isSuperAdmin
                            ? (ids, onFinish) =>
                                  router.delete(bulkDestroy(), {
                                      onFinish,
                                      data: { ids },
                                      preserveScroll: true,
                                  })
                            : undefined
                    }
                    empty={{
                        icon: ShieldCheck,
                        title: t('sample-admin.empty_title'),
                        description: t('sample-admin.empty_text'),
                        action: createButton,
                    }}
                />
            </div>
            <ConfirmDialog
                open={deleting !== null}
                onOpenChange={(open) => !open && setDeleting(null)}
                title={t('sample-admin.delete_title')}
                itemName={deleting ? deleting.judul : ''}
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
