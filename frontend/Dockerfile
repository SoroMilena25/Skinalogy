# Dockerfile simple pour React avec serveur intégré
FROM node:20-alpine

# Répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 3000

# Commande de démarrage (serveur de dev)
CMD ["npm", "start"]