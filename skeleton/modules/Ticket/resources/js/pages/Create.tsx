import { FormFooter } from '@admin-core/components/admin/FormFooter';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { UnsavedChangesGuard } from '@admin-core/components/admin/UnsavedChangesGuard';
import { useAdminForm } from '@admin-core/hooks/useAdminForm';
import { useT } from '@admin-core/lib/i18n';
import { Head } from '@inertiajs/react';
import { index, store } from '@/routes/tickets';
import { TicketForm } from '../components/TicketForm';
import type { TicketFormValues } from '../components/TicketForm';

type Props = {
    options: Modules.Ticket.Data.TicketFormOptionsData;
};

/** A new tiket (generated from the approved pattern-form). */
export default function Create({ options }: Props) {
    const t = useT();
    const { form, submit } = useAdminForm<TicketFormValues>({
        number: '',
        subject: '',
        requester: '',
        message: null,
        priority: null,
        status: null,
        assignee: null,
    });

    return (
        <>
            <Head title={t('tickets.create_title')} />
            <form
                noValidate
                className="flex flex-col gap-5"
                onSubmit={(event) => {
                    event.preventDefault();
                    submit(store());
                }}
            >
                <PageHeader
                    title={t('tickets.create_title')}
                    backHref={index()}
                />
                <TicketForm form={form} options={options} />
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
