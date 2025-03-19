import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import * as pluginHooks from 'eslint-plugin-react-hooks';
import pluginRefresh from 'eslint-plugin-react-refresh';
import pluginImport from 'eslint-plugin-import';
import pluginReactCompiler from 'eslint-plugin-react-compiler';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['build', '.react-router'] }, // It's mad: https://github.com/eslint/eslint/issues/19093
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
      // https://github.com/import-js/eslint-import-resolver-typescript#configuration
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  pluginRefresh.configs.vite,
  pluginReact.configs.flat.recommended,
  pluginImport.flatConfigs.recommended,
  pluginImport.flatConfigs.typescript,
  ...tseslint.configs.recommended,
  pluginHooks.configs['recommended-latest'],
  pluginReactCompiler.configs.recommended,
  {
    rules: {
      'react-compiler/react-compiler': 'error',
      'react/react-in-jsx-scope': 'off',
      'react-refresh/only-export-components': [
        'error',
        {
          allowConstantExport: true,
          allowExportNames: ['meta', 'links', 'headers', 'loader', 'action'],
        },
      ],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'react/prop-types': 'off',
      'object-shorthand': ['error', 'properties'],
      'import/no-named-as-default-member': 'off',
      ...pluginHooks.configs.recommended.rules,
    },
  },
];
