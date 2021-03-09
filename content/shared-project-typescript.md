---
title: Составные проекты на TypeScript
emoji: 👾
created: 2021-01-17
modified: 2021-01-17
tags:
  - TypeScript
---

В больших проектах на TypeScript часто возникает необходимость отделять общий код от основного проекта.  
Сделать это можно например с помощью [Project References](https://www.typescriptlang.org/docs/handbook/project-references.html).

Рабочий пример можно посмотреть на [github](https://github.com/pkolt/example_typescript_project_references).

Например в нашем проекте мы будем использовать такую структуру папок:

```
|- shared (общий код между проектами)
|- server (бекенд)
|- client (фронтенд)
```

## Shared-проект
### Настройка TypeScript в shared-проекте

tsconfig.json

```json
{
  "compilerOptions": {
    // ...
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "composite": true
  }
}
```

### Общий код в shared-проекте

```typescript
// shared/src/index.ts
export const HOST = "localhost";
export const PORT = 3000;
```

## Server-проект

### Настройка TypeScript в server-проекте

tsconfig.json

```json
{
  "compilerOptions": {
    // ...
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "references": [
    {
      "path": "../shared"
    }
  ]
}
```

### Подключение общего кода код в server-проекте

```typescript
// server/src/app.ts
import { HOST, PORT } from '../../shared/dist';

console.log(`${HOST}:${PORT}`);
```

### Компиляция и запуск server-проекта

Компиляция server-проекта (добавляем флаг `-b` для сборки связанного проекта):

```bash
npx tsc -b
```

Запуск server-проекта:

```bash
node dist/app.js
```

## Решение проблемы с путями (ссылка на shared-проект)

Импорт в server-проекте выглядит не очень красиво (`import { HOST, PORT } from '../../shared/dist'`).

Для решения этой проблемы создадим промежуточный модуль `shared.ts`:

```typescript
// server/src/shared.ts
export * from '../../shared/dist';
```

Теперь в основном модуле можно использовать более короткий путь для импорта:

```typescript
// server/src/app.ts
import { HOST, PORT } from './shared';

console.log(`${HOST}:${PORT}`);
```