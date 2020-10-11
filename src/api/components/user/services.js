const User = require('../../../schemas/user');
const { error } = require('../../../config/errors');

const createUser = (user, callback) => {
    const _user = new User({
        email: user.email,
        password: user.password,
        username: user.username,
        img: "no file"
    });
    User.find({ email: user.email }, (err, userFound) => {
        if( err ) {
            return callback({
                status: 500,
                message: 'Internal Server Error',
                error_code: error.internalerror
            }, null);
        }

        if( userFound.length > 0 ) {
            console.log(error.userexists)
            return callback({
                status: 400,
                message: 'user already exists',
                error_code: error.userexists
            }, null)
        }

        _user.save((err, newUser) => {
            if( err ) {
                return callback({
                    status: 500,
                    message: 'Internal Server Error',
                    error_code: error.internalerror
                }, null);
            }

            return callback(null, newUser)
        })
    });
}

const login = (user, callback) => {

    User.findOne({ email: user.email }, (err, userFound) => {
        if( err ) {
            return callback({
                status: 500,
                message: 'Internal Server Error',
                error_code: error.internalerror
            }, null);
        }

        if( !userFound ) {
            return callback({
                status: 404,
                message: 'user not found',
                error_code: error.usernotfound
            }, null);
        }

        if ( user.password === userFound.password ) {
            console.log('si')
            return callback(null, userFound);
        } else {
            return callback({
                status: 401,
                message: 'incorrect password',
                error_code: error.loginfail
            }, null);
        }
    });
}

const getUser = (id, callback) => {
    User.findById(id, (err, user) => {
        if( err ) {
            return callback({
                status: 500,
                message: 'Internal Server Error',
                error_code: error.internalerror
            }, null);
        }

        if( !user ) {
            return callback({
                status: 404,
                message: 'user not found',
                error_code: error.usernotfound
            }, null);
        }

        return callback(null, user)
    });
}

const updateUser = (user, callback) => {
    const _user = new User({
        _id: user.id,
        email: user.email,
        password: user.password,
        username: user.username,
        connected: user.connected,
        img: "no file"
    });

    User.findByIdAndUpdate(user.id, _user, (err, userFound) => {
        if( err ) {
            if( err.code === 11000 ) {
                return callback({
                    status: 400,
                    message: 'email already exists',
                    error_code: error.emailexists
                }, null);
            }
            return callback({
                status: 500,
                message: 'Internal Server Error',
                error_code: error.internalerror
            }, null);
        }

        if( !userFound ) {
            return callback({
                status: 404,
                message: 'user not found',
                error_code: error.usernotfound
            }, null);
        }

        return callback(null, _user)
    });
}

const deleteUser = (id, callback) => {
    User.findByIdAndDelete(id, (err, user) => {
        if( err ) {
            return callback({
                status: 500,
                message: 'Internal Server Error',
                error_code: error.emailexists
            }, null);
        }

        if( !user ) {
            return callback({
                status: 404,
                message: 'user not found',
                error_code: error.usernotfound
            }, null);
        }

        return callback(null, user)
    });
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    login
}