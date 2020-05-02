const express = require('express');
const indexController = require('./../controllers/index');
const messageController = require('./../controllers/message');

const router = express.Router();

router.get('/', indexController);
router.get('/message', messageController);
router.post('/message', messageController);

module.exports = router;