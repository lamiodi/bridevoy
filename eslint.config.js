import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
    { ignores: ['dist/**', 'node_modules/**', 'public/**', 'scripts/**'] },
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
        settings: { react: { version: '18.2' } },
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,
            ...reactPlugin.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,
            'react/jsx-no-target-blank': 'off',
            'react/prop-types': 'off',
            'react/no-unknown-property': 'off',
            'react-refresh/only-export-components': 'off',
            // Restore-from-storage is a legitimate setState-in-effect pattern.
            'react-hooks/set-state-in-effect': 'off',
            // We don't use React Compiler; the v6 purity/memo rules add noise.
            'react-hooks/purity': 'off',
            'react-hooks/preserve-manual-memoization': 'off',
            'react-hooks/refs': 'off',
            'react-hooks/component-hook-factories': 'off',
            'react-hooks/error-boundaries': 'off',
            'react-hooks/immutability': 'off',
            'react-hooks/set-state-in-render': 'off',
            'react-hooks/static-components': 'off',
            // Closures that reference later-defined functions fire after init.
            'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        },
    },
];
