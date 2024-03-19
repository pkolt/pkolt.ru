---
layout: src/layouts/BlogLayout.astro
title: Задачи по TypeScript (часть 1)
created: 2024-08-19
modified: 2024-08-19
seo_description: Решаем задачи по TypeScript (часть 1)
seo_tags:
  - TypeScript
tags:
  - TypeScript
---

Задания взяты из [TypeScript Challenges](https://github.com/type-challenges/type-challenges).

## Pick

Реализуйте дженерик `Pick<T, K>`.

Конструирует тип, выбирая набор свойств `K` из `T`.

```typescript
type MyPick<T, K extends keyof T> = { [k in K]: T[k] };

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};
```

## Readonly

Реализуйте дженерик `Readonly<T>`.

Создает тип, в котором все свойства `T` установлены только для чтения, что означает, что свойства созданного типа не могут быть переназначены.

```typescript
type MyReadonly<T> = { readonly [k in keyof T]: T[k] };

interface Todo {
  title: string;
  description: string;
}

const todo: MyReadonly<Todo> = {
  title: 'Hey',
  description: 'foobar',
};

todo.title = 'Hello'; // Error: cannot reassign a readonly property
todo.description = 'barFoo'; // Error: cannot reassign a readonly property
```

## Tuple to Object

Полученный массив, преобразуйте в объект, в котором ключ/значение должно находиться в предоставленном массиве.

```typescript
type TupleToObject<T extends readonly PropertyKey[]> = { [k in T[number]]: k };

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;

type result = TupleToObject<typeof tuple>; // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

Тип `PropertyKey` это тип состоящий из `string | number | symbol`.

## First of Array

Реализуйте дженерик `First<T>`, который принимает массив `T` и возвращает тип его первого элемента.

```typescript
type First<T extends any[]> = T extends [] ? never : T[0];

type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];

type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>; // expected to be 3
```

## Length of Tuple

Реализуйте дженерик `Length<T>`, принимающий кортеж `T` и возвращающий его длину.

```typescript
type Length<T extends readonly any[]> = T['length'];

type tesla = ['tesla', 'model 3', 'model X', 'model Y'];
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'];

type teslaLength = Length<tesla>; // expected 4
type spaceXLength = Length<spaceX>; // expected 5
```

## Exclude

Реализуйте дженерик `Exclude<T, U>`.  
Исключает из `T` те типы, которые назначены `U`.

```typescript
type MyExclude<T, U> = T extends U ? never : T;

type Result = MyExclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'
```

## Awaited

Если у нас есть тип, который является обернутым типом, например `Promise`, как мы можем получить тип, который находится внутри обернутого типа?

```typescript
type MyAwaited<T extends PromiseLike<any>> =
  T extends PromiseLike<infer U> ? (U extends PromiseLike<any> ? MyAwaited<U> : U) : never;

type ExampleType = Promise<string>;

type Result = MyAwaited<ExampleType>; // string
```

## If

Реализуйте тип утилиты `If<C, T, F>`, который принимает условие `C`, истинное значение `T` и ложное значение `F`.  
Ожидается, что `C` будет либо истинным, либо ложным, тогда как `T` и `F` могут быть любого типа.

```typescript
type If<C extends boolean, T, F> = C extends true ? T : F;

type A = If<true, 'a', 'b'>; // expected to be 'a'
type B = If<false, 'a', 'b'>; // expected to be 'b'
```

## Concat

Реализуйте функцию JavaScript `Array.concat` в системе типов. Тип принимает два аргумента. Выходными данными должен быть новый массив, включающий входные данные в порядке ltr.

```typescript
type Tuple = readonly unknown[];
type Concat<T extends Tuple, U extends Tuple> = [...T, ...U];

type Result = Concat<[1], [2]>; // expected to be [1, 2]
```

## Includes

Реализуйте функцию JavaScript `Array.includes` в системе типов. Тип принимает два аргумента. Выходные данные должны быть логическими значениями `true` или `false`.

```typescript
type Tuple = readonly unknown[];
type Includes<T extends Tuple, U> = { [k in T[number]]: true }[U] extends true ? true : false;

type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>; // expected to be `false`
```

## Push

Реализуйте функцию JavaScript `Array.push`.

```typescript
type Push<T extends any[], U> = [...T, U];

type Result = Push<[1, 2], '3'>; // [1, 2, '3']
```

## Unshift

Реализуйте функцию JavaScript `Array.unshift`.

```typescript
type Unshift<T extends any[], U> = [U, ...T];

type Result = Unshift<[1, 2], 0>; // [0, 1, 2,]
```

## Parameters

Реализуйте дженерик `Parameters<T>`.

```typescript
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer U) => any ? U : never;

type FunctionParamsType = MyParameters<typeof foo>; // [arg1: string, arg2: number]
```
