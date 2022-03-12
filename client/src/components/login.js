import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Login = ({ socket }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const sendCredentials = () => {
    if (name !== '' && room !== '') {
      socket.emit('userJoin', { name, room });
    } else {
      alert("Fill in your name and a room name.");
      window.location.reload();
    }
  };

  return (
    <div className="login">
      <h1>Fora Soft Evaluation Test App</h1>
      <input
        placeholder="Name"
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
      ></input>
      <input
        placeholder="Room"
        required
        value={room}
        onChange={(event) => setRoom(event.target.value)}
      ></input>
      <Link to={`/messaging/${room}/${name}`}>
        <button onClick={sendCredentials}>Join the Conversation</button>
      </Link>
    </div>
  );
};