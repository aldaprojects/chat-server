const { PORT } = require('./config/env');
const mongo = require('./db/mongo');

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// module.exports.io = io;
// require('../services/sockets');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use( require('./api/routes') );

mongo.connect();

server.listen(PORT, () => {
    console.log(`Listening on port ${ PORT }`)
});
