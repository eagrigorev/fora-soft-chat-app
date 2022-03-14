// Setting up the server
const express = require('express');
// Preventing possible cross-origin errors
const cors = require('cors');
const PORT = 8000;
const Message = require('../utils/dataFormatters');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});
app.use(express.json());
app.use(cors());

// The database
const rooms = new Map();

// Getting users and messages from the current room
app.get('/rooms/:id', (req, res) => {
	const { id: roomId } = req.params;
	const obj = rooms.has(roomId)
		? {
				users: [...rooms.get(roomId).get('users').values()],
				messages: [...rooms.get(roomId).get('messages').values()],
		  }
		: { users: [], messages: [] };
	res.json(obj);
});

// Adding a new user to the existing room, or creating a new one
app.post('/rooms', (req, res) => {
	const { roomId, userName } = req.body;
	if (!rooms.has(roomId)) {
		rooms.set(
			roomId,
			new Map([
				['users', new Map()],
				['messages', []],
			])
		);
	}
	res.send();
});

// Establishing the connection
io.on('connection', (socket) => {
	// A new user is joining the room
	socket.on('ROOM:JOIN', ({ roomId, userName }) => {
		socket.join(roomId);
		rooms.get(roomId).get('users').set(socket.id, userName);
		const users = [...rooms.get(roomId).get('users').values()];
		// Updating users with the new members list
		socket.broadcast.to(roomId).emit('ROOM:SET_USERS', users);
	});

	// Listening to new messages
	socket.on('ROOM:NEW_MESSAGE', ({ roomId, userName, text, time }) => {
		const obj = new Message(userName, text, time);
		// Updating our database with the new message and broadcasting it back to the chat
		rooms.get(roomId).get('messages').push(obj);
		socket.broadcast.to(roomId).emit('ROOM:NEW_MESSAGE', obj);
	});

	// Someone is leaving the chat
	socket.on('disconnect', () => {
		rooms.forEach((value, roomId) => {
			if (value.get('users').delete(socket.id)) {
				// Removing the user from the room's list and updating participants chart
				const users = [...value.get('users').values()];
				socket.broadcast.to(roomId).emit('ROOM:SET_USERS', users);
			}
		});
	});
});

server.listen(PORT, (err) => {
	if (err) {
		throw Error(err);
	}
	console.log(`Listening to port ${PORT}...`);
});
