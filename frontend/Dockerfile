FROM node:14

RUN npm install -g @vue/cli
RUN npm install -g vite

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8081

CMD ["vite", "--port", "8081", "--host"]