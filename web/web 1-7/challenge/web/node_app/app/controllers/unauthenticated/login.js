const express = require('express');
const router = express.Router();

const user = require('../../models/user');

router.get('', (req, res) => {
    res.render('unauthenticated/login', {
        redirect: req.query.redirect || false
    });
});

router.post('', (req, res) => {
    if (req.session.user != null) {
        res.redirect('/employee?page=dashboard.html')
    } else {
        user.authenticate(req.body).then(result => {
            req.session.user = result;
            if (req.body.redirect) {
                //Probably not going to cover 100% of cases (i.e. rev proxies)
                if (!req.body.redirect.includes(req.hostname)) {
                    res.render('authenticated/open_redirect', {
                        flag: "flag{open-redirects-no-good}",
                        warning: `In a real life scenario this would have redirected to ${req.body.redirect}!`
                    })
                } else {
                    res.redirect(req.body.redirect);
                }
            } else {
                res.redirect('/employee?page=dashboard.html');
            }
        }, error => {
            res.render('unauthenticated/login', {
                error: error.error,
                redirect: req.query.redirect
            })
        });
    }
});

module.exports = router;
