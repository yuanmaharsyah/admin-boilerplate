import { registerMessages } from '@admin-core/lib/i18n';
import { resolvePage } from '@admin-core/lib/resolve-page';
import { createInertiaApp } from '@inertiajs/react';
import type { ComponentType } from 'react';
import { Toaster } from '@admin-core/components/admin/Toaster';
import { TooltipProvider } from '@admin-core/components/ui/tooltip';
import { initializeTheme } from '@admin-core/hooks/useAppearance';
import AdminLayout from '@/layouts/admin-layout';
import { AuthLayout } from '@admin-core/layouts/AuthLayout';

// The app name from Settings → Umum (the root view's meta), for page titles.
const appName =
    document.querySelector<HTMLMetaElement>('meta[name="application-name"]')
        ?.content || import.meta.env.VITE_APP_NAME;

const pages = import.meta.glob<{ default: ComponentType }>([
    './pages/**/*.tsx',
    '../../modules/*/resources/js/pages/**/*.tsx',
    '../../vendor/yuanmaharsyah/admin-core/modules/*/resources/js/pages/**/*.tsx',
    '../../vendor/yuanmaharsyah/admin-core/resources/js/pages/**/*.tsx',
]);

// Module dictionaries (`resources/js/lang/{locale}.ts`) join the core ones in t().
registerMessages(
    import.meta.glob<Record<string, Record<string, string>>>(
        [
            '../../modules/*/resources/js/lang/*.ts',
            '../../vendor/yuanmaharsyah/admin-core/modules/*/resources/js/lang/*.ts',
        ],
        { eager: true },
    ),
);

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => resolvePage(name, pages),
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return null;
            case name.startsWith('Core::Auth/') ||
                name.startsWith('Core::Errors/'):
                return AuthLayout;
            default:
                return AdminLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: 'var(--primary)',
    },
});

// This will set light / dark mode on load...
initializeTheme();
