---
title: Ошибка TypeScript "This expression is not constructable"
emoji: 🤔
created: 2020-08-08
modified: 2020-08-08
tags:
  - TypeScript
---

Иногда в TypeScript можно словить ошибку "This expression is not constructable", например:

```typescript
class Foo {}

function factory<T>(cls: T): T {
    return new cls(); // This expression is not constructable.
}

const foo = factory(Foo);
```

Смысл этой ошибки в том что TypeScript не может распознать, что мы передаем в качестве аргумента функцию-конструктор. 
Можно явно указать, что передаваемое нами значение является функцией-конструктором.

```typescript
class Foo {}

type Constructable<T = any> = new (...args: any[]) => T;

function factory<T>(cls: Constructable<T>): T {
    return new cls();
}

const foo = factory(Foo);
```