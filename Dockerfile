# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Instala Vite globalmente
RUN npm install -g create-vite

# Copia el archivo package.json y package-lock.json si existen
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto 3000 (React usará este puerto)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]

