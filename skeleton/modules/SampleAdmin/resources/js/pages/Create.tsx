import { FormFooter } from '@admin-core/components/admin/FormFooter';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { UnsavedChangesGuard } from '@admin-core/components/admin/UnsavedChangesGuard';
import { useAdminForm } from '@admin-core/hooks/useAdminForm';
import { useT } from '@admin-core/lib/i18n';
import { Head } from '@inertiajs/react';
import { index, store } from '@/routes/sample-admin';
import { SampleAdminForm } from '../components/SampleAdminForm';
import type { SampleAdminFormValues } from '../components/SampleAdminForm';

type Props = {
    attachments: Yuan.AdminCore.Data.AttachmentsData;
};

/** A new contoh khusus super admin (generated from the approved pattern-form). */
export default function Create({ attachments }: Props) {
    const t = useT();
    const { form, submit } = useAdminForm<SampleAdminFormValues>({
        judul: '',
        catatan: null,
        files: {},
    });

    return (
        <>
            <Head title={t('sample-admin.create_title')} />
            <form
                noValidate
                className="flex flex-col gap-5"
                onSubmit={(event) => {
                    event.preventDefault();
                    submit(store());
                }}
            >
                <PageHeader
                    title={t('sample-admin.create_title')}
                    backHref={index()}
                />
                <SampleAdminForm form={form} attachments={attachments} />
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
