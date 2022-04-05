FROM node:14

RUN npm i -g @nestjs/cli

COPY backend/package.json .

RUN npm install

COPY ./backend/. .

EXPOSE 3000

CMD ["nest", "start"]