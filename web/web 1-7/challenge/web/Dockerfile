FROM node:8

RUN apt-get update

# for https
RUN apt-get install -yyq ca-certificates
# install libraries
RUN apt-get install -yyq libappindicator1 libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6
# tools
RUN apt-get install -yyq gconf-service lsb-release wget xdg-utils
# and fonts
RUN apt-get install -yyq fonts-liberation

ENV APP_HOST 0.0.0.0
ENV APP_PORT 1337
ENV DEVELOPER_MODE false

ENV DB_HOST lab4_db
ENV DB_PORT 5432
ENV DB_USER postgres
ENV DB_PASSWORD postgres
ENV DB_DATABASE lab4

ENV SESSION_SECRET 24nj2rfiqmr2#!3
ENV SESSION_NAME user_session

WORKDIR /usr/app

COPY ./node_app/ .

RUN npm install
RUN npm install nodemon -g

CMD chmod +x wait-for-it.sh
CMD ./wait-for-it.sh db:5432 -- nodemon app.js


