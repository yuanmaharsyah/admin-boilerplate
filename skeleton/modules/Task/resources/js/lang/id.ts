import type { ModuleDictionary } from '@admin-core/lib/i18n';

/* Strings of the Task module; every key starts with `kanban.`. `en.ts` must have exactly the same keys. */
export const id = {
    'kanban.title': 'Judul',
    'kanban.description': 'Deskripsi',
    'kanban.list': 'Daftar tugas',
    'kanban.item': 'tugas',
    'kanban.search': 'Cari judul atau penanggung jawab…',
    'kanban.empty_title': 'Belum ada tugas',
    'kanban.empty_text': 'Tugas yang dibuat akan muncul di sini.',
    'kanban.delete_title': 'Hapus tugas',
    'kanban.create_title': 'Tambah tugas',
    'kanban.edit_title': 'Edit {name}',
    'kanban.section_main': 'Tugas',
    'kanban.section_files': 'Berkas',
    'kanban.yes': 'Ya',
    'kanban.no': 'Tidak',
    'kanban.status': 'Status',
    'kanban.priority': 'Prioritas',
    'kanban.assignee': 'Penanggung jawab',
    'kanban.due_on': 'Tenggat',
    'kanban.position': 'Urutan',
    'kanban.board': 'Papan tugas',
    'kanban.board_text': 'Geser kartu antar kolom untuk mengubah statusnya.',
    'kanban.add': 'Tambah tugas',
} as const satisfies ModuleDictionary<'kanban'>;

declare module '@admin-core/lib/i18n' {
    interface Dictionaries {
        kanban: typeof id;
    }
}
