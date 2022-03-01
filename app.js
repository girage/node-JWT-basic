require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

PORT = process.env.PORT || 4000;
URI = process.env.MONGO_URI;


// Middleware
app.use(express.static('./public'));
app.use(express.json);

const start = async () => {
  try {
    await connectDB(URI);

    app.listen(PORT, (req, res) => {
      console.log(`listening to port ${PORT}..`);
    })
  } catch (error) {
    console.log(error);
  }

}

start();