all: deploy

deploy:
	make build && make start-detached

build:
	docker compose build

start:
	docker compose up

start-detached:
	docker compose up --detach

stop:
	docker compose stop

bash:
	docker exec -it todos-app bash

app-log:
	docker compose logs app -f

all-logs:
	docker compose logs -f

prepare:
	docker || (curl -fsSL https://get.docker.com | sh)