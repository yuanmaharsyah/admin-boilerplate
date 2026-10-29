import type { ModuleDictionary } from '@admin-core/lib/i18n';

/* Strings of the Customer module; every key starts with `customers.`. `en.ts` must have exactly the same keys. */
export const id = {
    'customers.title': 'Pelanggan',
    'customers.description': 'Pelanggan yang ditagih lewat invoice.',
    'customers.list': 'Daftar pelanggan',
    'customers.item': 'pelanggan',
    'customers.search': 'Cari nama atau kota…',
    'customers.empty_title': 'Belum ada pelanggan',
    'customers.delete_title': 'Hapus pelanggan',
    'customers.name': 'Nama',
    'customers.city': 'Kota',
    'customers.no_hp': 'No. HP',
} as const satisfies ModuleDictionary<'customers'>;

declare module '@admin-core/lib/i18n' {
    interface Dictionaries {
        customers: typeof id;
    }
}
