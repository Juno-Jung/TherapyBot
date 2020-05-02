// Middleware

// Router

// Controllers


const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const router = require('./router/router');

const app = express();
const port = 3000;

app.use(morgan('tiny'));
app.use(express.static('public'))

app.use(router);

app.listen(port, () => {
  console.log(`TherapyBot listening at http://localhost:${port}`)
});
