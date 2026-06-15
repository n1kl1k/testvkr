FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /build

COPY fzo.rusoil/ .

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jdk

WORKDIR /app

RUN apt-get update && apt-get install -y curl

COPY --from=build /build/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]