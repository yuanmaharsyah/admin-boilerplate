import { FormFooter } from '@admin-core/components/admin/FormFooter';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { StaleUpdateDialog } from '@admin-core/components/admin/StaleUpdateDialog';
import { UnsavedChangesGuard } from '@admin-core/components/admin/UnsavedChangesGuard';
import { useAdminForm } from '@admin-core/hooks/useAdminForm';
import { useT } from '@admin-core/lib/i18n';
import { Head } from '@inertiajs/react';
import { show, update } from '@/routes/invoices';
import { InvoiceForm } from '../components/InvoiceForm';
import type { InvoiceFormValues } from '../components/InvoiceForm';

type Props = {
    invoice: Modules.Invoice.Data.InvoiceData;
    options: Modules.Invoice.Data.InvoiceFormOptionsData;
    attachments: Yuan.AdminCore.Data.AttachmentsData;
};

export default function Edit({ invoice, options, attachments }: Props) {
    const t = useT();
    const { form, submit, stale, dirtyData, reload } = useAdminForm<
        InvoiceFormValues & { lock_version: number }
    >({
        number: invoice.number,
        customer_id: invoice.customer_id,
        issued_on: invoice.issued_on,
        due_at: invoice.due_at,
        status: invoice.status,
        payment_method: invoice.payment_method,
        total: invoice.total,
        tax_rate: invoice.tax_rate,
        send_reminder: invoice.send_reminder,
        npwp: invoice.npwp,
        notes: invoice.notes,
        files: {},
        lock_version: invoice.lock_version,
    });
    const title = t('invoices.edit_title', { number: invoice.number });

    return (
        <>
            <Head title={title} />
            <form
                noValidate
                className="flex flex-col gap-5"
                onSubmit={(event) => {
                    event.preventDefault();
                    // POST + _method=PUT, so picked files travel with the form.
                    submit({
                        url: update.form(invoice.id).action,
                        method: 'post',
                    });
                }}
            >
                <PageHeader title={title} backHref={show(invoice.id)} />
                <InvoiceForm
                    form={form}
                    options={options}
                    attachments={attachments}
                    customerName={invoice.customer_name}
                />
                <FormFooter
                    cancelHref={show(invoice.id)}
                    processing={form.processing}
                    dirty={form.isDirty}
                />
            </form>
            <UnsavedChangesGuard
                when={form.isDirty && !form.processing && !stale}
            />
            <StaleUpdateDialog
                open={stale}
                dirtyData={dirtyData}
                onReload={reload}
            />
        </>
    );
}
