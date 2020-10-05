const express = require('express');
const app = express();

app.use( require('./user_route') );

module.exports = app;