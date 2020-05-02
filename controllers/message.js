
const messageModel = require('./../models/message');


const getMessages = (req, res) => {
  try {
    let message = messageModel.getMessages();
    res.status(200);
    res.send(message);
  } catch (e) {
    // res.status(500); // These are the same things
    // res.end();
    res.sendStatus(500);
  }
}

const postMessage = (req, res) => {
  try {
    messageModel.postMessage(req.body);
    res.status(201);
    res.send(req.body);
  } catch (e) {
    res.sendStatus(500);
  }
}

module.exports = { 
  getMessages,
  postMessage
}