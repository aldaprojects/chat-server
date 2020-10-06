const { URL_DB } = require('../config/env');

const mongoose = require('mongoose');

module.exports.connect = () => {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);

    mongoose.connect(
        URL_DB,
        { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
        err => {
            if( err ) throw err;
            console.log('BD online');
        }
    );
}