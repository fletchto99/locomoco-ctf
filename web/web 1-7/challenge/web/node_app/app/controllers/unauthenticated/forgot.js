const express = require('express');
const router = express.Router();

const recovery = require('../../models/recovery');

router.get('', (req, res) => {
    res.render('unauthenticated/forgot');
});

router.post('', (req, res) => {
    recovery.recover(req.body).then(result => {
        res.render('unauthenticated/forgot', {
            code: `Your employee access code is "${result}"`
        });
    }, error => {
        console.log(error)
        res.render('unauthenticated/forgot', {
            error: error.error
        })
    });
});

module.exports = router;
