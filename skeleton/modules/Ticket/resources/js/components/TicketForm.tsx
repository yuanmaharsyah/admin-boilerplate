import { FormErrorSummary } from '@admin-core/components/admin/FormErrorSummary';
import { SelectField } from '@admin-core/components/admin/SelectField';
import { TextField } from '@admin-core/components/admin/TextField';
import { TextareaField } from '@admin-core/components/admin/TextareaField';
import { useT } from '@admin-core/lib/i18n';
import type { InertiaFormProps } from '@inertiajs/react';
import type { ReactNode } from 'react';

/** The form's state: the input Data's fields (without `lock_version`), each empty until filled in. */
export type TicketFormValues = {
    [
        Key in Exclude<
            keyof Modules.Ticket.Data.StoreTicketData,
            'lock_version'
        >
    ]: Modules.Ticket.Data.StoreTicketData[Key] | null;
};

type Props = {
    /** The page's `useForm`; the edit form carries `lock_version` too, which no field touches. */
    form: Pick<
        InertiaFormProps<TicketFormValues>,
        'data' | 'errors' | 'setData'
    >;
    /** The record on edit (labels of its relations). */
    record?: Modules.Ticket.Data.TicketData;
    options: Modules.Ticket.Data.TicketFormOptionsData;
};

/** Fields of the tiket create and edit pages. */
export function TicketForm({ form, options }: Props) {
    const t = useT();
    const { data, errors } = form;

    return (
        <div className="flex flex-col gap-5">
            <FormErrorSummary errors={errors} />
            <Section title={t('tickets.section_main')}>
                <TextField
                    name="number"
                    label={t('tickets.number')}
                    required
                    error={errors.number}
                    value={data.number ?? ''}
                    onChange={(value) => form.setData('number', value)}
                />
                <TextField
                    name="subject"
                    label={t('tickets.subject')}
                    required
                    error={errors.subject}
                    value={data.subject ?? ''}
                    onChange={(value) => form.setData('subject', value)}
                />
                <TextField
                    name="requester"
                    label={t('tickets.requester')}
                    required
                    error={errors.requester}
                    value={data.requester ?? ''}
                    onChange={(value) => form.setData('requester', value)}
                />
                <div className="md:col-span-2">
                    <TextareaField
                        name="message"
                        label={t('tickets.message')}
                        required
                        error={errors.message}
                        value={data.message ?? ''}
                        onChange={(value) => form.setData('message', value)}
                    />
                </div>
                <SelectField
                    name="priority"
                    label={t('tickets.priority')}
                    required
                    error={errors.priority}
                    options={options.priority_options}
                    placeholder=""
                    value={data.priority ?? ''}
                    onChange={(value) =>
                        form.setData(
                            'priority',
                            value === ''
                                ? null
                                : (value as Modules.Ticket.Enums.TicketPriority),
                        )
                    }
                />
                <SelectField
                    name="status"
                    label={t('tickets.status')}
                    required
                    error={errors.status}
                    options={options.status_options}
                    placeholder=""
                    value={data.status ?? ''}
                    onChange={(value) =>
                        form.setData(
                            'status',
                            value === ''
                                ? null
                                : (value as Modules.Ticket.Enums.TicketStatus),
                        )
                    }
                />
                <TextField
                    name="assignee"
                    label={t('tickets.assignee')}
                    error={errors.assignee}
                    value={data.assignee ?? ''}
                    onChange={(value) =>
                        form.setData('assignee', value === '' ? null : value)
                    }
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
