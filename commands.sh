# Установить докер
curl -fsSL https://get.docker.com | sh

# собрать контейнеры из образов и запустить
docker compose up --build

# собрать контейнеры из образов и запустить в фоне
docker compose up --build -d