
const db = require('./../db');

// Returns message object from database
const getMessage = db.msgs;

const postMessage = (message) => {
  db.msgs.push(message);
}

module.exports = {
  getMessage,
  postMessage
};