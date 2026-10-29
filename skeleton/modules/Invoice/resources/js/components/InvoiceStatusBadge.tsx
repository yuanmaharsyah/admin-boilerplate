import { StatusBadge } from '@admin-core/components/admin/StatusBadge';
import type { StatusTone } from '@admin-core/components/admin/StatusBadge';

const TONES: Record<Modules.Invoice.Enums.InvoiceStatus, StatusTone> = {
    draft: 'neutral',
    sent: 'info',
    paid: 'success',
    void: 'destructive',
};

export function InvoiceStatusBadge({
    status,
    label,
}: {
    status: Modules.Invoice.Enums.InvoiceStatus;
    label: string;
}) {
    return <StatusBadge label={label} tone={TONES[status]} />;
}
