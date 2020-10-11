const { error } = require('../../../config/errors');


const validateBody = (req, res, next) => {

    const { username, email, password } = req.body;

    const undefinedKeys = [];
    
    if( !username ) {
        undefinedKeys.push('username');
    } else {
        if( username.length < 4 ) {
            return res.status(404).json({
                ok: false,
                error: 'username must be at least 4 characters',
                body: null,
                error_code: error.notlength
            });
        }
    }
    if( !email ) {
        undefinedKeys.push('email');
    } else {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if( !regex.test(email) ) {
            return res.status(404).json({
                ok: false,
                error: 'email is not valid',
                body: null,
                error_code: error.emailnotvalid
            });
        }
    }
    if( !password ) {
        undefinedKeys.push('password');
    } else {
        if( password.length < 7 ) {
            return res.status(404).json({
                ok: false,
                error: 'password must be at least 7 characters',
                body: null,
                error_code: error.notlength
            });
        }
    }

    if( undefinedKeys.length > 0 ){
        return res.status(400).json({
            ok: false,
            error: `properties [${ undefinedKeys }] are not defined in the json request`,
            body: null,
            error_code: error.propertiesnotdefined
        });
    } 

    next();

}

const validateLogin = (req, res, next) => {

    const { email, password } = req.body;

    const undefinedKeys = [];

    if( !email ) {
        undefinedKeys.push('email');
    } else {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if( !regex.test(email) ) {
            return res.status(404).json({
                ok: false,
                error: 'email is not valid',
                body: null,
                error_code: error.emailnotvalid
            });
        }
    }
    if( !password ) {
        undefinedKeys.push('password');
    } else {
        if( password.length < 7 ) {
            return res.status(404).json({
                ok: false,
                error: 'password must be at least 7 characters',
                body: null,
                error_code: error.notlength
            });
        }
    }

    if( undefinedKeys.length > 0 ){
        return res.status(400).json({
            ok: false,
            error: `properties [${ undefinedKeys }] are not defined in the json request`,
            body: null,
            error_code: error.propertiesnotdefined
        });
    } 

    next();

}

module.exports = {
    validateBody,
    validateLogin
}