const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// Routes import
const productsRoute = require('./api/routes/products');
const ordersRoute = require('./api/routes/orders');

const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended : false
  })
);

// Routes
app.use('/products', productsRoute);
app.use('/orders', ordersRoute);

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
