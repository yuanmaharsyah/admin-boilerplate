import type { ModuleDictionary } from '@admin-core/lib/i18n';

/* Strings of the Invoice module; every key starts with `invoices.`. `en.ts` must have exactly the same keys. */
export const id = {
    'invoices.title': 'Invoice',
    'invoices.description': 'Tagihan kepada pelanggan.',
    'invoices.list': 'Daftar invoice',
    'invoices.item': 'invoice',
    'invoices.search': 'Cari nomor atau catatan…',
    'invoices.empty_title': 'Belum ada invoice',
    'invoices.empty_text': 'Invoice yang dibuat akan muncul di sini.',
    'invoices.delete_title': 'Hapus invoice',
    'invoices.create_title': 'Tambah invoice',
    'invoices.edit_title': 'Edit {number}',
    'invoices.section_main': 'Tagihan',
    'invoices.section_payment': 'Pembayaran',
    'invoices.section_files': 'Berkas',
    'invoices.number': 'Nomor',
    'invoices.customer': 'Pelanggan',
    'invoices.customer_placeholder': 'Cari pelanggan…',
    'invoices.issued_on': 'Tanggal',
    'invoices.due_at': 'Jatuh tempo',
    'invoices.status': 'Status',
    'invoices.payment_method': 'Cara bayar',
    'invoices.total': 'Total',
    'invoices.tax_rate': 'PPN (%)',
    'invoices.send_reminder': 'Kirim pengingat sebelum jatuh tempo',
    'invoices.npwp': 'NPWP',
    'invoices.npwp_help': '15 atau 16 digit, tanpa titik.',
    'invoices.notes': 'Catatan',
    'invoices.yes': 'Ya',
    'invoices.no': 'Tidak',
} as const satisfies ModuleDictionary<'invoices'>;

declare module '@admin-core/lib/i18n' {
    interface Dictionaries {
        invoices: typeof id;
    }
}
