import type { ModuleDictionary } from '@admin-core/lib/i18n';

/* Strings of the SampleReadonly module; every key starts with `sample-readonly.`. `en.ts` must have exactly the same keys. */
export const id = {
    'sample-readonly.title': 'Contoh baca saja',
    'sample-readonly.description': 'Daftar contoh baca saja.',
    'sample-readonly.list': 'Daftar contoh baca saja',
    'sample-readonly.item': 'contoh baca saja',
    'sample-readonly.search': 'Cari…',
    'sample-readonly.empty_title': 'Belum ada contoh baca saja',
    'sample-readonly.empty_text':
        'Data contoh baca saja yang dibuat akan muncul di sini.',
    'sample-readonly.delete_title': 'Hapus contoh baca saja',
    'sample-readonly.create_title': 'Tambah contoh baca saja',
    'sample-readonly.edit_title': 'Edit {name}',
    'sample-readonly.section_main': 'Contoh baca saja',
    'sample-readonly.section_files': 'Berkas',
    'sample-readonly.yes': 'Ya',
    'sample-readonly.no': 'Tidak',
    'sample-readonly.nama': 'Nama',
    'sample-readonly.jumlah': 'Jumlah',
    'sample-readonly.status': 'Status',
    'sample-readonly.tanggal': 'Tanggal',
} as const satisfies ModuleDictionary<'sample-readonly'>;

declare module '@admin-core/lib/i18n' {
    interface Dictionaries {
        'sample-readonly': typeof id;
    }
}
