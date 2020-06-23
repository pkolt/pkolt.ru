---
title: Полезные Node.js модули
tags:
  - JavaScript
  - Node.js
emoji: ✍
---

## npkill

Модуль, который помогает очистить диск от ненужных папок `node_modules`.

```bash
npm install -g npkill
```

## npm-check-updates

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