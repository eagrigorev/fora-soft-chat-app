class Message {
  author;
  body;
  timestamp;
  constructor(author, body) {
    this.author = author;
    this.body = body;
    this.timestamp = moment().format('h:mm a');
  };
};

const createMessage = (author, body) => {
  const message = new Message(author, body);
  return message;
};

module.exports = { createMessage };