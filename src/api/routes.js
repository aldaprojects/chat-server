const express = require('express');
const app = express();

const Message = require('../schemas/message');
const { updateMsgs } = require('../sockets/socket');

app.use( '/user', require('./components/user/routes') );

app.post('/msg', async (req, res) => {

    const msg = req.body;

    await Message.create(msg);

    await updateMsgs();

    return res.status(200).json({
        ok: true,
        error: null,
        body: 'done'
    });
});

module.exports = app;