const express = require('express');
const app = express();

app.use('/user', require('./user_route') );

module.exports = app;