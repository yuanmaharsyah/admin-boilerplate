import { FormFooter } from '@admin-core/components/admin/FormFooter';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { StaleUpdateDialog } from '@admin-core/components/admin/StaleUpdateDialog';
import { UnsavedChangesGuard } from '@admin-core/components/admin/UnsavedChangesGuard';
import { useAdminForm } from '@admin-core/hooks/useAdminForm';
import { useT } from '@admin-core/lib/i18n';
import { Head } from '@inertiajs/react';
import { show, update } from '@/routes/sample-admin';
import { SampleAdminForm } from '../components/SampleAdminForm';
import type { SampleAdminFormValues } from '../components/SampleAdminForm';

type Props = {
    sampleAdmin: Modules.SampleAdmin.Data.SampleAdminData;
    attachments: Yuan.AdminCore.Data.AttachmentsData;
};

/** Editing a contoh khusus super admin (generated from the approved pattern-form). */
export default function Edit({ sampleAdmin, attachments }: Props) {
    const t = useT();
    const { form, submit, stale, dirtyData, reload } = useAdminForm<
        SampleAdminFormValues & { lock_version: number }
    >({
        judul: sampleAdmin.judul,
        catatan: sampleAdmin.catatan,
        files: {},
        lock_version: sampleAdmin.lock_version,
    });
    const title = t('sample-admin.edit_title', { name: sampleAdmin.judul });

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
                        url: update.form(sampleAdmin.id).action,
                        method: 'post',
                    });
                }}
            >
                <PageHeader title={title} backHref={show(sampleAdmin.id)} />
                <SampleAdminForm
                    form={form}
                    record={sampleAdmin}
                    attachments={attachments}
                />
                <FormFooter
                    cancelHref={show(sampleAdmin.id)}
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
