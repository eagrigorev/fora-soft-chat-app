import React from 'react';
import axios from 'axios';

function JoinBlock({ onLogin }) {
	const [roomId, setRoomId] = React.useState('');
	const [userName, setUserName] = React.useState('');
	const [isLoading, setLoading] = React.useState(false);

	const onEnter = async () => {
		if (!roomId || !userName) {
			return alert('Fill in both fields!');
		}
		const obj = {
			roomId,
			userName,
		};
		setLoading(true);
		await axios.post('/rooms', obj);
		onLogin(obj);
	};

	return (
		<section className="app__login">
			<header className="app__login__header">
				<h1>Fora Soft Evaluation Test App</h1>
			</header>
			<div className="app__login__input">
				<input
					type="text"
					placeholder="Room Name"
					value={roomId}
					onChange={(e) => setRoomId(e.target.value)}
				/>
			</div>
			<div className="app__login__input">
				<input
					type="text"
					placeholder="John Doe"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
			</div>
			<button
				disabled={isLoading}
				onClick={onEnter}
				className="app__login__button"
			>
				{isLoading ? 'Loading...' : 'Join the Conversation'}
			</button>
		</section>
	);
}

export default JoinBlock;
