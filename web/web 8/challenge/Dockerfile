from node:0.12.4-wheezy

ENV APP_HOST 0.0.0.0
ENV APP_PORT 9001
ENV SESSION_SECRET rm23krjf89d

WORKDIR /usr/app

COPY ./node_app/ .

RUN npm install express
RUN npm install express-session

CMD node app.js
