import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import typescript from 'typescript-eslint';

export default typescript.config(
    {
        ignores: [
            'vendor',
            'node_modules',
            'public',
            'bootstrap/ssr',
            'resources/js/actions',
            'resources/js/routes',
            'resources/js/wayfinder',
            'resources/js/types/generated.d.ts',
            'resources/js/components/ui/*',
        ],
    },
    js.configs.recommended,
    ...typescript.configs.recommended,
    reactHooks.configs.flat.recommended,
    {
        languageOptions: {
            globals: { ...globals.browser },
        },
    },
    {
        // Module augmentations must repeat the original type parameters even when unused.
        files: ['**/*.d.ts'],
        rules: { '@typescript-eslint/no-unused-vars': 'off' },
    },
    prettier,
);
