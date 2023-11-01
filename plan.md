## План

1. Почему я решил использовать докер?
   1. Непонятно влияет ли моё окружение на работу приложения? (ts-node, mac vs linux)
   2. При переходе на другие версии ноды/постгреса и т.д. нужно обновлять их и на VPS
2. Собираем приложение - NodeJS + Postgres + backup
   1. Пример приложения
   2. Dockerfile
   3. docker-compose
   4. порты
   5. volumes (postgres)
3. Магия: деплоим это на VPS, make, .env
4. Ещё фишки докера
   1. слои и кеширование
   2. докер контейнер каждый раз запускается с нуля (точно? чем это хорошо?)
   3. Больше про Volumes - пишем логи в файл
   4. полезные скрипты: build, start, all-logs, app-log
   5. dozzle - логи
5. Ограничения докера
   1. Требования к ОП
6. FAQ
   1. как получить доступ к командной строке контейнера?

## todo

- [ ] сделать инфорграфику
- [ ] расписать по шагам, что я буду делать и как переходить с темы на тему
- [ ] написать забавных тудушек
- [ ] поправить app.v0.js
- [ ] есть ли способ копировать файлы в volume при сборке контейнера?

# graph

```mermaid
graph TB;

    subgraph db["todos-db: Postgres Container"]
        dbPorts("Ports: 5432:5432")
        dbVol1[postgres-data:/var/lib/postgresql/data:delegated]
    end

    subgraph app["todos-app: Application Container"]
        appVol[./logs:/root/app/logs]
    end

    subgraph backup["todos-db-backup: Backup Container"]
        backupVol[~/pgbackups:/backups]
    end

    db --> app
    db --> backup

    classDef ports fill:#9cf,stroke:#333,stroke-width:2px, color:#333;

    class dbVol1 volumes;
    class appVol volumes;
    class backupVol volumes;

    class dbPorts ports;
```