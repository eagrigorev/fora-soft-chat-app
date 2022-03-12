import React from "react";
import { useParams } from "react-router-dom";
import io from 'socket.io-client';

import { ChatWindow } from './chatWindow';

const socket = io.connect('/');

export const Room = () => {
  const { name, room } = useParams();
  return (
    <div className="room">
      <ChatWindow
        name={name}
        room={room}
        socket={socket}
      />
    </div>
  );
};