module.exports = {
    validate: (input, validation) => {
        var errors = {};
        Object.keys(validation).forEach(function (key) {
            if (!(key in input)) {
                errors[key] = "Expected a value";
            } else {
                var error = validation[key](input[key]);
                if (error) {
                    errors[key] = error;
                }
            }
        });
        return Object.keys(errors).length > 0 ? errors : null;
    },

    isInteger: value => {
        if (typeof(value) !== 'number' || !isFinite(value) || Math.floor(value) !== value) {
            return 'Expected an integer';
        }
    },

    isString: value => {
        if (typeof(value) !== 'string' || value.length == 0) {
            return 'Expected a string'
        }
    },

    isEmail: value => {
        if(typeof(value) !== 'string' || value.length == 0 ||  !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.exec(value))) {
            return 'Expected an email address'
        }
    }
};
