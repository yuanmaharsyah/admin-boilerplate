import { ConfirmDialog } from '@admin-core/components/admin/ConfirmDialog';
import { DataTable } from '@admin-core/components/admin/DataTable';
import type { DataTableColumn } from '@admin-core/components/admin/DataTable';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { Button } from '@admin-core/components/ui/button';
import { usePermission } from '@admin-core/hooks/usePermission';
import { useAction } from '@admin-core/hooks/useAction';
import { useT } from '@admin-core/lib/i18n';
import { Head, Link, router } from '@inertiajs/react';
import { Trash2, Users } from 'lucide-react';
import { useState } from 'react';
import { bulkDestroy, destroy, trash } from '@/routes/customers';

type Row = Modules.Customer.Data.CustomerListItemData;

type Props = {
    customers: Yuan.AdminCore.Data.PaginatedData<Row>;
    table: Yuan.AdminCore.Data.DataTableStateData;
};

export default function Index({ customers, table }: Props) {
    const t = useT();
    const removing = useAction();
    const { can, isSuperAdmin } = usePermission();
    const [deleting, setDeleting] = useState<Row | null>(null);

    const columns: DataTableColumn<Row>[] = [
        {
            key: 'name',
            label: t('customers.name'),
            className: 'font-medium',
            hideable: false,
        },
        { key: 'city', label: t('customers.city') },
        {
            key: 'no_hp',
            label: t('customers.no_hp'),
            className: 'text-muted-foreground',
        },
    ];

    return (
        <>
            <Head title={t('customers.title')} />
            <div className="flex flex-col gap-5">
                <PageHeader
                    title={t('customers.title')}
                    description={t('customers.description')}
                    actions={
                        isSuperAdmin && (
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
                        )
                    }
                />
                <DataTable
                    data={customers}
                    state={table}
                    columns={columns}
                    slug="customers"
                    label={t('customers.list')}
                    itemLabel={t('customers.item')}
                    rowLabel={(row) => row.name}
                    searchPlaceholder={t('customers.search')}
                    rowActions={(row) =>
                        can('customers.delete')
                            ? [
                                  {
                                      label: t('table.delete'),
                                      icon: Trash2,
                                      destructive: true,
                                      onSelect: () => setDeleting(row),
                                  },
                              ]
                            : []
                    }
                    bulkDelete={
                        can('customers.delete')
                            ? (ids, onFinish) =>
                                  router.delete(bulkDestroy(), {
                                      onFinish,
                                      data: { ids },
                                      preserveScroll: true,
                                  })
                            : undefined
                    }
                    empty={{ icon: Users, title: t('customers.empty_title') }}
                />
            </div>
            <ConfirmDialog
                open={deleting !== null}
                onOpenChange={(open) => !open && setDeleting(null)}
                title={t('customers.delete_title')}
                itemName={deleting?.name ?? ''}
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
