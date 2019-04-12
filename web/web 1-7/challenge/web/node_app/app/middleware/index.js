const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const router = express.Router();
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
const developer = require('../shared/developer');

let sessionObj = {
    "secret": process.env.SESSION_SECRET || "f21f35gf2232$#@",
    "name": process.env.SESSION_NAME || "user_session",
    "resave": false,
    "saveUninitialized": true,
    "cookie": {
        "secure": false,
        "HttpOnly": true
    }
};

sessionObj.store = new pgSession({
    pg: pg,
    conString: `postgresql://${process.env.DB_USER || "postgres"}:${process.env.DB_PASSWORD}@${process.env.DB_HOST || "localhost"}:${parseInt(process.env.DB_PORT) || 5432}/${process.env.DB_DATABASE || "lab4"}`,
    tableName: 'session'
});

if (developer.isDeveloperEnabled()) {
    router.use(morgan('combined'));
}

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(cookieParser());
router.use(session(sessionObj));
router.use('/employee', require('./auth'));

router.use(function(req, res, next) {
    res.header('X-XSS-Protection', 0);
    next();
});;

module.exports = router;
