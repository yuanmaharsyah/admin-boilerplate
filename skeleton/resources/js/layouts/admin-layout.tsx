import { AdminLayout } from '@admin-core/layouts/AdminLayout';
import type { ReactNode } from 'react';
import { logout } from '@/routes';
import { index as downloads } from '@/routes/account/downloads';
import { edit as editPassword } from '@/routes/account/password';
import { edit as editProfile } from '@/routes/account/profile';

/** The core shell with this project's routes for the user links. */
export default function ProjectAdminLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <AdminLayout
            links={{
                profile: editProfile(),
                changePassword: editPassword(),
                logout: logout(),
                downloads: downloads(),
            }}
        >
            {children}
        </AdminLayout>
    );
}
