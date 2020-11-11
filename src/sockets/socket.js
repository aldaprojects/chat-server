const { io } = require('../app');


const User = require('../schemas/user');
const Message = require('../schemas/message');

const usersOnline = [];

io.on('connect', socket => {

    console.log('Se conectó', socket.id, io.engine.clientsCount)

    socket.on('joinRoom', async (id, callback = () => { }) => {

        console.log(`user wid id [${id}] has connected`)

        socket.join('chat-room');

        await User.findByIdAndUpdate(id, { connected: true })
            .exec();

        usersOnline.push({
            socket_id: socket.id,
            user_id: id
        });

        const users = await User.find({}).exec();
        io.to('chat-room').emit('users-online', users);

        const messages = await Message.find({})
            .sort({date: 1})
            .exec();

        io.to('chat-room').emit('messages', messages);

        callback({
            ok: true,
            error: null,
            body: `user with id [${id}] has connected`
        });
    });

    socket.on('update', async () => {
        const users = await User.find({}).exec();
        io.to('chat-room').emit('users-online', users);
    });

    socket.on('new-message', async message => {

        await Message.create(message);

        await updateMsgs();
    });

    socket.on('disconnect', async () => {

        for (let i = 0; i < usersOnline.length; i++) {
            if (socket.id === usersOnline[i].socket_id) {
                console.log(`User with id [${usersOnline[i].user_id} has desconnected`);
                User.findByIdAndUpdate(usersOnline[i].user_id, { connected: false })
                    .exec().then(async resp => {
                        const users = await User.find({})
                            .exec();

                        io.to('chat-room').emit('users-online', users);
                    });
                break;
            }
        }
    });
});

const updateMsgs = async () => {
    const messages = await Message.find({})
        .sort({date: 1})
        .exec();

    io.to('chat-room').emit('messages', messages);
}

module.exports = {
    updateMsgs
}