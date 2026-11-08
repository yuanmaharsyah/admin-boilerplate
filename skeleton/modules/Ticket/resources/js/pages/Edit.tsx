import { FormFooter } from '@admin-core/components/admin/FormFooter';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { StaleUpdateDialog } from '@admin-core/components/admin/StaleUpdateDialog';
import { UnsavedChangesGuard } from '@admin-core/components/admin/UnsavedChangesGuard';
import { useAdminForm } from '@admin-core/hooks/useAdminForm';
import { useT } from '@admin-core/lib/i18n';
import { Head } from '@inertiajs/react';
import { show, update } from '@/routes/tickets';
import { TicketForm } from '../components/TicketForm';
import type { TicketFormValues } from '../components/TicketForm';

type Props = {
    ticket: Modules.Ticket.Data.TicketData;
    options: Modules.Ticket.Data.TicketFormOptionsData;
};

/** Editing a tiket (generated from the approved pattern-form). */
export default function Edit({ ticket, options }: Props) {
    const t = useT();
    const { form, submit, stale, dirtyData, reload } = useAdminForm<
        TicketFormValues & { lock_version: number }
    >({
        number: ticket.number,
        subject: ticket.subject,
        requester: ticket.requester,
        message: ticket.message,
        priority: ticket.priority,
        status: ticket.status,
        assignee: ticket.assignee,
        lock_version: ticket.lock_version,
    });
    const title = t('tickets.edit_title', { name: ticket.number });

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
                        url: update.form(ticket.id).action,
                        method: 'post',
                    });
                }}
            >
                <PageHeader title={title} backHref={show(ticket.id)} />
                <TicketForm form={form} record={ticket} options={options} />
                <FormFooter
                    cancelHref={show(ticket.id)}
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
