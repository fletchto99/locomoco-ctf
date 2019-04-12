const express = require('express');
const router = express.Router();

const user = require('../../models/user');

router.get('', (req, res) => {
    res.render('unauthenticated/register');
});

router.post('', (req, res) => {
    if (req.session.user) {
        res.render('unauthenticated/register', {
            error: "You must be logged out to register a new profile!"
        });
    } else if (!req.body.employee_access_code.includes('sql-injection-is-dangerous')) {
        res.render('unauthenticated/register', {
            error: "Invalid access code!"
        });
    } else {
        user.register(req.body).then(result => {
            res.redirect(`/login?redirect=http://${req.hostname}/employee?page=dashboard.html`);
        }, error => {
            res.render('unauthenticated/register', {
                error: error.error
            });
        });
    }
});

module.exports = router;
