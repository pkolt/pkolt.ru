---
layout: src/layouts/BlogLayout.astro
title: Именование переменных и функций в JavaScript
created: 2023-09-07
modified: 2023-09-07
tags:
  - TypeScript
  - JavaScript
---

> Это статья является переводом [https://github.com/kettanaito/naming-cheatsheet](https://github.com/kettanaito/naming-cheatsheet).

Задавать имена переменных сложная задача. Эта шпаргалка поможет вам упростить именование в программном коде.

Хотя эти предложения можно применить к любому языку программирования, я буду использовать JavaScript, чтобы проиллюстрировать их на практике.

## Английский язык

Используйте английский язык при именовании переменных и функций.

```js
/* Плохо */
const primerNombre = 'Gustavo';
const amigos = ['Kate', 'John'];

/* Хорошо */
const firstName = 'Gustavo';
const friends = ['Kate', 'John'];
```

> Нравится вам это или нет, но английский является доминирующим языком в программировании: на английском написан синтаксис всех языков программирования, а также бесчисленное множество документации и учебных материалов. Написав код на английском языке, вы значительно повысите его связность.

## Соглашение об именовании

Выберите **одно** соглашение об именовании и следуйте ему. Это может быть `camelCase`, `PascalCase`, `snake_case`. Многие языки программирования имеют свои собственные традиции в отношении соглашений об именах; проверьте документацию на вашем языке или изучите популярные репозитории на GitHub!

```js
/* Плохо */
const page_count = 5;
const shouldUpdate = true;

/* Хорошо */
const pageCount = 5;
const shouldUpdate = true;

/* Тоже хорошо */
const page_count = 5;
const should_update = true;
```

## S-I-D

Имя должно быть _коротким_, _интуитивно понятным_ и _описательным_:

- **Коротким (Short)**. Имя не должно занимать много времени, чтобы набираться и, следовательно, запоминаться;
- **Интуитивно понятным (Intuitive)**. Имя должно звучать естественно, как можно ближе к обыденной речи;
- **Описательным (Descriptive)**. Имя должно наиболее эффективно отражать то, что оно делает/ чем обладает.

```js
/* Плохо */
const a = 5; // "a" может означать что угодно
const isPaginatable = a > 10; // "Paginatable" звучит крайне неестественно
const shouldPaginatize = a > 10; // Придуманные глаголы — это так весело!

/* Хорошо */
const postCount = 5;
const hasPagination = postCount > 10;
const shouldPaginate = postCount > 10; // альтернативно
```

## Избегайте сокращений

**Не** используйте сокращения. Они не способствуют ничему, кроме снижения читабельности кода. Найти короткое, описательное имя может быть сложно, но сокращение не является оправданием для отказа от этого.

```js
/* Плохо */
const onItmClk = () => {};

/* Хорошо */
const onItemClick = () => {};
```

## Избегайте дублирования контекста

Имя не должно дублировать контекст, в котором оно определено. Всегда удаляйте контекст из имени, если это не ухудшает его читабельность.

```js
class MenuItem {
  /* Имя метода дублирует контекст (который "MenuItem") */
  handleMenuItemClick = (event) => { ... }

  /* Читается хорошо, как `MenuItem.handleClick()` */
  handleClick = (event) => { ... }
}
```

## Отобразить ожидаемый результат

Имя должно отражать ожидаемый результат.

```jsx
/* Плохо */
const isEnabled = itemCount > 3;
return <Button disabled={!isEnabled} />;

/* Хорошо */
const isDisabled = itemCount <= 3;
return <Button disabled={isDisabled} />;
```

---

# Именования функций

## A/HC/LC Паттерн

Существует полезный шаблон, которому необходимо следовать при именовании функций:

```
prefix? + action (A) + high context (HC) + low context? (LC)
```

Посмотрите, как можно применить этот шаблон, в таблице ниже.

| Название               | Префикс  | Действие (A) | Главный контекст (HC) | Вторичный контекст (LC) |
| ---------------------- | -------- | ------------ | --------------------- | ----------------------- |
| `getUser`              |          | `get`        | `User`                |                         |
| `getUserMessages`      |          | `get`        | `User`                | `Messages`              |
| `handleClickOutside`   |          | `handle`     | `Click`               | `Outside`               |
| `shouldDisplayMessage` | `should` | `Display`    | `Message`             |                         |

> **Примечание**. Порядок контекста влияет на значение переменной. Например, `shouldUpdateComponent` означает, что _вы_ собираетесь обновить компонент, в то время как, `shouldComponentUpdate` говорит вам, что _компонент_ обновится сам по себе, и вы только контролируете, _когда_ он должен обновиться.
> Другими словами, **главный контекст подчеркивает значение переменной**.

---

## Действия

Глагольная часть имени вашей функции - самая важная часть, отвечающая за описание того, что функция _делает_.

### `get`

Доступ к данным немедленно (т.е. сокращенный метод получения внутренних данных).

```js
function getFruitCount() {
  return this.fruits.length;
}
```

> Смотрите также [compose](#compose).

Вы также можете использовать `get` при выполнении асинхронных операций:

```js
async function getUser(id) {
  const user = await fetch(`/api/user/${id}`);
  return user;
}
```

### `set`

Устанавливает переменную декларативным способом, заменяя значение `A` на значение `B`.

```js
let fruits = 0;

function setFruits(nextFruits) {
  fruits = nextFruits;
}

setFruits(5);
console.log(fruits); // 5
```

### `reset`

Устанавливает переменную обратно в её начальное значение или состояние.

```js
const initialFruits = 5;
let fruits = initialFruits;
setFruits(10);
console.log(fruits); // 10

function resetFruits() {
  fruits = initialFruits;
}

resetFruits();
console.log(fruits); // 5
```

### `remove`

Удаляет что-то откуда-то.

Например, если у вас есть набор выбранных фильтров на странице поиска, удаление одного из них из коллекции будет называться `removeFilter`, а **не** `deleteFilter` (и это естественным образом выразится и по-английски):

```js
function removeFilter(filterName, filters) {
  return filters.filter((name) => name !== filterName);
}

const selectedFilters = ['price', 'availability', 'size'];
removeFilter('price', selectedFilters);
```

> Смотрите также [delete](#delete).

### `delete`

Полностью стирает что-то навсегда.

Представьте, что вы редактор контента, и есть тот пресловутый пост, от которого вы хотите избавиться. Как только вы нажмете на яркую кнопку "Удалить пост", система управления контентом выполнит действие `deletePost`, а **не** `removePost`.

```js
function deletePost(id) {
  return database.find({ id }).delete();
}
```

> Смотрите также [remove](#remove).

> **`remove` or `delete`?**
>
> Когда разница между `remove` и `delete` вам не так очевидна, я бы порекомендовал обратить внимание на противоположные действия - `add` и `create`.
> Основное отличие между `add` и `create` заключается в том, что `add` требует указания места назначения, в то время как `create` **не требует указания места назначения**. Вы добавляете (`add`) элемент _в какое-то место_, но вы не создаете (`create`) его в каком-то месте. Просто сопоставляйте `remove` с `add` и `delete` с `create`.
>
> **Например:** добавить (`add`) участника в команду, но создать (`create`) профиль члена команды. Или удалить участника из команды (`remove`), но удалить профиль (`delete`) члена команды.
>
> Подробно описано [здесь](https://github.com/kettanaito/naming-cheatsheet/issues/74#issue-1174942962).

### `compose`

Создает новые данные на основе существующих. Применяется в основном к строкам, объектам или функциям.

```js
function composePageUrl(pageName, pageId) {
  return pageName.toLowerCase() + '-' + pageId;
}
```

> Смотрите также [get](#get).

### `handle`

Обрабатывает действие. Часто используется при именовании метода обратного вызова.

```js
function handleLinkClick() {
  console.log('Clicked a link!');
}

link.addEventListener('click', handleLinkClick);
```

---

## Контекст

Область действия функции.

Функция часто представляет собой действие над _чем-то_. Важно указать ее область действия или, по крайней мере, ожидаемый тип данных.

```js
/* Чистая функция, работающая с примитивами */
function filter(list, predicate) {
  return list.filter(predicate);
}

/* Функция, работающая исключительно с постами */
function getRecentPosts(posts) {
  return filter(posts, (post) => post.date === Date.now());
}
```

> Некоторые предположения, специфичные для языка, могут позволять опускать контекст. Например, в JavaScript часто бывает так, что метод `filter` применяется к массиву. Добавление явного `filterArray` было бы излишним.

---

## Префиксы

Префикс усиливает значение переменной. Его редко используют в именах функций.

### `is`

Описывает характеристику или состояние текущего контекста (обычно `boolean`).

```js
const color = 'blue';
const isBlue = color === 'blue'; // характеристика
const isPresent = true; // состояние

if (isBlue && isPresent) {
  console.log('Blue is present!');
}
```

### `has`

Описывает, обладает ли текущий контекст определенным значением или состоянием (обычно `boolean`).

```js
/* Плохо */
const isProductsExist = productsCount > 0;
const areProductsPresent = productsCount > 0;

/* Хорошо */
const hasProducts = productsCount > 0;
```

### `should`

Отражает положительное условное утверждение (обычно `boolean`), связанное с определенным действием.

```js
function shouldUpdateUrl(url, expectedUrl) {
  return url !== expectedUrl;
}
```

### `min`/`max`

Представляет собой минимальное или максимальное значение. Используется при описании границ или ограничений.

```js
/**
 * Отображает случайное количество постов
 * в пределах заданных минимальных и максимальных границ.
 */
function renderPosts(posts, minPosts, maxPosts) {
  return posts.slice(0, randomBetween(minPosts, maxPosts));
}
```

### `prev`/`next`

Укажите предыдущее или следующее состояние переменной в текущем контексте. Используется при описании переходов состояний.

```jsx
async function getPosts() {
  const prevPosts = this.state.posts;

  const latestPosts = await fetch('...');
  const nextPosts = concat(prevPosts, latestPosts);

  this.setState({ posts: nextPosts });
}
```

## Единственное и множественное число

Как и префикс, имена переменных могут быть сделаны единственными или множественными в зависимости от того, содержат ли они одно значение или несколько значений.

```js
/* Плохо */
const friends = 'Bob';
const friend = ['Bob', 'Tony', 'Tanya'];

/* Хорошо */
const friend = 'Bob';
const friends = ['Bob', 'Tony', 'Tanya'];
```
