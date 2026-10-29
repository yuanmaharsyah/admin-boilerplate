import { FormFooter } from '@admin-core/components/admin/FormFooter';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { StaleUpdateDialog } from '@admin-core/components/admin/StaleUpdateDialog';
import { UnsavedChangesGuard } from '@admin-core/components/admin/UnsavedChangesGuard';
import { useAdminForm } from '@admin-core/hooks/useAdminForm';
import { useT } from '@admin-core/lib/i18n';
import { Head } from '@inertiajs/react';
import { show, update } from '@/routes/samples';
import { SampleForm } from '../components/SampleForm';
import type { SampleFormValues } from '../components/SampleForm';

type Props = {
    sample: Modules.Sample.Data.SampleData;
    options: Modules.Sample.Data.SampleFormOptionsData;
    attachments: Yuan.AdminCore.Data.AttachmentsData;
};

/** Editing a contoh (generated from the approved pattern-form). */
export default function Edit({ sample, options, attachments }: Props) {
    const t = useT();
    const { form, submit, stale, dirtyData, reload } = useAdminForm<
        SampleFormValues & { lock_version: number }
    >({
        nama: sample.nama,
        kode: sample.kode,
        catatan: sample.catatan,
        jumlah: sample.jumlah,
        tahun: sample.tahun,
        berat: sample.berat,
        harga: sample.harga,
        aktif: sample.aktif,
        mulai_tanggal: sample.mulai_tanggal,
        selesai_pada: sample.selesai_pada,
        status: sample.status,
        customer_id: sample.customer_id,
        files: {},
        lock_version: sample.lock_version,
    });
    const title = t('samples.edit_title', { name: sample.nama });

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
                        url: update.form(sample.id).action,
                        method: 'post',
                    });
                }}
            >
                <PageHeader title={title} backHref={show(sample.id)} />
                <SampleForm
                    form={form}
                    record={sample}
                    options={options}
                    attachments={attachments}
                />
                <FormFooter
                    cancelHref={show(sample.id)}
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
