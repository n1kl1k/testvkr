# Сборка
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /build

# Копируем всё приложение
COPY fzo.rusoil/ .

# Скачиваем зависимости (ускоряет сборку)
RUN mvn dependency:go-offline

# Собираем проект
RUN mvn clean package -DskipTests

# Запуск
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Копируем jar из стадии сборки
COPY --from=build /build/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]