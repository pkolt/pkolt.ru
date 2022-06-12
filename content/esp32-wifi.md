---
title: Как подключиться к WiFi в ESP32?
emoji: 🤳
created: 2022-06-12
modified: 2022-06-12
tags:
  - ESP32
---

**Задача:** 

- Подключиться к точке доступа WiFi в ESP32 с помощью фреймворка ESP-IDF.
- При подключении задать клиенту свое имя отличное от стандартного.

**Решение:**

Код программы для подключения к WiFi приведен ниже.

Код подключения к WiFi выглядит довольно объемным. Сетевые интерфейсы используют дефолтный [цикл событий](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/system/esp_event.html) для оповещения о ходе подключения. Кроме дефолтного цикла событий можно создать свой отдельный. 

После запуска соединения мы выполняем подключение к WiFi. Получение IP адреса мы расцениваем как успешное подключение к WiFi. При разрыве соединения с WiFi мы получим событие и попробуем снова подключиться к WiFi, делая определенное количество попыток подключения.

```c
#include "freertos/FreeRTOS.h"
#include "driver/gpio.h"
#include "esp_log.h"
#include "esp_wifi.h"
#include "nvs_flash.h"
#include "esp_event.h"

static const char *TAG = "WiFi";

#define ESP_MAXIMUM_RETRY 5

static int s_retry_num = 0;

#define WIFI_SSID "your_wifi_ssid"
#define WIFI_PASS "your_wifi_password"

static const gpio_num_t LED_PIN = GPIO_NUM_2;

static void sta_start_handler(void *arg, esp_event_base_t event_base,
                              int32_t event_id, void *event_data)
{
    ESP_LOGI(TAG, "connect...");
    esp_wifi_connect();
}

static void sta_disconnected_handler(void *arg, esp_event_base_t event_base,
                                     int32_t event_id, void *event_data)
{
    if (s_retry_num < ESP_MAXIMUM_RETRY)
    {
        esp_wifi_connect();
        s_retry_num++;
        ESP_LOGI(TAG, "retry to connect to the AP");
    }
    else
    {
        // ...
    }
    ESP_LOGI(TAG, "fail connect");
    gpio_set_level(LED_PIN, 0);
}

static void sta_got_ip_handler(void *arg, esp_event_base_t event_base,
                               int32_t event_id, void *event_data)
{
    ESP_LOGI(TAG, "success connect");
    ip_event_got_ip_t *event = (ip_event_got_ip_t *)event_data;
    ESP_LOGI(TAG, "got ip:" IPSTR, IP2STR(&event->ip_info.ip));
    s_retry_num = 0;
    gpio_set_level(LED_PIN, 1);
}

void wifi_init_sta(void)
{
    ESP_ERROR_CHECK(esp_netif_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());
    esp_netif_t *esp_netif = esp_netif_create_default_wifi_sta();
    ESP_ERROR_CHECK(esp_netif_set_hostname(esp_netif, "ESP32 Device"));
    wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
    ESP_ERROR_CHECK(esp_wifi_init(&cfg));

    ESP_ERROR_CHECK(esp_event_handler_instance_register(WIFI_EVENT,
                                                        WIFI_EVENT_STA_START,
                                                        &sta_start_handler,
                                                        NULL,
                                                        NULL));

    ESP_ERROR_CHECK(esp_event_handler_instance_register(WIFI_EVENT,
                                                        WIFI_EVENT_STA_DISCONNECTED,
                                                        &sta_disconnected_handler,
                                                        NULL,
                                                        NULL));

    ESP_ERROR_CHECK(esp_event_handler_instance_register(IP_EVENT,
                                                        IP_EVENT_STA_GOT_IP,
                                                        &sta_got_ip_handler,
                                                        NULL,
                                                        NULL));

    wifi_config_t wifi_config = {
        .sta = {
            .ssid = WIFI_SSID,
            .password = WIFI_PASS,
            .threshold.authmode = WIFI_AUTH_WPA2_PSK,
        },
    };

    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA));
    ESP_ERROR_CHECK(esp_wifi_set_ps(WIFI_PS_NONE));
    ESP_ERROR_CHECK(esp_wifi_set_config(WIFI_IF_STA, &wifi_config));
    ESP_ERROR_CHECK(esp_wifi_start());
}

void app_main(void)
{
    // Setup LED
    gpio_pad_select_gpio(LED_PIN);
    gpio_set_direction(LED_PIN, GPIO_MODE_OUTPUT);

    // Initialize NVS
    esp_err_t ret = nvs_flash_init();
    if (ret == ESP_ERR_NVS_NO_FREE_PAGES || ret == ESP_ERR_NVS_NEW_VERSION_FOUND)
    {
        ESP_ERROR_CHECK(nvs_flash_erase());
        ret = nvs_flash_init();
    }
    ESP_ERROR_CHECK(ret);

    wifi_init_sta();
}
```