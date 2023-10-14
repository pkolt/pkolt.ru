---
layout: src/layouts/BlogLayout.astro
title: Полезные Node.js модули
created: 2020-06-23
modified: 2020-06-23
seo_description: Мой список полезных NPM-модулей
seo_tags:
  - JavaScript
  - Node.js
  - NPM
tags:
  - JavaScript
  - Node.js
---

## [npkill](https://www.npmjs.com/package/npkill)

Помогает очистить диск от ненужных папок `node_modules`.

```bash
npm install -g npkill
```

## [npm-check-updates](https://www.npmjs.com/package/npm-check-updates)

Помогает интерактивно обновлять модули в `package.json`.

```bash
npm install -g npm-check-updates
```

Просмотреть какие пакеты нуждаются в обновлении:

```bash
ncu
```

Выборочно обновить пакеты до последних версий:

```bash
ncu -i
```

Обновить все пакеты до последних версий:

```bash
ncu -u
```

## [depcheck](https://www.npmjs.com/package/depcheck)

Показывает какие npm-модули из `package.json` не используются.

```bash
npm install -g depcheck
```

Показать какие npm-модули не используются:

```bash
depcheck
```

## [rimraf](https://www.npmjs.com/package/rimraf)

Рекурсивно удаляет папки/файлы.

```bash
npm install -g rimraf
```

Удалить каталог вместе с содержимым:

```bash
rimraf build
```
