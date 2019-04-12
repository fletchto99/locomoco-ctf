const express = require('express');
const router = express.Router();

router.use('/register', require('./unauthenticated/register'));
router.use('/forgot', require('./unauthenticated/forgot'));
router.use('/login', require('./unauthenticated/login'));
router.use('/', require('./unauthenticated/welcome'));

router.get('/employee', (request, response) => {
    if (request.query.page == 'dashboard.html') {
        require('./authenticated/dashboard').get(request, response);
    } else if (request.query.page == 'profile.html') {
        require('./authenticated/profile').get(request, response);
    } else if (request.query.page == 'messenger.html') {
        require('./authenticated/messenger').get(request, response);
    } else if (request.query.page == 'logout.html') {
        require('./authenticated/logout').get(request, response);
    } else {
        require('./authenticated/lfi').get(request, response);
    }
});

router.post('/employee', (request, response) => {
    if (request.query.page == 'profile.html') {
        require('./authenticated/profile').post(request, response);
    } else if (request.query.page == 'messenger.html') {
        require('./authenticated/messenger').post(request, response);
    }
});

module.exports = router;
