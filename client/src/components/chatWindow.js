import React, { useState, useEffect, useRef } from "react";

export const ChatWindow = (({ name, room, socket }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      let tempMessages = messages;
      tempMessages.push(message);
      setMessages([...tempMessages]);
    });
  }, [socket]);

  const sendMessage = () => {
    if (message !== '') {
      socket.on('messaging', message);
      setMessage('');
    };
  };

  const messageListEnd = useRef(null);
  const scrollDown = () => {
    messageListEnd.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollDown, [messages]);

  return (
    <div className="chat-window">
      <div className="name">
        <h2>
          {name} in {room}
        </h2>
      </div>
      <div className="messages">
        {messages.map((message) => {
          if (message.author === name) {
            return (
              <div className="message">
                <p>{message.body}</p>
                <span>{message.author}</span>
              </div>
            );
          } else {
            return (
              <div className="message mess-right">
                <p>{message.body} </p>
                <span>{message.author}</span>
                <p>{message.timespan}</p>
              </div>
            );
          }
        })}
        <div ref={messageListEnd} />
      </div>
      <div className="send">
        <input
          placeholder="Your message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
        ></input>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
});