const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let messageSchema = new Schema({
    message: { type: String },
    date: { type: Date },
    from: { type: Object }
});

module.exports = mongoose.model( 'message', messageSchema );