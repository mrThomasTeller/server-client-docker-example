# Установить докер
curl -fsSL https://get.docker.com | sh

# собрать контейнеры из образов и запустить
docker compose up --build

# собрать контейнеры из образов и запустить в фоне
docker compose up --build -d

# деплой на чистый сервер:
git clone ...
cd ...
curl -fsSL https://get.docker.com | sh
docker compose up --build -d

# обновление задопленного приложения
git pull
docker compose up --build -d