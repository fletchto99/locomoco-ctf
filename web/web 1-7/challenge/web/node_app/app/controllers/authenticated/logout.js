module.exports =  {
    get(req, res) {
        req.session.destroy(err => {
            res.redirect("/");
        });
    }
};
