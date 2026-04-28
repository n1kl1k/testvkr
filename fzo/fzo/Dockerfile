# build stage
FROM node:22 AS build

WORKDIR /app

COPY fzo/fzo/package*.json ./
RUN npm install

COPY fzo/fzo/ .
RUN npm run build

# nginx stage
FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80