const express = require('express');
const basicAuth = require('express-basic-auth')
const bodyParser = require('body-parser');
const router = express.Router();

router.use('/admin', basicAuth({
    users: { 'admin': 'supersecret' },
    challenge: true
}))

router.use(bodyParser.urlencoded({
    extended: true
}));

module.exports = router;
