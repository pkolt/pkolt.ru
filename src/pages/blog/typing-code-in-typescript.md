---
layout: src/layouts/BlogLayout.astro
title: Типизации кода в TypeScript
created: 2023-08-27
modified: 2023-08-27
tags:
  - TypeScript
---

Рассмотрим примеры интересных приемов типизации кода в TypeScript.

## Вывести типы ключей и значений из enum

Представим что у нас есть enum:

```typescript
enum Drink {
  Bear = 'bear',
  Lemonade = 'lemonade',
  Water = 'water',
}
```

Вывести из него типы ключей и значений можно так:

```typescript
type DrinkKey = keyof typeof Drink; // "Bear" | "Lemonade" | "Water"

type DrinkValue = `${Drink}`; // "bear" | "lemonade" | "water"

const drinkPrices: Record<DrinkValue, number> = {
  bear: 100,
  lemonade: 30,
  water: 200,
};
```

## Типизировать единицы измерений

Иногда полезно типизировать единицы измерения в константных значениях:

```typescript
const sizes: Record<string, `${number}px`> = {
  small: '470px',
  medium: '800px',
  large: '1200px',
};
```

## Сделать свойства обязательными

Рассмотрим оператор `-?` для установки свойств как обязательных:

```typescript
interface Props {
  visible?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

type RequiredProps = { [k in keyof Props]-?: Props[k] };

// или более простой вариант
type RequiredProps = Required<Props>;
```

## Использование оператора satisfies

Иногда мы используем перечисление нескольких возможных типов. Но при обращении к значению - TypeScript не понимает какой тип используется в конкретном варианте, что вызывает ошибки:

```typescript
interface Box {
  name: string;
  color: number | string;
}

const box: Box = { name: 'Gift', color: 'red' };

box.color.toUpperCase(); // Error: Property 'toUpperCase' does not exist on type 'string | number'.
```

Мы можем обойти эту ошибку используя оператор `satisfies`, который появился в [TypeScript 4.9](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator):

```typescript
interface Box {
  name: string;
  color: number | string;
}

const box = { name: 'Gift', color: 'red' } satisfies Box;

box.color.toUpperCase();
```

## Автоматическая инициализация свойств в классах

У нас есть код который мы хотим упростить:

```typescript
class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const user = new User('Mike');
console.log(user.name); // Mike
```

Если вы используете **публичные свойства**, то код выше можно переписать в более простой вариант:

```typescript
class User {
  constructor(public name: string) {}
}

const user = new User('Mike');
console.log(user.name); // Mike
```

## Использование ключевого слова infer

Ключевое слово `infer` позволяет извлекать значение из типа.

Создадим тип который будет извлекать тип значения у массива:

```typescript
type TypeOf<T> = T extends (infer U)[] ? U : never;

type ArrayNumber = number[];

type Num = TypeOf<ArrayNumber>; // number
```

Или будет извлекать тип значения у объекта:

```typescript
type ValueOf<T> = T extends { [k: string]: infer V } ? V : never;

const sizes = { device: '470', tablet: '980', desktop: '1024' } as const;

type DeviceValue = ValueOf<typeof sizes>; // "470" | "980" | "1024"
```

## Указать что значение не является null

У нас есть код в котором функция возвращает значение в виде объекта:

```typescript
const getData = (): null | object => ({});

const data: object = getData(); // Type 'object | null' is not assignable to type 'object'
```

Нам нужно указать что значение возвращаемое из функции не равно `null`:

```typescript
const getData = (): null | object => ({});

const data: object = getData()!; // используем оператор !
```

_Постарайтесь избегать использование:_ `!`, `any`, `as`. Это сделает ваш код более понятным и предсказуемым.

## Создать новый тип из другого типа выбрав нужные свойства

```typescript
enum DogBreed {} // Порода собаки

interface Dog {
  name: string;
  age: number;
  breed: DogBreed;
}

type Cat = Pick<Dog, 'name' | 'age'>; // {name: string; age: number }
```

## Создать новый тип из другого типа исключив ненужные свойства

```typescript
interface Car {
  name: string;
  price: number;
  mileage: number;
}

type Boat = Omit<Car, 'mileage'>; // {name: string; price: number; }
```

## Исключить тип из другого типа

```typescript
type Foo = string | number | Date;

type Bar = Exclude<Foo, Date>; // string | number
```

Более сложный пример:

```typescript
type Car = { brand: 'Audi'; price: number } | { brand: 'BMW'; price: number };

type Audi = Exclude<Car, { brand: 'BMW' }>; // {brand: 'Audi', price: number}
```

## Извлечь тип из другого типа

```typescript
type Spam = 'a' | 'b' | 'c';

type A = Extract<Spam, 'a'>; // 'a'
```

Более сложный пример:

```typescript
type MyElement = { type: 'node'; children: MyElement[] } | { type: 'fragment'; children: MyElement[] };

type MyFragment = Extract<MyElement, { type: 'fragment' }>; // { type: 'fragment', children: MyElement[] }
```
