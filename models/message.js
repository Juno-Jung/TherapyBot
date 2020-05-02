
const db = require('./../db');

// Returns message object from database
const getMessages = () => {
  return db.msgs;
}

const postMessage = (message) => {
  db.msgs.push(message);
}

module.exports = {
  getMessages,
  postMessage
};