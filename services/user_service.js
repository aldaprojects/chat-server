const User = require('../models/user_model');

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
                message: 'Internal Server Error'
            }, null);
        }

        if( userFound.length > 0 ) {
            return callback({
                status: 400,
                message: 'user already exists'
            }, null)
        }

        _user.save((err, newUser) => {
            if( err ) {
                return callback({
                    status: 500,
                    message: 'Internal Server Error'
                }, null);
            }

            return callback(null, newUser)
        })
    });
}

const getUser = (id, callback) => {
    User.findById(id, (err, user) => {
        if( err ) {
            return callback({
                status: 500,
                message: 'Internal Server Error'
            }, null);
        }

        if( !user ) {
            return callback({
                status: 404,
                message: 'user not found'
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
        img: "no file"
    });

    User.findByIdAndUpdate(user.id, _user, (err, userFound) => {
        if( err ) {
            if( err.code === 11000 ) {
                return callback({
                    status: 400,
                    message: 'email already exists'
                }, null);
            }
            return callback({
                status: 500,
                message: 'Internal Server Error'
            }, null);
        }

        if( !userFound ) {
            return callback({
                status: 404,
                message: 'user not found'
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
                message: 'Internal Server Error'
            }, null);
        }

        if( !user ) {
            return callback({
                status: 404,
                message: 'user not found'
            }, null);
        }

        return callback(null, user)
    });
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}