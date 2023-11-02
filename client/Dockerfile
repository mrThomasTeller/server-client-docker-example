# Образ из которого будем собирать контейнер
FROM node:18-slim

# рабочая папка проекта
WORKDIR /root/client

# копируем package.json и устанавливаем зависимости
COPY package.json .
COPY package-lock.json .

RUN npm install --omit=dev

# копируем все остальные файлы
COPY . .

# запускаем билд файлов фронтенда, после этого они появятся в папке /root/client/dist
RUN npm run build
