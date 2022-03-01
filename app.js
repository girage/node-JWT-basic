require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

PORT = process.env.PORT || 4000;



// Middleware
app.use(express.static('./public'));
app.use(express.json);


app.get('/', (req,res) => {
  res.send('<h1> Hello World </h>');
})

const start = () => {
  app.listen(PORT, (req, res) => {
    console.log(`listening to port ${PORT}..`);
  })
}

start();