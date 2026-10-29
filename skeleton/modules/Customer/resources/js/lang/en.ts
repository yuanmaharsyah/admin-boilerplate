import type { id } from './id';

/* English fallback; tsc fails on a missing or an extra key. */
export const en: Record<keyof typeof id, string> = {
    'customers.title': 'Customers',
    'customers.description': 'Customers billed through invoices.',
    'customers.list': 'Customer list',
    'customers.item': 'customers',
    'customers.search': 'Search name or city…',
    'customers.empty_title': 'No customers yet',
    'customers.delete_title': 'Delete customer',
    'customers.name': 'Name',
    'customers.city': 'City',
    'customers.no_hp': 'Phone',
};
