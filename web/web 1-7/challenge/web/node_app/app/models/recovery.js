const database = require('../database');
const validator = require('../shared/validator');
const Promise = require('promise');

const self = module.exports = {
    recover(params) {
        return new Promise((resolve, reject) => {
            var errors = validator.validate(params, {
                code: validator.isString
            });

            if (params.code.length > 10) {
                reject({
                    error: "You're only allowed codes of 10 characters or less"
                });
            }

            if (errors) {
                reject({
                    error: "Please enter a recovery code",
                    type: 'validation',
                    rejected_parameters: errors
                });
                return;
            }

            //SQL Injection here! :D -- one of the things they need to find
            database.query({
                text: `SELECT Access_Code FROM Access_Codes WHERE Recovery_Code = '${params.code}'`,
            }).then(results => {
                if (results.length <= 0) {
                    reject({
                        error: 'Invalid recovery code!'
                    });
                } else {
                    resolve(results[0].access_code);
                }
            }, error => {
                reject({
                    error: `Error fetching code, please try again later! ${error}`,
                    dev_error: error
                });
            });
        });
    }
};
