import { AttachmentFields } from '@admin-core/components/admin/FileField';
import { FormErrorSummary } from '@admin-core/components/admin/FormErrorSummary';
import { TextField } from '@admin-core/components/admin/TextField';
import { TextareaField } from '@admin-core/components/admin/TextareaField';
import { useT } from '@admin-core/lib/i18n';
import type { InertiaFormProps } from '@inertiajs/react';
import type { ReactNode } from 'react';

/** The form's state: the input Data's fields (without `lock_version`), each empty until filled in. */
export type SampleAdminFormValues = {
    [
        Key in Exclude<
            keyof Modules.SampleAdmin.Data.StoreSampleAdminData,
            'lock_version'
        >
    ]: Modules.SampleAdmin.Data.StoreSampleAdminData[Key] | null;
};

type Props = {
    /** The page's `useForm`; the edit form carries `lock_version` too, which no field touches. */
    form: Pick<
        InertiaFormProps<SampleAdminFormValues>,
        'data' | 'errors' | 'setData'
    >;
    /** The record on edit (labels of its relations). */
    record?: Modules.SampleAdmin.Data.SampleAdminData;
    /** The attachment slots; on edit with their current files. */
    attachments: Yuan.AdminCore.Data.AttachmentsData;
};

/** Fields of the contoh khusus super admin create and edit pages. */
export function SampleAdminForm({ form, attachments }: Props) {
    const t = useT();
    const { data, errors } = form;

    return (
        <div className="flex flex-col gap-5">
            <FormErrorSummary errors={errors} />
            <Section title={t('sample-admin.section_main')}>
                <TextField
                    name="judul"
                    label={t('sample-admin.judul')}
                    required
                    error={errors.judul}
                    value={data.judul ?? ''}
                    onChange={(value) => form.setData('judul', value)}
                />
                <div className="md:col-span-2">
                    <TextareaField
                        name="catatan"
                        label={t('sample-admin.catatan')}
                        error={errors.catatan}
                        value={data.catatan ?? ''}
                        onChange={(value) =>
                            form.setData('catatan', value === '' ? null : value)
                        }
                    />
                </div>
            </Section>
            <Section title={t('sample-admin.section_files')}>
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
