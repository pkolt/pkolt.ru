---
layout: src/layouts/BlogLayout.astro
title: Энергонезависимое хранилище NVS в ESP32
created: 2022-06-12
modified: 2022-06-12
tags:
  - ESP32
---

В ESP32 можно хранить пары ключ-значение в специальном разделе SPI Flash памяти. Вы можете сами определить размер этого раздела памяти с помощью [разметки разделов](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/partition-tables.html). NVS лучше всего подходит для хранения небольших значений, для хранения больших значений лучше использовать файловую систему FAT.

Библиотека для работы с энергонезависимым хранилищем или NVS (Non-volatile storage) использует все разделы флешки с типом `data` и подтипом `nvs`.

Раздел с названием `nvs` можно открыть функцией `nvs_open()`, или указав названием раздела открыть функцией `nvs_open_from_partition()`.

## Ключи/значения

Максимальная длина ключа - 15 символов.

Значение ключа может быть одним из типов:

- число (`uint8_t`, `int8_t`, `uint16_t`, `int16_t`, `uint32_t`, `int32_t`, `uint64_t`, `int64_t`);
- строка с завершающим нулевым символом (`\0`), не больше 4000 байтов;
- двоичные данные переменной длины (blob), не больше 508 000 байтов или 97.6% от размера раздела (4 000 байт), в зависимости от того что меньше.

Ключи должны быть уникальными.

## Пространства имен

Чтобы избежать проблем с одинаковыми ключами используются пространства имен (namespaces). Пространство имен это специальная строковая метка (не больше 15 символов) которая задается в функциях открытия `nvs_open()` и `nvs_open_from_partition()`. Пространства имен с одинаковыми именами находящиеся в разных разделах флеш памяти являются различными и никак не связаны.

## NVS Итераторы

Итераторы позволяют составить список пар ключ-значение, хранящихся в NVS, на основе указанного имени раздела, пространства имен и типа данных.

Доступны следующие функции:

- `nvs_entry_find()` - создает дескриптор который используется в следующих вызовах;
- `nvs_entry_next()` - продвигает итератор к следующей паре ключ-значение;
- `nvs_entry_info()` - возвращает информацию о каждой паре ключ-значение;
- `nvs_release_iterator()` - необходимо вызвать эту функцию после завершения работы с итератором.

Ниже представлен пример программы которая запоминает количество перезагрузок ESP32 в целочисленную переменную в NVS.

```c
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"
#include "esp_log.h"
#include "esp_system.h"
#include "nvs_flash.h"
#include "nvs.h"

#define NVS_RESTART_COUNTER "restart_counter"

static const char *TAG = "NVS";
static const gpio_num_t LED_PIN = GPIO_NUM_2;

void app_main(void)
{
    // Setup LED
    gpio_pad_select_gpio(LED_PIN);
    gpio_set_direction(LED_PIN, GPIO_MODE_OUTPUT);
    gpio_set_level(LED_PIN, 1);

    // Initialize NVS
    esp_err_t err = nvs_flash_init();
    if (err == ESP_ERR_NVS_NO_FREE_PAGES || err == ESP_ERR_NVS_NEW_VERSION_FOUND)
    {
        // NVS partition was truncated and needs to be erased
        // Retry nvs_flash_init
        ESP_ERROR_CHECK(nvs_flash_erase());
        err = nvs_flash_init();
    }
    ESP_ERROR_CHECK(err);

    // Open NVS
    nvs_handle_t my_handle;
    ESP_ERROR_CHECK(nvs_open("storage", NVS_READWRITE, &my_handle));

    // Read value
    int32_t restart_counter = 0; // value will default to 0, if not set yet in NVS
    err = nvs_get_i32(my_handle, NVS_RESTART_COUNTER, &restart_counter);
    if (err != ESP_ERR_NVS_NOT_FOUND)
    {
        ESP_ERROR_CHECK(err);
    }
    ESP_LOGI(TAG, "Restart counter: %d", restart_counter);

    // Write value
    restart_counter++;
    ESP_ERROR_CHECK(nvs_set_i32(my_handle, NVS_RESTART_COUNTER, restart_counter));
    ESP_ERROR_CHECK(nvs_commit(my_handle));

    // NVS Close
    nvs_close(my_handle);

    // Restart module
    for (int i = 10; i >= 0; i--)
    {
        ESP_LOGI(TAG, "Restarting in %d seconds...", i);
        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
    ESP_LOGI(TAG, "Restarting now.");
    gpio_set_level(LED_PIN, 0);
    esp_restart();
}
```
