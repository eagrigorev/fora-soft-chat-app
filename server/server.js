const PORT = require('./utils/const');
const { userJoin, userLeft, userFind } = require('./utils/user');
//const { createMessage } = require('./utils/message');

const express = require('express');
const cors = require('cors');
const socket = require('socket.io');

const app = express();
app.use(express());
app.use(cors());

var server = app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`);
});

const io = socket(server);

// Socket connection initialisation
io.on('connection', (socket) => {
  // New user joining the room
  socket.on("userJoin", ({ name, room }) => {
    const user = userJoin(socket.id, name, room);
    socket.join(user.room);
    console.log('join');

    // Welcome message to a newcomer
    socket.emit(
      'message',
      createMessage('Bot', `Welcome, ${user.name}!`)
    );

    // Notify message to everyone in that room
    socket.broadcast.to(user.room).emit(
      'message',
      createMessage('Bot', `${user.name} has joined the chat.`)
    );
  });

  // Someone is sending a message
  socket.on('messaging', (message) => {
    const user = userFind(socket.id);
    io.to(user.room).emit(
      'message',
      createMessage(user.name, message)
    );
  });

  // Someone is leaving the room or closing the app
  socket.on('disconnect', () => {
    const user = userLeft(socket.id);
    if (user) {
      io.to(user.room).emit(
        'message',
        createMessage('Bot', `${user.name} has left the chat.`)
      );
    };
  });
});