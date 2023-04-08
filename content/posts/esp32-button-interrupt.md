---
title: Как избежать дребезга кнопки в ESP32?
created: 2022-06-04
modified: 2022-06-04
tags:
  - ESP32
---

**Задача:** 

Включать и выключать светодиод при нажатии на кнопку. Исключить возможный дребезг кнопки при быстром нажатии.

Программу будем писать на [ESP-IDF](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html).

В программе будут использоваться:

- прерывания;
- двоичный семафор;
- таймер;
- логирование;
- задачи;

**Решение:**

На кнопку повесим прерывание. Прерывание должно включить семафор. Включение семафора ждет логика в нашей запущенной задачи. Как только семафор включиться светодиод сменит свое состояние: с включенного на выключенный и наоборот. Двоичный семафор здесь используется как событие, которое ожидает логика внутри запущенной задачи.

При нажатии кнопки может быть проблема, известная как дребезг контактов. При нажатии кнопки на самом деле происходит несколько микро нажатий. Это приводит к тому, что за одно нажатие светодиод может включиться и выключиться. Нам же нужно чтобы при нажатии кнопки выполнялось одно действие.

Быстрым решением могла бы стать установка керамического конденсатора (0.1 uF) между контактами кнопки для сглаживания сигнала. К сожалению конденсатор не устранит дребезг полностью. Для устранения дребезга мы будем использовать программное решение. В обработчике прерываний мы отключим прерывание на кнопке и включим его по таймеру через 1 секунду (вы можете задать любое другое время). Так как прерывание на кнопке будет выключено на 1 секунду это устранит возможный дребезг.

Обратите внимание что в обработчике прерывания методы работы с таймером и двоичным семафором оканчиваются на слово `ISR`. Это специальные методы именно для вызова из обработчика прерывания.

```c
#include "driver/gpio.h"
#include "esp_log.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/semphr.h"
#include "freertos/timers.h"

static const char *LOG_TAG = "Application";
static const gpio_num_t LED_PIN = GPIO_NUM_2;
static const gpio_num_t BUTTON_PIN = GPIO_NUM_22;
static SemaphoreHandle_t led_semphr = NULL;
static TimerHandle_t button_timer = NULL;

void buttonTimerHandle(TimerHandle_t timer)
{
    // Включаем прерывания на кнопке
    gpio_intr_enable(BUTTON_PIN);
}

void vLedTask(void *pvParams)
{
    bool led_state = false;
    for (;;)
    {
        if (xSemaphoreTake(led_semphr, portMAX_DELAY) == pdTRUE)
        {
            led_state = !led_state;
            ESP_LOGI(LOG_TAG, "LED is %s", led_state ? "On" : "Off");
            gpio_set_level(LED_PIN, led_state);
        }
    }
}

static void IRAM_ATTR button_isr_handler(void *arg)
{
    // Отключаем прерывания на кнопке, чтобы исключить дребезг
    gpio_intr_disable(BUTTON_PIN);
    // Включаем семафор
    xSemaphoreGiveFromISR(led_semphr, pdFALSE);
    // Запускаем таймер
    xTimerStartFromISR(button_timer, pdFALSE);
}

void app_main(void)
{
    // Настройка LED
    gpio_pad_select_gpio(LED_PIN);
    gpio_set_direction(LED_PIN, GPIO_MODE_OUTPUT);

    // Настройка кнопки
    gpio_pad_select_gpio(BUTTON_PIN);
    ESP_ERROR_CHECK(gpio_set_direction(BUTTON_PIN, GPIO_MODE_INPUT));
    ESP_ERROR_CHECK(gpio_pulldown_en(BUTTON_PIN));                      // стянут к GND
    ESP_ERROR_CHECK(gpio_set_intr_type(BUTTON_PIN, GPIO_INTR_POSEDGE)); // переход от низкого к высокому напряжению
    ESP_ERROR_CHECK(gpio_install_isr_service(0));
    ESP_ERROR_CHECK(gpio_isr_handler_add(BUTTON_PIN, button_isr_handler, (void *)BUTTON_PIN));

    // Создание двоичного семафора
    led_semphr = xSemaphoreCreateBinary();

    // Создание программного таймера на 1 секунду (без автоматического перезапуска)
    button_timer = xTimerCreate(
        "Button timer",
        1000 / portTICK_PERIOD_MS,
        pdFALSE,
        NULL,
        buttonTimerHandle);

    // Создание задачи
    xTaskCreate(vLedTask, "LED Task", 3000, NULL, 1, NULL);
}
```