# Dockerfile pour le backend Spring Boot
FROM openjdk:21-jdk-slim

# Métadonnées
LABEL maintainer="skinalogy-team"
LABEL description="Backend Spring Boot pour Skinalogy"

# Répertoire de travail
WORKDIR /app

# Copier le fichier JAR
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

# Exposer le port
EXPOSE 8080

# Variables d'environnement
ENV SPRING_PROFILES_ACTIVE=docker
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# Commande de démarrage
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1