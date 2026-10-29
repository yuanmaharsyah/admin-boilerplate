import { DateField } from '@admin-core/components/admin/DateField';
import { AttachmentFields } from '@admin-core/components/admin/FileField';
import { FormErrorSummary } from '@admin-core/components/admin/FormErrorSummary';
import {
    CurrencyField,
    NumberField,
} from '@admin-core/components/admin/NumberField';
import { RelationSelect } from '@admin-core/components/admin/RelationSelect';
import { SelectField } from '@admin-core/components/admin/SelectField';
import { SwitchField } from '@admin-core/components/admin/SwitchField';
import { TextField } from '@admin-core/components/admin/TextField';
import { TextareaField } from '@admin-core/components/admin/TextareaField';
import { useT } from '@admin-core/lib/i18n';
import type { InertiaFormProps } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { lookup as customerLookup } from '@/routes/customers';

/** The form's state: the input Data's fields (without `lock_version`), each empty until filled in. */
export type SampleFormValues = {
    [
        Key in Exclude<
            keyof Modules.Sample.Data.StoreSampleData,
            'lock_version'
        >
    ]: Modules.Sample.Data.StoreSampleData[Key] | null;
};

type Props = {
    /** The page's `useForm`; the edit form carries `lock_version` too, which no field touches. */
    form: Pick<
        InertiaFormProps<SampleFormValues>,
        'data' | 'errors' | 'setData'
    >;
    /** The record on edit (labels of its relations). */
    record?: Modules.Sample.Data.SampleData;
    options: Modules.Sample.Data.SampleFormOptionsData;
    /** The attachment slots; on edit with their current files. */
    attachments: Yuan.AdminCore.Data.AttachmentsData;
};

/** Fields of the contoh create and edit pages. */
export function SampleForm({ form, record, options, attachments }: Props) {
    const t = useT();
    const { data, errors } = form;

    return (
        <div className="flex flex-col gap-5">
            <FormErrorSummary errors={errors} />
            <Section title={t('samples.section_main')}>
                <TextField
                    name="nama"
                    label={t('samples.nama')}
                    required
                    error={errors.nama}
                    value={data.nama ?? ''}
                    onChange={(value) => form.setData('nama', value)}
                />
                <TextField
                    name="kode"
                    label={t('samples.kode')}
                    error={errors.kode}
                    value={data.kode ?? ''}
                    onChange={(value) =>
                        form.setData('kode', value === '' ? null : value)
                    }
                />
                <div className="md:col-span-2">
                    <TextareaField
                        name="catatan"
                        label={t('samples.catatan')}
                        error={errors.catatan}
                        value={data.catatan ?? ''}
                        onChange={(value) =>
                            form.setData('catatan', value === '' ? null : value)
                        }
                    />
                </div>
                <NumberField
                    name="jumlah"
                    label={t('samples.jumlah')}
                    required
                    error={errors.jumlah}
                    maximumFractionDigits={0}
                    value={data.jumlah}
                    onChange={(value) => form.setData('jumlah', value)}
                />
                <NumberField
                    name="tahun"
                    label={t('samples.tahun')}
                    required
                    error={errors.tahun}
                    maximumFractionDigits={0}
                    grouping={false}
                    value={data.tahun}
                    onChange={(value) => form.setData('tahun', value)}
                />
                <NumberField
                    name="berat"
                    label={t('samples.berat')}
                    error={errors.berat}
                    maximumFractionDigits={3}
                    value={data.berat}
                    onChange={(value) => form.setData('berat', value)}
                />
                <CurrencyField
                    name="harga"
                    label={t('samples.harga')}
                    required
                    error={errors.harga}
                    value={data.harga}
                    onChange={(value) => form.setData('harga', value)}
                />
                <div className="flex items-end pb-2">
                    <SwitchField
                        name="aktif"
                        label={t('samples.aktif')}
                        error={errors.aktif}
                        value={data.aktif ?? false}
                        onChange={(value) => form.setData('aktif', value)}
                    />
                </div>
                <DateField
                    name="mulai_tanggal"
                    label={t('samples.mulai_tanggal')}
                    required
                    error={errors.mulai_tanggal}
                    value={data.mulai_tanggal}
                    onChange={(value) => form.setData('mulai_tanggal', value)}
                />
                <DateField
                    name="selesai_pada"
                    label={t('samples.selesai_pada')}
                    error={errors.selesai_pada}
                    withTime
                    value={data.selesai_pada}
                    onChange={(value) => form.setData('selesai_pada', value)}
                />
                <SelectField
                    name="status"
                    label={t('samples.status')}
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
                                : (value as Modules.Sample.Enums.SampleStatus),
                        )
                    }
                />
                <RelationSelect
                    name="customer_id"
                    label={t('samples.customer_id')}
                    required
                    error={errors.customer_id}
                    value={data.customer_id}
                    valueLabel={record?.customer_name}
                    lookupRoute={customerLookup}
                    onChange={(value) => form.setData('customer_id', value)}
                />
            </Section>
            <Section title={t('samples.section_files')}>
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
