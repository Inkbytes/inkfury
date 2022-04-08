FROM node:latest

WORKDIR /app

RUN npm install -g @vue/cli
RUN npm install -g vite

COPY package.json .

COPY . .

RUN npm install

EXPOSE 8081

CMD ["npm", "run", "dev"]