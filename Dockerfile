# 1. Basis-Image
FROM node:18-alpine AS builder

# 2. Arbeitsverzeichnis setzen
WORKDIR /app

# 3. Abhängigkeiten installieren
COPY package.json package-lock.json ./
RUN npm install

# 4. Projektdateien kopieren
COPY . .

# 5. Produktion-Build erstellen
RUN npm run build

# 6. Produktions-Image mit Nginx erstellen
FROM nginx:stable-alpine

# 7. Build-Ordner in den Nginx-Webserver kopieren
COPY --from=builder /app/dist /usr/share/nginx/html

# 8. Exponiere den Port 80 für den Webserver
EXPOSE 80

# 9. Nginx starten
CMD ["nginx", "-g", "daemon off;"] 