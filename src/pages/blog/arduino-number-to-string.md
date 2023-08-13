---
layout: src/layouts/BlogLayout.astro
title: Как преобразовать число в строку в Arduino?
created: 2021-06-29
modified: 2021-06-29
tags:
  - Arduino
---

При работе с Arduino иногда возникает задача отобразить данные на дисплее, например информацию с датчиков.

Подобные данные обычно представлены числовыми значениями, а отобразить необходимо строковые.

На помощь нам приходит знакомая всем C++ программистам функция `sprintf()`, но все не так просто.

## Преобразуем целое число в строку

### Решение 1. Используем sprintf(buffer, format, ...val1, val2)

```cpp
int led_count = 5;
char buff[20];
sprintf(buff, "led count: %d", led_count); // "led count: 5"
```

### Решение 2. Используем itoa(integer_value, buffer, base)

```cpp
int led_count = 5;
char buff[20];
itoa(led_count, buff, 10); // "5"
```

## Преобразуем вещественное число в строку

Функция sprintf() в Arduino ведет себя не как в стандартной библиотеки C++. 

Если вы попытаетесь отформатировать вещественное число с помощью sprintf(), то получите неожиданный результат.

```cpp
float voltage = 5.6;
char buff[20];
sprintf(buff, "voltage: %0.2f", voltage); // "voltage: ?"
```

Вы заметили что вместо вещественного числа у вас отобразился символ "?" ?

Arduino компилятор основан на avr-gcc, в его реализации по умолчанию выключено форматирование вещественных чисел в строки для sprintf(). Сделано это было очень давно, и в те далекие времена это объяснялось экономией памяти. До сих пор разработчики Arduino не приложили никаких усилий чтобы исправить этот досадный момент.

### Решение 1. Преобразуем с помощью dtostrf(float_value, string_length, number_after_decimal, buffer)

Параметр `string_length` задает длину итоговой строки, должен включать место под символы "." и "-".

Если значение `string_length` - положительное и итоговая строка меньше чем `string_length`, то будут добавлены пробелы слева.

Если значение `string_length` - отрицательное и итоговая строка меньше чем `string_length`, то будут добавлены пробелы справа.

```cpp
char buffer[30];
float temperature = 24.75;
float pressure = 733.93;

char str_temperature[6];
dtostrf(temperature, 6, 2, str_temperature); // " 24.75"

char str_pressure[7];
dtostrf(pressure, -7, 2, str_pressure); // "733.93 "

sprintf(buffer, "%s C, %s mmHg", str_temperature, str_pressure); " 24.75 C, 733.93 mmHg"
```

### Решение 2. Преобразуем с помощью флагов компилятора

К сожалению в самом Arduino у вас не получиться изменить флаги с которыми компилируется ваш скетч.

Но если вы используете PlatformIO или что-то подобное, то можете просто добавить нужные флаги и включить полную поддержку вещественных чисел в sprintf().

```ini
# platformio.ini
[env]
build_flags = -lprintf_flt
```

```c
// Вывод вещественного числа
float val = 56.45;
Serial.printf("val: %0.2f\n", val);
```

### Решение 3. Преобразуем с помощью sprintf() + %d.%d

Можно разбить вещественное число на 2 части и вывести каждую часть как целое число.

```cpp
int fractionalToInt(float value, byte decimal_places = 2) {
  return int((abs(value) - (int)abs(value)) * pow(10, decimal_places));
}

float humidity = 35.89;
char buff[20];
sprintf(buff, "humidity: %d.%d", (int)humidity, fractionalToInt(humidity)); "humidity: 35.89"
```