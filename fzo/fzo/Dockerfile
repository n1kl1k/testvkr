FROM node:22 as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build


FROM nginx:alpine

COPY --from=build app/dist /usr/share/nginx/html

# добавляем свой nginx конфиг
COPY nginx/nginx.conf /etc/nginx/nginx.conf