---
layout: src/layouts/BlogLayout.astro
title: Настройка ESLint 9
created: 2024-12-10
modified: 2024-12-10
seo_description: Рассмотрим как настроить ESLint 9 для проекта
seo_tags:
  - ESLint 9
  - Frontend
tags:
  - Frontend
---

ESLint — достаточно популярный инструмент для проверки кода на соответствие установленным правилам.

Он помогает избежать многих распространённых ошибок, например, когда вы объявляете один компонент React прямо внутри другого или когда забываете указать используемую в `useEffect` переменную в зависимостях эффекта.

Для ESLint написано множество плагинов. Самые известные из них:

- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)

Всё это замечательно работало в ESLint 8, очень помогало избегать глупых ошибок и поддерживать код проекта в соответствии с установленными правилами.

Но тут появился ESLint 9.

## ESLint 9

Самое неприятное в разработке — это когда ваш любимый инструмент меняет API.

Мы уже сталкивались с подобным в случае с `react-router-dom`, авторы которого любят менять API, заставляя разработчиков долго объяснять менеджерам сомнительную выгоду от перехода на новую версию. Кстати, привет вам от `react-router-dom@7.0.0`!

Вернёмся к ESLint. Как вы, наверное, догадываетесь, его автор [Nicholas C. Zakas](https://github.com/nzakas) тоже решил добавить нам работы и ввёл совершенно новый способ настройки — плоскую конфигурацию (flat configuration). Если раньше конфигурация ESLint представляла собой JS-объект, то в новой версии это массив объектов. Старая конфигурация теперь считается устаревшей (deprecated).

1. Авторам плагинов для ESLint пришлось адаптировать их к новой версии. А некоторые не очень популярные плагины, увы, так и не поддерживают ESLint 9.
2. Новый способ настройки оказался настолько запутанным, что некоторые пользователи, потратив значительное время на миграцию, решили остаться на ESLint 8.

К концу 2024 года многие плагины наконец-то добавили поддержку ESLint 9.

К сожалению, некоторые полезные плагины, например, `eslint-plugin-react-hooks`, до сих пор не до конца поддерживают плоскую настройку в ESLint 9 и настраиваются немного сложнее остальных.

## Настройка ESLint 9

Приведу пример работающего файла конфигурации ESLint 9:

```ts
// eslint.config.js
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginHooks from 'eslint-plugin-react-hooks';
import pluginRefresh from 'eslint-plugin-react-refresh';
import pluginImport from 'eslint-plugin-import';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['dist', 'coverage'] }, // Этот должно быть здесь в отдельном объекте, чтобы применяться глобально
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
  pluginRefresh.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginImport.flatConfigs.recommended,
  pluginImport.flatConfigs.typescript,
  ...tseslint.configs.recommended,
  {
    plugins: {
      'react-hooks': pluginHooks,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      ...pluginHooks.configs.recommended.rules,
    },
  },
];
```

Для запуска ESLint можно вызвать команду `npx eslint .` или добавить параметры запуска в раздел `scripts` файла `package.json`.

Точка означает, что ESLint будет анализировать файлы, начиная с текущей директории. Если вам нужно искать ошибки только в папке `src`, то команда будет выглядеть как `npx eslint src`.

## Итоги перехода на ESLint 9

Из плюсов новой версии можно отметить то, что теперь ESLint поддерживает отдельную настройку для разных типов файлов. Это добавляет новые возможности более гибкой настройки.

Из минусов можно отметить сложный и неочевидный способ настройки (например, секция `ignores`), который оттолкнул некоторое количество пользователей от новой версии. Большие изменения в ESLint 9 привели к плохой поддержке существующих плагинов.
