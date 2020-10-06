const express = require('express');
const app = express();

app.use( require('./components/user/routes') );

module.exports = app;