# Dockerfile para un proyecto de nest.js
FROM node:22.15-slim
# Establecer el directorio de trabajo
WORKDIR /usr/src/app
# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./
# Instalar las dependencias
RUN npm install
# Copiar el resto de los archivos del proyecto
COPY dist ./
# Exponer el puerto en el que la aplicación escucha
EXPOSE 3000
# Comando para iniciar la aplicación
CMD ["node", "main.js"]
