//Intentionally using an insecure method to store passwords
const md5 = require('md5');

module.exports = {
    hashPassword: password => {
        return md5(password)
    },
    verifyPassword: (password, hash) => {
        return md5(password).toUpperCase() == hash.toUpperCase()
    }
};
