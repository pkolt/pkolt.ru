---
title: CSS Grid в примерах
created: 2023-07-08
modified: 2023-07-08
tags:
  - CSS
---

В этой статье мы рассмотрим несколько примеров использования CSS Grid, чтобы продемонстрировать его возможности и показать, как с помощью него можно легко и эффективно управлять расположением элементов на странице. Если вы хотите научиться создавать современные и адаптивные дизайны, CSS Grid - это то, что вам понадобится.

## Подготовка

Макет нашей исходной демо-страницы имеет вид:

![Demo 1](/posts/css-grid-examples/grid_demo_1.jpg)

Код HTML-страницы:

```html
<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        padding: 15%;
        display: grid;
        place-content: stretch;
        box-sizing: border-box;
        min-height: 100vh;
      }

      .grid {
        background: rgba(135, 207, 235, 0.1);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
      }

      .grid-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        background: ghostwhite;
        border: 2px dashed skyblue;
        font-size: 2.5rem;
      }
    </style>
  </head>
  <body>
    <div class="grid">
      <div class="grid-cell">#1</div>
      <div class="grid-cell">#2</div>
      <div class="grid-cell">#3</div>
      <div class="grid-cell">#4</div>
      <div class="grid-cell">#5</div>
      <div class="grid-cell">#6</div>
      <div class="grid-cell">#7</div>
      <div class="grid-cell">#8</div>
      <div class="grid-cell">#9</div>
    </div>
  </body>
</html>
```

## Растянуть колонку по ширине в Grid

**Как сделать первый элемент размером в 3 колонки, а третий элемент в 2 колонки?**

![Demo 2](/posts/css-grid-examples/grid_demo_2.jpg)

```css
.grid-cell:nth-child(1) {
  grid-column-start: span 3;
}

.grid-cell:nth-child(3) {
  grid-column-start: span 2;
}
```

## Отступы у колонки в Grid

**Четвертый элемент должен отступить одну колонку и занять ширину в 2 колонки.**

![Demo 3](/posts/css-grid-examples/grid_demo_3_1.jpg)

```css
.grid-cell:nth-child(4) {
  grid-column-start: 2; /* элемент начинается со 2-ой линии сетки */
  grid-column-end: span 2; /* элемент занимает по ширине 2 колонки  */
}
```

Номера линий сетки можно посмотреть в DevTools нажав на бейдж "grid" у элемента сетки.

![Demo 3](/posts/css-grid-examples/grid_demo_3_2.jpg)

Этот же результат можно получить если не использовать `span`, а опираться только на линии сетки:

```css
.grid-cell:nth-child(4) {
  grid-column-start: 2; /* начало элемента 2 линия сетки */
  grid-column-end: 4; /* конец элемента 4 линия сетки */
}

/**  или более короткая форма записи */
.grid-cell:nth-child(4) {
  grid-column: 2 / 4; /* начало 2 линия сетки, конец 4 линия сетки */
}
```

Этот же результат можно получить если использовать отрицательные номера линий сетки:

```css
.grid-cell:nth-child(4) {
  grid-column: -3 / -1;
}
```

## Порядок элементов

**Поменять местами первый и последний элементы.**

![Demo 4](/posts/css-grid-examples/grid_demo_4.jpg)

```css
.grid-cell:first-child {
  order: 1;
}

.grid-cell:last-child {
  order: -1;
}
```

## Растянуть колонку по высоте в Grid

**Необходимо сделать так, чтобы вторая колонка заняла по высоте все доступное место.**

![Demo 5](/posts/css-grid-examples/grid_demo_5.jpg)

```css
.grid-cell:nth-child(2) {
  grid-row: span 4; /* равнозначно: auto / span 4 */
}
```

Этот же результат можно получить если использовать номера линий сетки:

```css
.grid-cell:nth-child(2) {
  grid-row: 1 / 5;
  grid-column: 2;
}
```

## Количество столбцов в зависимости от ширины элемента

Иногда мы не знаем на сколько столбцов нам нужно разбить таблицу, мы хотим сделать столько столбцов сколько уместится в зависимости от ширины элемента.

![Demo 6](/posts/css-grid-examples/grid_demo_6.jpg)

```css
.grid {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* минимальная ширина элемента равна 200px */
}
```

## auto-fill vs auto-fit

Когда элементов очень много разницу между `auto-fill` и `auto-fit` практически невозможно понять. Но когда количество элементов становиться меньше ширины таблицы, то разница становиться очевидной.

### auto-fill

![Demo 7](/posts/css-grid-examples/grid_demo_7_fill.jpg)

```css
.grid {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
```

### auto-fit

![Demo 7](/posts/css-grid-examples/grid_demo_7_fit.jpg)

```css
.grid {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```
