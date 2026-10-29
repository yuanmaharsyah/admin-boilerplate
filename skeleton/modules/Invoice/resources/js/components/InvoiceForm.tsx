import { ComboboxField } from '@admin-core/components/admin/ComboboxField';
import { AttachmentFields } from '@admin-core/components/admin/FileField';
import { DateField } from '@admin-core/components/admin/DateField';
import { FormErrorSummary } from '@admin-core/components/admin/FormErrorSummary';
import {
    CurrencyField,
    NumberField,
} from '@admin-core/components/admin/NumberField';
import { RelationSelect } from '@admin-core/components/admin/RelationSelect';
import { SelectField } from '@admin-core/components/admin/SelectField';
import { SwitchField } from '@admin-core/components/admin/SwitchField';
import { TextareaField } from '@admin-core/components/admin/TextareaField';
import { TextField } from '@admin-core/components/admin/TextField';
import { useT } from '@admin-core/lib/i18n';
import type { InertiaFormProps } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { lookup } from '@/routes/customers';

/** The form's state: the store Data's fields, each empty until filled in. */
export type InvoiceFormValues = {
    [Key in keyof Modules.Invoice.Data.StoreInvoiceData]:
        Modules.Invoice.Data.StoreInvoiceData[Key] | null;
};

type Props = {
    /** The page's `useForm`; edit forms carry `lock_version` too, which no field touches. */
    form: Pick<
        InertiaFormProps<InvoiceFormValues>,
        'data' | 'errors' | 'setData'
    >;
    options: Modules.Invoice.Data.InvoiceFormOptionsData;
    /** The attachment slots; on edit with their current files. */
    attachments: Yuan.AdminCore.Data.AttachmentsData;
    /** The current customer's name, on edit. */
    customerName?: string;
};

/** Fields of the invoice create and edit pages, in two sections. */
export function InvoiceForm({
    form,
    options,
    attachments,
    customerName,
}: Props) {
    const t = useT();
    const { data, errors } = form;

    return (
        <div className="flex flex-col gap-5">
            <FormErrorSummary errors={errors} />
            <Section title={t('invoices.section_main')}>
                <TextField
                    name="number"
                    label={t('invoices.number')}
                    required
                    value={data.number ?? ''}
                    onChange={(value) => form.setData('number', value)}
                    error={errors.number}
                    maxLength={30}
                />
                <RelationSelect
                    name="customer_id"
                    label={t('invoices.customer')}
                    required
                    value={data.customer_id}
                    valueLabel={customerName}
                    onChange={(value) => form.setData('customer_id', value)}
                    lookupRoute={lookup}
                    placeholder={t('invoices.customer_placeholder')}
                    error={errors.customer_id}
                />
                <DateField
                    name="issued_on"
                    label={t('invoices.issued_on')}
                    required
                    value={data.issued_on}
                    onChange={(value) => form.setData('issued_on', value)}
                    error={errors.issued_on}
                />
                <DateField
                    name="due_at"
                    label={t('invoices.due_at')}
                    withTime
                    value={data.due_at}
                    onChange={(value) => form.setData('due_at', value)}
                    error={errors.due_at}
                />
                <SelectField
                    name="status"
                    label={t('invoices.status')}
                    required
                    value={data.status ?? ''}
                    onChange={(value) =>
                        form.setData(
                            'status',
                            value === ''
                                ? null
                                : (value as Modules.Invoice.Enums.InvoiceStatus),
                        )
                    }
                    options={options.statuses}
                    placeholder=""
                    error={errors.status}
                />
                <TextField
                    name="npwp"
                    label={t('invoices.npwp')}
                    help={t('invoices.npwp_help')}
                    inputMode="numeric"
                    value={data.npwp ?? ''}
                    onChange={(value) =>
                        form.setData('npwp', value === '' ? null : value)
                    }
                    error={errors.npwp}
                />
            </Section>
            <Section title={t('invoices.section_payment')}>
                <CurrencyField
                    name="total"
                    label={t('invoices.total')}
                    required
                    value={data.total}
                    onChange={(value) => form.setData('total', value)}
                    error={errors.total}
                />
                <NumberField
                    name="tax_rate"
                    label={t('invoices.tax_rate')}
                    required
                    maximumFractionDigits={3}
                    value={data.tax_rate}
                    onChange={(value) => form.setData('tax_rate', value)}
                    error={errors.tax_rate}
                />
                <ComboboxField
                    name="payment_method"
                    label={t('invoices.payment_method')}
                    value={data.payment_method}
                    onChange={(value) =>
                        form.setData(
                            'payment_method',
                            value as Modules.Invoice.Enums.PaymentMethod | null,
                        )
                    }
                    options={options.payment_methods}
                    error={errors.payment_method}
                />
                <div className="flex items-end pb-2">
                    <SwitchField
                        name="send_reminder"
                        label={t('invoices.send_reminder')}
                        value={data.send_reminder ?? false}
                        onChange={(value) =>
                            form.setData('send_reminder', value)
                        }
                        error={errors.send_reminder}
                    />
                </div>
                <div className="md:col-span-2">
                    <TextareaField
                        name="notes"
                        label={t('invoices.notes')}
                        value={data.notes ?? ''}
                        onChange={(value) =>
                            form.setData('notes', value === '' ? null : value)
                        }
                        error={errors.notes}
                    />
                </div>
            </Section>
            <Section title={t('invoices.section_files')}>
                <AttachmentFields
                    slots={attachments.slots}
                    value={data.files ?? {}}
                    errors={errors}
                    onChange={(files) => form.setData('files', files)}
                />
            </Section>
        </div>
    );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="flex flex-col gap-4 rounded bg-card p-6 text-card-foreground">
            <h2 className="m-0 text-section">{title}</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                {children}
            </div>
        </section>
    );
}
