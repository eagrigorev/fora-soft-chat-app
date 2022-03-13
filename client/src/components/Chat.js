import React from 'react';
import socket from '../socket';

function Chat({ users, messages, userName, roomId, onAddMessage }) {
	const [messageValue, setMessageValue] = React.useState('');
	const messagesRef = React.useRef(null);

	const onSendMessage = () => {
		socket.emit('ROOM:NEW_MESSAGE', {
			userName,
			roomId,
			text: messageValue,
		});
		onAddMessage({ userName, text: messageValue });
		setMessageValue('');
	};

	React.useEffect(() => {
		messagesRef.current.scrollTo(0, 99999);
	}, [messages]);

	return (
		<section className="app__chat">
			<div className="app__chat__info">
				<p>
					Room Name: <b>{roomId}</b>
				</p>
				<p>
					<b>Online: {users.length}</b>
				</p>
				<ul>
					{users.map((name, index) => (
						<li key={name + index}>{name}</li>
					))}
				</ul>
			</div>
			<div className="app__chat__wrapper">
				<div ref={messagesRef} className="app__chat__messages">
					{messages.map((message) => (
						<article className="app__chat__message">
							<p>{message.text}</p>
							<span>{message.userName}</span>
						</article>
					))}
				</div>
				<div className="app__chat__controls">
					<form>
						<div className="app__chat__input">
							<textarea
								value={messageValue}
								onChange={(e) => setMessageValue(e.target.value)}
								className="app__chat__input"
								rows="3"
							></textarea>
						</div>
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
