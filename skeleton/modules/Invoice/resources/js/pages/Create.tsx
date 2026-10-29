import { FormFooter } from '@admin-core/components/admin/FormFooter';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { UnsavedChangesGuard } from '@admin-core/components/admin/UnsavedChangesGuard';
import { useAdminForm } from '@admin-core/hooks/useAdminForm';
import { useT } from '@admin-core/lib/i18n';
import { Head } from '@inertiajs/react';
import { index, store } from '@/routes/invoices';
import { InvoiceForm } from '../components/InvoiceForm';
import type { InvoiceFormValues } from '../components/InvoiceForm';

type Props = {
    options: Modules.Invoice.Data.InvoiceFormOptionsData;
    attachments: Yuan.AdminCore.Data.AttachmentsData;
};

export default function Create({ options, attachments }: Props) {
    const t = useT();
    const { form, submit } = useAdminForm<InvoiceFormValues>({
        number: '',
        customer_id: null,
        issued_on: null,
        due_at: null,
        status: 'draft',
        payment_method: null,
        total: null,
        tax_rate: 11,
        send_reminder: false,
        npwp: null,
        notes: null,
        files: {},
    });

    return (
        <>
            <Head title={t('invoices.create_title')} />
            <form
                noValidate
                className="flex flex-col gap-5"
                onSubmit={(event) => {
                    event.preventDefault();
                    submit(store());
                }}
            >
                <PageHeader
                    title={t('invoices.create_title')}
                    backHref={index()}
                />
                <InvoiceForm
                    form={form}
                    options={options}
                    attachments={attachments}
                />
                <FormFooter
                    cancelHref={index()}
                    processing={form.processing}
                    dirty={form.isDirty}
                />
            </form>
            <UnsavedChangesGuard when={form.isDirty && !form.processing} />
        </>
    );
}
