const express = require('express');
const router = express.Router();

router.get('',  (req, res) => {
    if (req.session.user) {
        res.redirect('/employee?page=dashboard.html');
    } else {
        res.render('unauthenticated/welcome', {
        	host: req.hostname
        });
    }

});

module.exports = router;
