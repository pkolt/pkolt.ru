---
layout: src/layouts/BlogLayout.astro
title: Простой фонарик для Android
created: 2021-01-16
modified: 2021-01-16
tags:
  - Android
  - React Native
---

Написал очень простое [приложение фонарик](https://play.google.com/store/apps/details?id=com.pkolt.flashlight) на React Native. 

При написании приложения столкнулся с трудностями, не мог найти подходящий модуль для включения фонарика на телефоне. 

Пришлось погрузиться в дебри Java и написать свой собственный [NPM-модуль](https://github.com/pkolt/react-native-lantern) для управления подсветкой на телефоне.

Приложение получилось довольно хорошее, всегда хотелось управлять фонариком именно из приложения без регистрации и СМС.