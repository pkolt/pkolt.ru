---
layout: src/layouts/BlogLayout.astro
title: Задачи по TypeScript (часть 2)
created: 2024-08-21
modified: 2024-08-21
seo_description: Решаем задачи по TypeScript (часть 2)
seo_tags:
  - TypeScript
tags:
  - TypeScript
---

Задания взяты из [TypeScript Challenges](https://github.com/type-challenges/type-challenges).

## Get Return Type

Реализуйте дженерик `ReturnType<T>`.

```typescript
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type a = MyReturnType<typeof fn>; // should be "1 | 2"
```

## Omit

Реализуйте дженерик `Omit<T, K>`.

Создает тип, выбирая все свойства из `T` и затем удаляя `K`.

```typescript
type MyOmit<T, K extends keyof T> = { [P in keyof T as P extends K ? never : P]: T[P] };

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>;

const todo: TodoPreview = {
  completed: false,
};
```

## Readonly

Реализуйте дженерик `MyReadonly<T, K>`.

`K` указывает набор свойств `T`, для которых должно быть установлено значение "только для чтения". Если `K` не указан, все свойства должны быть доступны только для чтения.

```typescript
type MyReadonly<T, K extends keyof T = keyof T> = Omit<T, K> & { readonly [P in K]: T[P] };

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

const todo: MyReadonly<Todo, 'title' | 'description'> = {
  title: 'Hey',
  description: 'foobar',
  completed: false,
};

todo.title = 'Hello'; // Error: cannot reassign a readonly property
todo.description = 'barFoo'; // Error: cannot reassign a readonly property
todo.completed = true; // OK
```

## Deep Readonly

Реализуйте дженерик `DeepReadonly<T>` которые делает каждый объект (и его подобъекты рекурсивно) доступным только для чтения.

Не нужно обрабатывать случаи с массивами, функциями, классами и т. д.

```typescript
type DeepReadonly<T> = { readonly [P in keyof T]: keyof T[P] extends never ? T[P] : DeepReadonly<T[P]> };

type X = {
  x: {
    a: 1;
    b: 'hi';
  };
  y: 'hey';
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: 'hi';
  };
  readonly y: 'hey';
};

type Todo = DeepReadonly<X>; // should be same as `Expected`
```

## Tuple to Union

Реализуйте дженерик `TupleToUnion<T>`, который берет значения в кортеже и возвращает объединение его значений.

```typescript
type TupleToUnion<T extends any[]> = T[number];

type Arr = ['1', '2', '3'];

type Test = TupleToUnion<Arr>; // expected to be '1' | '2' | '3'
```

## Chainable Options

Цепочка вызовов обычно используются в Javascript. Но когда мы перейдем на TypeScript, сможете ли вы его правильно напечатать?

В этом задании вам нужно ввести объект или класс — что угодно — чтобы предоставить два варианта `option(key, value)` и `get()`. В `option` вы можете расширить текущий тип конфигурации с помощью заданного ключа и значения. Нам нужно получить доступ к окончательному результату через `get`.

Вам не нужно писать какую-либо логику js/ts для решения проблемы — просто на уровне типа.

Условимся что `key` принимает только `string`, а `value` может быть любым. Один и тот же `key` не будет передан дважды.

```typescript
type Chainable<T = {}> = {
  option<K extends string, V>(key: K extends keyof T ? never : K, value: V): Chainable<Omit<T, K> & Record<K, V>>;
  get(): T;
};

declare const config: Chainable;

const result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get();

// expect the type of result to be:
interface Result {
  foo: number;
  name: string;
  bar: {
    value: string;
  };
}
```

## Last of Array

Реализуйте дженерик `Last<T>` который получает массив `T` и возвращает его последний элемент.

```typescript
type Last<T extends unknown[]> = [unknown, ...T][T['length']];

type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];

type tail1 = Last<arr1>; // expected to be 'c'
type tail2 = Last<arr2>; // expected to be 1
```

## Pop

Реализуйте дженерик `Pop<T>`, который принимает массив `T` и возвращает массив без последнего элемента.

```typescript
type Pop<T> = T extends [...infer R, unknown] ? R : T;

type arr1 = ['a', 'b', 'c', 'd'];
type arr2 = [3, 2, 1];

type re1 = Pop<arr1>; // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2>; // expected to be [3, 2]
```

## Promise.all

Добавьте типы к функции `PromiseAll`, которая принимает массив объектов `PromiseLike`. Возвращаемое значение должно быть `Promise<T>`, где `T` — массив результатов.

```typescript
declare function PromiseAll<T extends any[]>(
  values: readonly [...T],
): Promise<{ [P in keyof T]: T[P] extends Promise<infer R> | infer R ? R : never }>;

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// expected to be `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const);
```

## Type Lookup

Иногда вам может понадобиться найти тип в объединении по его атрибутам.

В этой задаче мы хотели бы получить соответствующий тип, выполнив поиск поля общего типа в объединении `Cat | Dog`. Другими словами, мы ожидаем получить `Dog` для `LookUp<Dog | Cat, 'dog'>` и `Cat` для `LookUp<Dog | Cat, 'cat'>` в следующем примере:

```typescript
type LookUp<U, T> = U extends { type: T } ? U : never;

interface Cat {
  type: 'cat';
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal';
}

interface Dog {
  type: 'dog';
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
  color: 'brown' | 'white' | 'black';
}

type MyDogType = LookUp<Cat | Dog, 'dog'>; // expected to be `Dog`
```

## Trim Left

Реализуйте дженерик `TrimLeft<T>`, который уделяет пробелы из начала строки.

```typescript
type Space = ' ' | '\n' | '\t'; // Пробельные символы
type TrimLeft<T extends string> = T extends `${Space}${infer R}` ? TrimLeft<R> : T;

type trimed = TrimLeft<'  Hello World  '>; // expected to be 'Hello World  '
```

## Trim

Реализуйте дженерик `Trim<T>`, который удаляет пробелы с обоих концов строки.

```typescript
type Space = ' ' | '\n' | '\t'; // Пробельные символы
type Trim<T extends string> = T extends `${Space}${infer R}` | `${infer R}${Space}` ? Trim<R> : T;

type trimmed = Trim<'  Hello World  '>; // expected to be 'Hello World'
```

## Capitalize

Реализуйте дженерик `Capitalize<T>`, который преобразует первую букву строки в верхний регистр, а остальную часть строки оставляет как есть.

```typescript
// F - это первый символ исходной строки, S - остальная часть строки.
type Capitalize<T extends string> = T extends `${infer F}${infer S}` ? `${Uppercase<F>}${S}` : T;

type capitalized = Capitalize<'hello world'>; // expected to be 'Hello world'
```

## Replace

Реализуйте дженерик `Replace<S, From, To>`, который заменяет строку `From` на `To` один раз в заданной строке `S`.

```typescript
type Replace<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer L}${From}${infer R}`
    ? `${L}${To}${R}`
    : S;

type replaced = Replace<'types are fun!', 'fun', 'awesome'>; // expected to be 'types are awesome!'
```

## ReplaceAll

Реализуйте дженерик `ReplaceAll<S, From, To>` который заменяет все подстроки `From` на `To` в строке `S`.

```typescript
type ReplaceAll<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer L}${From}${infer R}`
    ? `${L}${To}${ReplaceAll<R, From, To>}`
    : S;

type replaced = ReplaceAll<'t y p e s', ' ', ''>; // expected to be 'types'
```

## Append Argument

Для заданного типа функции `Fn` и любого типа `A` (любой в этом контексте означает, что мы не ограничиваем тип, и я не имею в виду какой-либо тип 😉) создайте общий тип, который будет принимать `Fn` в качестве первого аргумента, `A` в качестве второго и создаст функцию типа `G`, которая будет такой же, как `Fn`, но с добавленным аргументом `A` в качестве последнего.

```typescript
type AppendArgument<Fn extends Function, A> = Fn extends (...args: infer Args) => infer Res
  ? (...args: [...Args, A]) => Res
  : never;

type Fn = (a: number, b: string) => number;

type Result = AppendArgument<Fn, boolean>;
// expected be (a: number, b: string, x: boolean) => number
```

## Permutation

Реализуйте тип перестановки, который преобразует типы объединений в массив, включающий перестановки объединений.

```typescript
type Permutation<T, K = T> = [T] extends [never] ? [] : K extends K ? [K, ...Permutation<Exclude<T, K>>] : never;

type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
```

## Length of String

Вычислите длину строкового литерала, который ведет себя как `String#length`.

```typescript
type LengthOfString<S extends string, T extends string[] = []> = S extends `${infer F}${infer R}`
  ? LengthOfString<R, [...T, F]>
  : T['length'];

type len = LengthOfString<'typescript'>; // 10
```

## Flatten

В этой задаче вам нужно будет написать тип, который принимает массив и генерирует тип сглаживания массива (аналогично методу `Array#flat`).

```typescript
type Flatten<S extends unknown[], T extends unknown[] = []> = S extends [infer X, ...infer Y]
  ? X extends unknown[]
    ? Flatten<[...X, ...Y], T>
    : Flatten<[...Y], [...T, X]>
  : T;

type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, 5]
```

## Append to object

Реализуйте тип, который добавляет новое поле в интерфейс. Тип принимает три аргумента. Выходными данными должен быть объект с новым полем.

```typescript
type AppendToObject<T, U extends PropertyKey, V> = { [K in keyof T | U]: K extends keyof T ? T[K] : V };

type Test = { id: '1' };
type Result = AppendToObject<Test, 'value', 4>; // expected to be { id: '1', value: 4 }
```

## Absolute

Реализуйте тип `Absolute`. Тип, принимающий строку, число или bigint. Выходные данные должны быть строкой положительных чисел.

```typescript
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer U}` ? U : `${T}`;

type Test = -100;
type Result = Absolute<Test>; // expected to be "100"
```

## String to Union

Реализуйте тип `StringToUnion<T>` принимающий строковый аргумент. Выходные данные должны представлять собой объединение входных букв.

```typescript
type StringToUnion<T extends string> = T extends `${infer Letter}${infer Rest}` ? Letter | StringToUnion<Rest> : never;

type Test = '123';
type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"
```

## Merge

Объедините два типа в новый тип. Ключи второго типа переопределяют ключи первого типа.

```typescript
type Merge<F, S> = { [K in keyof F | keyof S]: K extends keyof S ? S[K] : K extends keyof F ? F[K] : never };

type foo = {
  name: string;
  age: string;
};
type coo = {
  age: number;
  sex: string;
};

type Result = Merge<foo, coo>; // expected to be {name: string, age: number, sex: string}
```

## KebabCase

Замените `camelCase` или `PascalCase` строку на `kebab-case`.

```typescript
type KebabCase<S> = S extends `${infer S1}${infer S2}`
  ? S2 extends Uncapitalize<S2>
    ? `${Uncapitalize<S1>}${KebabCase<S2>}`
    : `${Uncapitalize<S1>}-${KebabCase<S2>}`
  : S;

type FooBarBaz = KebabCase<'FooBarBaz'>;
const foobarbaz: FooBarBaz = 'foo-bar-baz';

type DoNothing = KebabCase<'do-nothing'>;
const doNothing: DoNothing = 'do-nothing';
```

## Diff

Создайте `Object` который представляет собой разницу между `O` и `O1`

```typescript
type Diff<O, O1> = {
  [K in keyof (O & O1) as K extends keyof (O | O1) ? never : K]: (O & O1)[K];
};

type Foo = {
  name: string;
  age: string;
};

type Bar = {
  name: string;
  age: string;
  gender: number;
};

type Result = Diff<Foo, Bar>; // { gender: number }
```

## AnyOf

Реализуйте Python функцию `any(iterable)` в системе типов. Тип принимает массив и возвращает значение `true`, если какой-либо элемент массива имеет значение `true`. Если массив пуст, верните `false`.

```typescript
type Falsy = 0 | '' | false | [] | undefined | null | { [key: PropertyKey]: never };
type AnyOf<T extends any[]> = T[number] extends Falsy ? false : true;

type Sample1 = AnyOf<[1, '', false, [], {}]>; // expected to be true.
type Sample2 = AnyOf<[0, '', false, [], {}]>; // expected to be false.
```
