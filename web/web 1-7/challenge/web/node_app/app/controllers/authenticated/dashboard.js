module.exports =  {
    get(req, res) {
        res.render('authenticated/dashboard', {
        	fname: req.session.user.first_name,
        	lname: req.session.user.last_name,
        	admin: req.session.user.user_id == req.session.user.admin_user_id,
        	xss: req.session.user.first_name.includes("<script") || req.session.user.last_name.includes("<script")
        });
    }
};
