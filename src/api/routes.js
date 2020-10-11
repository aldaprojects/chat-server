const express = require('express');
const app = express();

app.use( '/user', require('./components/user/routes') );

module.exports = app;