import React from 'react';
import socket from '../socket';
import moment from 'moment';

function Chat({ users, messages, userName, roomId, onAddMessage }) {
	const [messageValue, setMessageValue] = React.useState('');
	const messagesRef = React.useRef(null);

	// Disabling empty message submission
	const onSendMessage = () => {
		if (!messageValue) {
			return alert('No empty messages allowed');
		}
		// Notifying the server and adding a timestamp to the message via 'moment'-library
		socket.emit('ROOM:NEW_MESSAGE', {
			userName,
			roomId,
			text: messageValue,
			time: moment().format('h:mm a'),
		});

		onAddMessage({
			userName,
			text: messageValue,
			time: moment().format('h:mm a'),
		});
		setMessageValue('');
	};

	// Handling autoscrolling to the bottom of the message list
	React.useEffect(() => {
		messagesRef.current.scrollTo(0, 999999);
	}, [messages]);

	// Adding room name share functionality
	const copyToClipboard = () => {
		navigator.clipboard.writeText(roomId);
		alert('Copied!');
	};

	return (
		<section className="app__chat">
			<header className="app__chat__header">
				<h1>Fora Soft Evaluation Test App</h1>
			</header>
			<div className="app__chat__info">
				<div className="app__chat__room">
					<p>{roomId}</p>
					<button className="app__chat__share" onClick={copyToClipboard}>
						Share this room
					</button>
				</div>
				<div className="app__chat__users">
					<p>Online: {users.length}</p>
					<ul>
						{users.map((name, index) => (
							<li key={name + index}>{name}</li>
						))}
					</ul>
				</div>
			</div>
			<div className="app__chat__wrapper">
				<div ref={messagesRef} className="app__chat__messages">
					{messages.map((message, index) => (
						<article key={message + index} className="app__chat__message">
							<p>{message.text}</p>
							<span className="app__chat__message__signature">
								{message.userName} at {message.time}
							</span>
						</article>
					))}
				</div>
				<div className="app__chat__controls">
					<form>
						<textarea
							value={messageValue}
							onChange={(e) => setMessageValue(e.target.value)}
							className="app__chat__input"
							rows="5"
						></textarea>
						<button
							onClick={onSendMessage}
							type="button"
							className="app__chat__button"
						>
							Send
						</button>
					</form>
				</div>
			</div>
		</section>
	);
}

export default Chat;
