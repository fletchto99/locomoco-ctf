from node:8

ENV APP_HOST 0.0.0.0
ENV APP_PORT 9002

WORKDIR /usr/app

COPY ./node_app/ .

RUN npm install express

CMD node app.js
