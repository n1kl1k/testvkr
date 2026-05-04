# Сборка
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /build

COPY fzo.rusoil/ .

RUN mvn clean package -DskipTests

# Запуск
FROM eclipse-temurin:21-jdk

WORKDIR /app

# 👉 ВСТАВИТЬ ВОТ СЮДА
RUN apt-get update && apt-get install -y curl

# Копируем jar
COPY --from=build /build/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]