const user = require('../../models/user');

module.exports = {
    get(req, res) {
        res.render('authenticated/profile', {
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email
        });
    },
    post(req, res) {
        console.log("Test")
        req.body.user_id = req.session.user.user_id;
        if (req.cookies.admin) {
            if (req.cookies.admin !== req.session.admin) {
                res.render('authenticated/profile', {
                    error: error.error
                });
            }
            req.body.user_id = req.session.user.admin_user_id;
        }
        user.updateProfile(req.body).then(result => {
            if (req.body.user_id != 1) {
               req.session.user = result;
            }
            res.render('authenticated/profile', {
                error: "Profile successfully updated",
                first_name: req.session.user.first_name,
                last_name: req.session.user.last_name,
                email: req.session.user.email
            })
        }, error => {
            res.render('authenticated/profile', {
                error: error.error,
                first_name: req.session.user.first_name,
                last_name: req.session.user.last_name,
                email: req.session.user.email
            })
        });

    }
};
