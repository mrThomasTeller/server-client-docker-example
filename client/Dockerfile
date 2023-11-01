FROM node:18-slim

WORKDIR /root/client

COPY package.json .
COPY package-lock.json .

RUN npm install --omit=dev

COPY . .

RUN npm run build
