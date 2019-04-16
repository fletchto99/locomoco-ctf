from node:8

ENV APP_HOST 0.0.0.0
ENV APP_PORT 9009

WORKDIR /usr/app

COPY ./node_app/ .

RUN npm install

CMD node app.js
