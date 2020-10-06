const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuarioSchma = new Schema({
    email: { unique: true, type: String, },
    password: { type: String },
    username: { type: String },
    img: { type: String, require: false }
});

usuarioSchma.methods.toJSON = function() {
    
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    delete userObject.__v;

    return userObject
};


module.exports = mongoose.model( 'user', usuarioSchma );