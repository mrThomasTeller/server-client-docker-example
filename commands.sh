# Установить докер
curl -fsSL https://get.docker.com | sh

# собрать контейнеры из образов
docker compose build

# запустить контейнеры
docker compose up

# запустить контейнеры в фоне
docker compose up -d