const express = require('express');
const database = require('./database');

database.connect({
    "host": process.env.DB_HOST || "localhost",
    "port": parseInt(process.env.DB_PORT) || 5432,
    "database": process.env.DB_DATABASE || "lab4",
    "user": process.env.DB_USER || "postgres",
    "password": process.env.DB_PASSWORD || "postgres"
}, null).then(() => {
    let app = express();

    //pretty print html
    app.locals.pretty = true;

    app.set('trust proxy', 1);

    //Relative to root dir of app
    app.set('views', './app/views');
    app.set('view engine', 'pug');
    console.log("Views loaded!")

    //Relative to current dir
    app.use('/', require('./middleware'));
    console.log("Middleware loaded!")

    app.use('/', require('./controllers'));
    console.log("Controllers loaded!")

    app.listen(parseInt(process.env.APP_PORT) || 1337, process.env.APP_HOST || '0.0.0.0', () => {
        console.log("Challenge ready!")
    });
}, () => {
    process.exit(1);
});
