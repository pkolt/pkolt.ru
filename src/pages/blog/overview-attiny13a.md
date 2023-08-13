---
layout: src/layouts/BlogLayout.astro
title: Обзор ATtiny13A
created: 2021-04-13
modified: 2021-04-13
tags:
  - Microcontrollers
  - Arduino
  - ATtiny13a
---

![attiny13a](/posts/overview-attiny13a/attiny13a_1.jpg)

[ATtiny13a](https://www.microchip.com/wwwproducts/en/ATtiny13A) - Microchip picoPower® 8-разрядный AVR® микроконтроллер на базе RISC-архитектуры  имеет: 1 KB флэш-памяти ISP, 64 bytes EEPROM, 64 bytes SRAM, 32 bytes регистровый файл и 4-канальный 10-разрядный аналого-цифровой преобразователь. Устройство обеспечивает пропускную способность до 20 MIPS на частоте 20 МГц при работе 1,8-5,5 V.

## Характеристики ATtiny13a

![attiny13a](/posts/overview-attiny13a/attiny13a_2.jpg)

| Параметр                            | Значение               |
|-------------------------------------|------------------------|
| Тип памяти                          | Flash                  |
| Размер памяти (для записи программ) | 1 KB                   |
| Скорость CPU                        | 20 MIPS/DMIPS (20 МГц) |
| SRAM                                | 64 bytes               |
| EEPROM                              | 64 bytes               |
| ШИМ (PWM) контактов                 | 2                      |
| Таймеры                             | 1 x 8-bit              |
| Диапазон температур                 | -40 - 125 °C           |
| Диапазон рабочего напряжения        | 1.8 - 5.5 V            |
| Цифровых контактов                  | 6                      |
| Аналоговых контактов                | 4                      |
| SPI                                 | 1                      |
| I2C                                 | -                      |
| UART                                | -                      |

MIPS (Millions of Instructions Per Second) - миллион команд в секунду.

## Схема микроконтроллера ATtiny13a

![attiny13a pinout](/posts/overview-attiny13a/attiny13a_pinout.png)

## Прошивка ATtiny13a с помощью Arduino

ATtiny13a будем прошивать через SPI. Прошивка через UART невозможна из-за отсутствия UART в микроконтроллере.
### Схема подключения Arduino к ATtiny13a (для прошивки)

![attiny13a bootloader](/posts/overview-attiny13a/attiny13a_bootloader_1.jpg)

| Arduino | ATtiny13a   |
|---------|-------------|
| GND     | GND         |
| 3.3 V   | Vcc         |
| 13      | PB2 (SCK)   |
| 12      | PB1 (MISO)  |
| 11      | PB0 (MOSI)  |
| 10      | PB5 (RESET) |

Дополнительно для прошивки ATtiny13a нужно добавить конденсатор на 10 мкФ. Более длинный (положительный) контакт конденсатора подключите к выводу RESET микроконтроллера, короткий (отрицательный) контакт конденсатора подключите к выводу GND.

![attiny13a bootloader](/posts/overview-attiny13a/attiny13a_bootloader_2.jpg)

### Подготовка Arduino как ISP-программатора

1. Подключить Arduino к ПК (далее будет использоваться Arduino Pro Mini);
2. Запустить Arduino IDE;
3. Загрузить ArduinoISP скетч (Файл -> Примеры -> 11.ArduinoISP -> ArduinoISP);
4. Выбрать плату Arduino, ту которую используете (Инструменты -> Плата -> Arduino AVR Boards -> Arduino Pro Mini);
5. Выбрать используемый порт (Инструменты -> Порт);
6. Нажать в панели управления Arduino IDE кнопку "Загрузка";
7. После успешной загрузки скетча, Arduino может использоваться как ISP-программатор.

![attiny13a bootloader](/posts/overview-attiny13a/attiny13a_bootloader_3.jpg)

### Установка загрузчика в ATtiny13a

1. Добавить поддержку ATtiny13a в Arduino IDE:  
- Arduino -> Preferences... -> Дополнительные ссылки для менеджера плат -> Вставить `https://mcudude.github.io/MicroCore/package_MCUdude_MicroCore_index.json`
- Инструменты -> Плата -> Менеджер плат -> Ввести `MicroCore` -> Установить
2. Выбрать плату ATtiny13a (Инструменты -> Плата -> MicroCore -> ATtiny13)
3. Настроить плату:  
- Инструменты -> BOD -> BOD 1.8V;  
- Инструменты -> EEPROM -> EEPROM retained;  
- Инструменты -> Clock -> 9.6 MHz internal osc.;  
- Инструменты -> Расчет времени -> Micros disabled;
4. Выбрать программатор (Инструменты -> Программатор -> Arduino as ISP (MicroCore));
5. Записать загрузчик (Инструменты -> Записать загрузчик);
6. В нижней части Arduino IDE появиться надпись "Запись загрузчика завершена".

### Загрузка скетча в ATtiny13a

1. Создайте новый скетч и скопируйте в него содержимое ниже;
2. Выбрать плату ATtiny13a (и если нужно настроить ее);
3. Выбрать программатор (Инструменты -> Программатор -> Arduino as ISP (MicroCore));

```cpp
// Мигаем светодиодом на контакте PB3 у ATtiny13a
void setup() {
  pinMode(PB3, OUTPUT);
}

void loop() {
  digitalWrite(PB3, HIGH);
  delay(1000);
  digitalWrite(PB3, LOW);
  delay(1000);
}
```

4. Загрузка скетча (Скетч -> Загрузить через программатор).