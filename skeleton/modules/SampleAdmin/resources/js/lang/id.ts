import type { ModuleDictionary } from '@admin-core/lib/i18n';

/* Strings of the SampleAdmin module; every key starts with `sample-admin.`. `en.ts` must have exactly the same keys. */
export const id = {
    'sample-admin.title': 'Contoh khusus Super Admin',
    'sample-admin.description': 'Daftar contoh khusus super admin.',
    'sample-admin.list': 'Daftar contoh khusus super admin',
    'sample-admin.item': 'contoh khusus super admin',
    'sample-admin.search': 'Cari…',
    'sample-admin.empty_title': 'Belum ada contoh khusus super admin',
    'sample-admin.empty_text':
        'Data contoh khusus super admin yang dibuat akan muncul di sini.',
    'sample-admin.delete_title': 'Hapus contoh khusus super admin',
    'sample-admin.create_title': 'Tambah contoh khusus super admin',
    'sample-admin.edit_title': 'Edit {name}',
    'sample-admin.section_main': 'Contoh khusus Super Admin',
    'sample-admin.section_files': 'Berkas',
    'sample-admin.yes': 'Ya',
    'sample-admin.no': 'Tidak',
    'sample-admin.judul': 'Judul',
    'sample-admin.catatan': 'Catatan',
} as const satisfies ModuleDictionary<'sample-admin'>;

declare module '@admin-core/lib/i18n' {
    interface Dictionaries {
        'sample-admin': typeof id;
    }
}
