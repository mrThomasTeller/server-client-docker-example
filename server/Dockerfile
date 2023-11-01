FROM node:18-slim

WORKDIR /root/server

COPY package.json .
COPY package-lock.json .

RUN npm install --omit=dev

COPY . .

EXPOSE ${PORT}

CMD npm run start