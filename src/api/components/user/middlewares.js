
const validateBody = (req, res, next) => {
    const { id, username, email, password } = req.body;

    const undefinedKeys = [];

    if( !id ) {
        undefinedKeys.push('id');
    }
    if( !username ) {
        undefinedKeys.push('username');
    } else {
        if( username.length < 4 ) {
            return res.status(404).json({
                ok: false,
                error: 'username must be at least 4 characters',
                body: null
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
                body: null
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
                body: null
            });
        }
    }

    if( undefinedKeys.length > 0 ){
        return res.status(400).json({
            ok: false,
            error: `properties ${ undefinedKeys } are not defined in the json request`,
            body: null
        });
    } 

    next();

}

module.exports = {
    validateBody
}