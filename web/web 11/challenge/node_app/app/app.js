const basicAuth = require('express-basic-auth')
const express = require('express');

let app = express();

comments = [];

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

app.listen(parseInt(process.env.APP_PORT) || 9009, process.env.APP_HOST || '0.0.0.0', () => {
    console.log("Challenge ready!")
});


