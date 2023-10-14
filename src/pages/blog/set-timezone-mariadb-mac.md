---
layout: src/layouts/BlogLayout.astro
title: Как задать временную зону для MariaDB в MacOS?
created: 2021-09-11
modified: 2021-09-11
seo_description: Рассмотрим как задать timezone для MariaDB в MacOS
seo_tags:
  - MacOS
  - MariaDB
  - timezone
tags:
  - MariaDB
---

Для того чтобы задать временную зону для MariaDB в MacOS необходимо:

Создать файлик `~/.my.cnf` для локальной настройки MariaDB с текстом (установите нужное вам значение временной зоны):

```ini
[mariadb]

default_time_zone = 'America/New_York'
#default_time_zone = 'UTC'
#default_time_zone = +0:00
```

Перезапустить сервер MariaDB:

```bash
brew services restart mariadb
```

Иногда после перезапуска сервера не удается сразу подключиться к нему (нужно выполнить несколько попыток).

Для проверки корреткности установки временной зоны выполните SQL-запрос (в ответе должно быть ваше значение отличное от `SYSTEM`):

```sql
SHOW GLOBAL VARIABLES LIKE 'time_zone';
```
