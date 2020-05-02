// Middleware

// Router

// Controllers


const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const router = express.Router();

const app = express();
const port = 3000;

app.use(morgan('tiny'));


app.use(router);
router.get('/', indexController);
router.get('/message', messageController);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => {
  console.log(`TherapyBot listening at http://localhost:${port}`)
});
