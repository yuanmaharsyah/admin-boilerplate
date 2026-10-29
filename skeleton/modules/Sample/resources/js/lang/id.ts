import type { ModuleDictionary } from '@admin-core/lib/i18n';

/* Strings of the Sample module; every key starts with `samples.`. `en.ts` must have exactly the same keys. */
export const id = {
    'samples.title': 'Contoh',
    'samples.description': 'Daftar contoh.',
    'samples.list': 'Daftar contoh',
    'samples.item': 'contoh',
    'samples.search': 'Cari…',
    'samples.empty_title': 'Belum ada contoh',
    'samples.empty_text': 'Data contoh yang dibuat akan muncul di sini.',
    'samples.delete_title': 'Hapus contoh',
    'samples.create_title': 'Tambah contoh',
    'samples.edit_title': 'Edit {name}',
    'samples.section_main': 'Contoh',
    'samples.section_files': 'Berkas',
    'samples.yes': 'Ya',
    'samples.no': 'Tidak',
    'samples.nama': 'Nama',
    'samples.kode': 'Kode',
    'samples.catatan': 'Catatan',
    'samples.jumlah': 'Jumlah',
    'samples.tahun': 'Tahun',
    'samples.berat': 'Berat',
    'samples.harga': 'Harga',
    'samples.aktif': 'Aktif',
    'samples.mulai_tanggal': 'Mulai tanggal',
    'samples.selesai_pada': 'Selesai pada',
    'samples.status': 'Status',
    'samples.customer_id': 'Customer',
} as const satisfies ModuleDictionary<'samples'>;

declare module '@admin-core/lib/i18n' {
    interface Dictionaries {
        samples: typeof id;
    }
}
