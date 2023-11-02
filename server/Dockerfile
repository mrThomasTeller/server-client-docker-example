# Образ из которого будем собирать контейнер
FROM node:18-slim

# рабочая папка проекта
WORKDIR /root/server

# копируем package.json и устанавливаем зависимости
COPY package.json .
COPY package-lock.json .

# RUN - запускает команду во время сборки контейнера
RUN npm install --omit=dev

# копируем все остальные файлы
COPY . .

# открываем порт 3000 контейнера наружу
EXPOSE ${PORT}

# запускаем сервер при запуске контейнера
CMD npm start
