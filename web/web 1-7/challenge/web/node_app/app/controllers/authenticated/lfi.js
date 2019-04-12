const fs = require('fs');

module.exports =  {
    get(req, res) {
        if (req.query.page == '../backup.sql') {
        	res.set('content-type', 'text/plaintext');
            res.send(fs.readFileSync('./app/inc/backup.sql').toString().replace("#{admin_username}", req.session.user.admin_username))
        } else {
        	if ((req.query.page.match(/..\//g) || []).length > 1) {
        		res.send("You don't have permission to read that file!")
        	} else {
        		res.send(`File /usr/app_root/pages/${req.query.page} not found!`)
        	}
        }
    }
};
