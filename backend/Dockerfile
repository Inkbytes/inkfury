FROM node:latest

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY package.json .

COPY . .

RUN npm install

EXPOSE 9000

CMD ["npm", "run", "start:dev"]