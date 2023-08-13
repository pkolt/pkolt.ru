/* eslint-env node */
module.exports = {
  extends: [
    'plugin:astro/recommended',
    'airbnb-typescript',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['prettier', 'testing-library', '@typescript-eslint', 'import', 'jsx-a11y'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: [],
  rules: {
    'import/extensions': 0,
  },
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ['*.astro'],
      // Allows Astro components to be parsed.
      parser: 'astro-eslint-parser',
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
        'react/no-unknown-property': 0,
        'react/jsx-filename-extension': 0,
      },
    },
  ],
};
