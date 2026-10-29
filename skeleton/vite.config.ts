import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

// The package's frontend; a symlink to packages/admin-core in the monorepo.
const adminCore = fileURLToPath(
    new URL('./vendor/yuanmaharsyah/admin-core/resources/js', import.meta.url),
);

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        // No server-side rendering: an admin behind a login renders in the
        // browser (in dev the plugin would otherwise try SSR and log errors).
        inertia({ ssr: false }),
        react(),
        babel({
            presets: [reactCompilerPreset()],
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    resolve: {
        // In the monorepo vendor/yuanmaharsyah/admin-core is a symlink to packages/admin-core;
        // keep the vendor path so the package's imports resolve from this project's
        // node_modules, as they do in a real project.
        preserveSymlinks: true,
        alias: {
            '@admin-core': adminCore,
        },
    },
    server: {
        fs: {
            allow: [
                searchForWorkspaceRoot(process.cwd()),
                realpathSync(adminCore),
            ],
        },
        watch: {
            ignored: [
                '**/.agents/**',
                '**/.claude/**',
                '**/.cursor/**',
                '**/.junie/**',
                '**/vendor/**',
            ],
        },
    },
});
