# backend/upload-server/Dockerfile

# Use uma imagem oficial do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e package-lock.json para o container
COPY package*.json ./

# Instala as dependências (express, multer, cors)
RUN npm install

# Copia o resto dos arquivos do projeto (o nosso server.js)
COPY . .

# Expõe a porta que o servidor vai usar
EXPOSE 4000

# O comando para iniciar o servidor
CMD ["node", "server.js"]