import type { InertiaLinkProps } from '@inertiajs/react';

export { cn } from '@admin-core/lib/utils';

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}
