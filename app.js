const { PORT, URL_DB } = require('./config/global');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use( require('./routes/router') );

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

app.listen(PORT, () => {
    console.log(`Listening on port ${ PORT }`)
});
