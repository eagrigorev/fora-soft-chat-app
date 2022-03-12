class User {
  id;
  name;
  room;
  constructor(id, name, room) {
    this.id = id;
    this.name = name;
    this.room = room;
  };
};

// All active users/sessions
const users = [];

// Creating an instance of a new user
const userJoin = (id, name, room) => {
  const user = new User(id, name, room);
  users.push(user);
  return user;
};

// Deleting the user when they leaves/disconnects
const userLeft = (id) => {
  const idLeft = users.findIndex((user) => {
    user.id === id;
  });
  // Assuming that all indexes are unique, deleting the first found user
  if (idLeft != -1) {
    return users.splice(idLeft, 1)[0];
  }
};

// Finding a particular user by id
const userFind = (id) => {
  return (users.find((user) => {
    user.id === id;
  }));
};

module.exports = {
  userJoin,
  userLeft,
  userFind
};