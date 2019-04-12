const puppeteer = require('puppeteer');

module.exports = {
    get(req, res) {
        res.render('authenticated/messenger', {
            current_message: req.session.message || "",
            current_to: req.session.message_to || ""
        });
    },
    post(req, res) {
        if (!req.body.message) {
            res.render('authenticated/messenger', {
                message: "Error sending message, please make sure to enter a message to send to the admin."
            });
        } else {
            if (req.body.message.includes("<img")) {
                res.render('authenticated/messenger', {
                    message: `We currently don't support img tags!`
                });
            } else if (req.body.preview) {
                req.session.message = req.body.message;
                req.session.message_to = req.body.message_to;
                res.render('authenticated/messenger_preview', {
                    preview: req.body.message.split("document.cookie").join(`We've seen this attack before... no cookies for the cookie monster`)
                });
            } else if (req.body.message_to != req.session.user.admin_username) {
                res.render('authenticated/messenger', {
                    message: `No administrator found with the name "${req.body.message_to}". Perhaps the user you are messaging isn't an admin?`
                });
            } else {
                delete req.session.message;
                delete req.session.message_to;
                req.body.message = req.body.message.split("document.cookie").join(`We've seen this attack before... no cookies for the cookie monster`);
                req.session.admin = Math.random().toString(36).substring(7);
                req.session.save(() => {

                    let cookies = [
                        {
                            name: process.env.SESSION_NAME || "lab4",
                            value: req.cookies[process.env.SESSION_NAME || "lab4"],
                            domain: req.hostname,
                            path: "/"
                        },
                        {
                            name: 'admin',
                            value: req.session.admin,
                            domain: req.hostname,
                            path: '/'
                        },
                    ]

                    puppeteer.launch({
                        ignoreHTTPSErrors: true,
                        args: [
                            '--no-sandbox',
                            '--disable-setuid-sandbox',
                            '--disable-web-security'
                        ]
                    }).then(browser => (_browser = browser))
                        .then(browser => (_page = browser.newPage()))
                        .then(page => {
                            page.on('load', () => console.log("loaded"))
                            page.on('error', err => console.log(err))
                            page.on('pageerror', err => console.log(err))
                        })
                        .then(() => _page)
                        .then(page => page.setCookie(...cookies))
                        .then(() => _page)
                        .then(page => page.setContent(`<html><body>${req.body.message}</body></html>`))
                        .then(() => _browser.close())
                        .then(result => {
                            res.render('authenticated/messenger', {
                                message: `Message sent successfully to the administrator!`
                            });
                        }, err => {
                            console.log("Error rendering page");
                            console.log(err);
                            res.render('authenticated/messenger', {
                                message: `There was an unexpected error messaging the admin - contact CTF organizer!`
                            });
                        }).catch(err=>{
                            console.log(err)
                        })
                });
            }
        }
    }
};
