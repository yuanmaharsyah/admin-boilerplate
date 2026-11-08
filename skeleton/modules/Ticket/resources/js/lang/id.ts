import type { ModuleDictionary } from '@admin-core/lib/i18n';

/* Strings of the Ticket module; every key starts with `tickets.`. `en.ts` must have exactly the same keys. */
export const id = {
    'tickets.title': 'Tiket',
    'tickets.description': 'Permintaan bantuan dari pengguna.',
    'tickets.list': 'Daftar tiket',
    'tickets.item': 'tiket',
    'tickets.search': 'Cari nomor, subjek atau pemohon…',
    'tickets.empty_title': 'Belum ada tiket',
    'tickets.empty_text': 'Tiket yang dibuat akan muncul di sini.',
    'tickets.delete_title': 'Hapus tiket',
    'tickets.create_title': 'Tambah tiket',
    'tickets.edit_title': 'Edit {name}',
    'tickets.section_main': 'Tiket',
    'tickets.section_files': 'Berkas',
    'tickets.yes': 'Ya',
    'tickets.no': 'Tidak',
    'tickets.number': 'Nomor',
    'tickets.subject': 'Subjek',
    'tickets.requester': 'Pemohon',
    'tickets.message': 'Pesan',
    'tickets.priority': 'Prioritas',
    'tickets.status': 'Status',
    'tickets.assignee': 'Petugas',
    'tickets.kpi_total': 'Total tiket',
    'tickets.kpi_new': 'Baru',
    'tickets.kpi_open': 'Dibuka',
    'tickets.kpi_done': 'Selesai',
} as const satisfies ModuleDictionary<'tickets'>;

declare module '@admin-core/lib/i18n' {
    interface Dictionaries {
        tickets: typeof id;
    }
}
