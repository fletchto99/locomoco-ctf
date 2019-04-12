const database = require('../database');
const validator = require('../shared/validator');
const security = require('../shared/security');
const Promise = require('promise');

const self = module.exports = {
    register(params) {
        return new Promise((resolve, reject) => {
            var errors = validator.validate(params, {
                username: validator.isString,
                password: validator.isString,
                confirm_password: validator.isString,
                first_name: validator.isString,
                last_name: validator.isString,
                email: validator.isString
            });

            if (errors) {
                reject({
                    error: "Please fill out the form",
                    type: 'validation',
                    rejected_parameters: errors
                });
                return;
            }

            if (params.password != params.confirm_password) {
                reject({
                    error: 'Passwords do not match',
                    type: 'validation',
                    message: 'Passwords do not match'
                });
                return;
            }

            database.query({
                text: "SELECT COUNT(*) as count FROM Employees WHERE username = $1",
                values: [params.username]
            }).then(results => {
                if (results[0].count > 0) {
                    reject({
                        error: 'Username already taken!'
                    });
                } else {
                    database.query({
                        text: 'INSERT INTO Employees(Username, Password, First_Name, Last_Name, Email, Admin_User_ID) VALUES ($1, $2, $3, $4, $5, NULL) returning User_ID, Username',
                        values: [`admin_${Math.random().toString(36).substring(2, 10)}`, security.hashPassword(Math.random().toString(36).substring(2, 15)), "The", "Administrator", "admin@ctf.how"]
                    }).then(results_admin => {
                        database.query({
                            text: 'INSERT INTO Employees(Username, Password, First_Name, Last_Name, Email, Admin_User_ID) VALUES ($1, $2, $3, $4, $5, $6) returning User_ID',
                            values: [params.username, security.hashPassword(params.password), params.first_name, params.last_name, params.email, parseInt(results_admin[0].user_id)]
                        }).then(results => {
                            resolve({
                                user_id: parseInt(results[0].user_id),
                                admin_user_id: parseInt(results_admin[0].user_id),
                                admin_username: results_admin[0].username,
                                username: params.username,
                                first_name: params.first_name,
                                last_name: params.last_name,
                                email: params.email
                            })
                        }, error => {
                            reject({
                                error: 'An unexpected error has occurred! Please try again later.',
                                dev_error: error
                            });
                        });
                    }, error => {
                        console.log(error)
                        reject({
                            error: 'Error generating account! Please try again :('
                        });
                    });
                }
            }, () => {
                reject({
                    error: 'Error generating account!'
                });
            })
        });
    },

    authenticate(params) {
        return new Promise((resolve, reject) => {
            var errors = validator.validate(params, {
                username: validator.isString,
                password: validator.isString
            });

            if (errors) {
                reject({
                    error: "Please enter a valid username and password!",
                    type: 'validation',
                    rejected_parameters: errors
                });
                return;
            }

            if(params.username.toLowerCase() == 'fred') {
                if (params.password == 'pass') {
                    reject({
                        error: "Account disabled - we believe it was compromised! - flag{you-own-all-the-passwords}"
                    })
                } else {
                    reject({
                        error: "Invalid username or password!"
                    })
                }
                return;
            }

            database.query({
                text: "SELECT * FROM Employees WHERE Username = $1",
                values: [params.username]
            }).then(results => {
                if (results.length < 1) {
                    reject({
                        error: 'Invalid username or password!'
                    });
                } else if (security.verifyPassword(params.password, results[0].password)) {
                    delete results[0].password;
                    results[0].user_id = parseInt(results[0].user_id);

                    if (results[0].admin_user_id) {
                        results[0].admin_user_id = parseInt(results[0].admin_user_id);
                        database.query({
                            text: "SELECT * FROM Employees WHERE User_ID = $1",
                            values: [results[0].admin_user_id]
                        }).then(admin_results => {
                            results[0].admin_username = admin_results[0].username;
                            resolve(results[0]);
                        }, error => {
                            reject({
                                error: 'An unknown error occurred while logging in :('
                            });
                        });
                    } else {
                        results[0].admin_user_id = results[0].user_id
                        results[0].admin_username = results[0].username;
                        resolve(results[0]);
                    }
                } else {
                    reject({
                        error: 'Invalid username or password!'
                    });
                }
            }, error => {
                reject({
                    error: 'Error logging in, please try again later!',
                    dev_error: error
                });
            });
        });
    },
    updateProfile(params) {
        return new Promise((resolve, reject) => {

            if (params.password != params.confirm_password) {
                reject({
                    error: 'Passwords do not match'
                });
                return;
            }

            let columns = [];
            let values = [];

            if (params.first_name && params.first_name != '') {
                columns.push("first_name");
                values.push(params.first_name)
            }

            if (params.last_name && params.last_name != '') {
                columns.push("last_name");
                values.push(params.last_name);
            }

            if (params.email && params.email != '') {
                columns.push("email");
                values.push(params.email);
            }

            if (params.password && params.password != '') {
                columns.push("password");
                values.push(security.hashPassword(params.password))
            }

            let update = "";

            columns.forEach((item, index) => update += `${item} = $${index + 1},`);

            if (values.length == 0) {

                reject({
                    error: 'No values being updated'
                });
                return;
            }

            values.push(params.user_id);

            database.query({
                text: `UPDATE Employees SET ${update.substr(0, update.length - 1)} WHERE User_ID = $${columns.length + 1}`,
                values: values
            }).then(() => {
                database.query({
                    text: "SELECT * FROM Employees WHERE User_ID = $1",
                    values: [params.user_id]
                }).then(results => {
                    delete results[0].password;
                    results[0].user_id = parseInt(results[0].user_id);
                    resolve(results[0]);
                }, error => {
                    reject({
                        error: 'Profile updated, setting will take effect next time you log in!',
                        dev_error: error
                    });
                });
            }, error => {
                reject({
                    error: 'Error updating profile!',
                    dev_error: error
                });
            });
        });
    }


};
