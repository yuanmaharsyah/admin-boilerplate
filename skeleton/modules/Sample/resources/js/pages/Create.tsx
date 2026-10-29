import { FormFooter } from '@admin-core/components/admin/FormFooter';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { UnsavedChangesGuard } from '@admin-core/components/admin/UnsavedChangesGuard';
import { useAdminForm } from '@admin-core/hooks/useAdminForm';
import { useT } from '@admin-core/lib/i18n';
import { Head } from '@inertiajs/react';
import { index, store } from '@/routes/samples';
import { SampleForm } from '../components/SampleForm';
import type { SampleFormValues } from '../components/SampleForm';

type Props = {
    options: Modules.Sample.Data.SampleFormOptionsData;
    attachments: Yuan.AdminCore.Data.AttachmentsData;
};

/** A new contoh (generated from the approved pattern-form). */
export default function Create({ options, attachments }: Props) {
    const t = useT();
    const { form, submit } = useAdminForm<SampleFormValues>({
        nama: '',
        kode: null,
        catatan: null,
        jumlah: null,
        tahun: null,
        berat: null,
        harga: null,
        aktif: false,
        mulai_tanggal: null,
        selesai_pada: null,
        status: null,
        customer_id: null,
        files: {},
    });

    return (
        <>
            <Head title={t('samples.create_title')} />
            <form
                noValidate
                className="flex flex-col gap-5"
                onSubmit={(event) => {
                    event.preventDefault();
                    submit(store());
                }}
            >
                <PageHeader
                    title={t('samples.create_title')}
                    backHref={index()}
                />
                <SampleForm
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
