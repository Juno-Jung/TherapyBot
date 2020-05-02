const express = require('express');
const indexController = require('./../controllers/index');
const messageController = require('./../controllers/message');

const router = express.Router();

// indexController is unnecessary as the index.html is being served from the public folder.
router.get('/', indexController);
router.get('/message', messageController.getMessages);
router.post('/message', messageController.postMessage);

module.exports = router;