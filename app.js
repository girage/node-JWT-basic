require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const mainRouter = require('./routes/main');

const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

// Middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1', mainRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

PORT = process.env.PORT || 4000;
URI = process.env.MONGO_URI;

const start = async () => {
  try {
    // await connectDB(URI);

    app.listen(PORT, () => console.log(`listening to port ${PORT}..`))
  } catch (error) {
    console.log(error);
  }

}

start();