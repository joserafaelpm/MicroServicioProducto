#Obtener img de dockerHub
FROM node:stretch-slim
WORKDIR  /usr/src/app
COPY package*.json ./

RUN npm install
 #Solve the problem reinstaling bcrypt

COPY . .

EXPOSE 8005

CMD ["npm", "start"]