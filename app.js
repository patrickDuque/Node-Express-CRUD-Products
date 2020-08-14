// Libraries
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Routes
const routes = require('./api/routes/routes');

const app = express();
const port = process.env.PORT || 3000;
mongoose
  .connect(
    `mongodb+srv://patrick_duque:${process.env
      .MONGODBPASSWORD}@node-cluster-ysxsh.mongodb.net/node-cluster?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => console.log('connected'))
  .catch(err => console.log('cannot connect', { err }));

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use(routes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error : {
      message : error.message
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
