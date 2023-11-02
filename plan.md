## План

1. Простое приложение Todo List
   1. запускаем в режиме разработчика
   2. запускаем в режиме продакшн
2. Какие есть проблемы?

   1. Разработка: нужно установить NodeJS, Postgres, настроить Postgres (создать БД, пользователя)
   2. Деплой (при каждом обновлении):
      1. Установить NodeJS
      2. Установить Postgres
      3. Настроить Postgres: создать БД, пользователя
      4. Скачать репо
      5. Установить зависимости в папках server и client
      6. Сделать build в папке client
      7. Запустить сервер
   3. Также протестировать продакшен-билд мы сможем только на продакашен-сервере (на локале другое окружение)
   4. Для фронтендера: для развёртывания бакенда на локальном машине нужно выполнить те же шаги, что и для деплоя

3. Чем нам поможет докер?

   1. Окружение и инструкции для сборки и запуска записываются в файлах Dockerfile и docker-compose.yml
   2. Приложение запускается в изолированной среде (одинаковом, чистом окружении на любой машине)
   3. Приложение можно собрать и запустить одной командой

4. Настраиваем докер

   1. Схема контейнеров
   2. Устанавливаем докер
   3. Пишем Dockerfile, docker-compose.yml
      1. Для клиента, запускаем, смотрим
      2. Для БД, запускаем, смотрим
         1. передаём .env
         2. volume для данных
      3. Для сервера, запускаем, смотрим
         1. передаём .env
         2. пробрасываем порты
         3. связываем клиент и сервер через volume

5. Магия: деплоим это на VPS (+make)
   1. Шаги деплоя с докером:
      1. Установить Docker
      2. Скачать репо
      3. Запустить `docker-compose up -d`
6. Зачем докер нужен фронтендеру?
   1. Возможность быстро развернуть бакенд у себя на локале
   2. Умение обернуть фроентенд в докер-контейнер и встроить в docker-compose
   3. Возможность протестировать на локальной машине как будет вести себя конечный продукт
7. Ограничения докера
   1. Требования к ОЗУ и диску:
      1. с докером: 460Мб ОЗУ, 3.1Гб диск
      2. без докера: 380Мб ОЗУ, 2.6Гб диск
8. Ещё фишки докера
   1. слои и кеширование
   2. Больше про Volumes - пишем логи в файл
   3. полезные скрипты: build, start, all-logs, app-log
   4. бэкапы, dozzle

## Docker Containers

```mermaid
graph TB;

    subgraph db["todos-db (Postgres Container)"]
      psql[(PostgreSQL)]
    end

    subgraph server["todos-server (Server Container)"]
      nodejs((NodeJS Express Server))
    end

    subgraph client["todos-client: Client Container"]
      vitejs((Client-side files + Vite build)) --> |build| volumeClientDist("client-dist (/root/client/dist)")
    end

    classDef ports fill:#9cf,stroke:#333,stroke-width:2px, color:#333;
    classDef volumes fill:#fcba03,stroke:#333,stroke-width:2px, color:#333;

    class volumeClientDist volumes;
    class volumePostgresData volumes;

    class port5432 ports;
    class port3000 ports;
```

## Docker Containers (with ports and volumes)

```mermaid
graph RL;

    subgraph db["todos-db (Postgres Container)"]
      psql[(PostgreSQL)] --- psqlPort("Port: 5432")
    end

    subgraph server["todos-server (Server Container)"]
      nodejs((NodeJS Express Server)) --- nodejsPort("Port: 3000")
      serverFS["Files:\n/root\n--server\n----[server files]\n--client/dist (volume)"]
    end

    subgraph client["todos-client: Client Container"]
      vitejs((Client-side files + Vite build))
      clientFS["Files:\n/root\n--client\n----[client files]\n----dist (volume)"]
    end

    port5432("Port: 5432")
    port3000("Port: 3000")
    volumeClientDist("Volume: client-dist (/root/client/dist)")
    volumePostgresData("Volume: postgres-data (/var/lib/postgresql/data)")

    psqlPort --> |expose DB| port5432
    nodejs --> |connect to DB| port5432
    nodejsPort --> |expose Server| port3000
    vitejs --> |build| volumeClientDist
    nodejs --> |serve static| volumeClientDist
    psql --> |store data| volumePostgresData

    classDef ports fill:#9cf,stroke:#333,stroke-width:2px, color:#333;
    classDef volumes fill:#fcba03,stroke:#333,stroke-width:2px, color:#333;
    classDef fs fill:#abedff,stroke:#333,stroke-width:2px, color:#333, text-align:left;

    class volumeClientDist volumes;
    class volumePostgresData volumes;

    class port5432 ports;
    class port3000 ports;

    class serverFS fs;
    class clientFS fs;
```
