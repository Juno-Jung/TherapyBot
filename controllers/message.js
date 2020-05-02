
const { getMessage, postMessage } = require('./../models/message');

const messageController = (req, res) => {
  // Gets messages from chat and sends them back
  if (req.method === 'GET') {
    let message = getMessage;
    res.status(200);
    res.send(message);
  }

  // Posts a new message into the chat.
  if (req.method === 'POST') {
    postMessage(req.body);
    res.status(200);
    res.send('Data received and stored!');
  }
};

module.exports = messageController;