FROM node:22 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
# 👇 Копируем nginx конфиг
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 👇 Копируем билд фронта
COPY --from=build /app/dist /usr/share/nginx/html