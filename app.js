const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const indexRouter = require('./routes/index');

const app = express();
const port = 3000;

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('trust proxy', 'loopback')

// # My route
app.use(indexRouter);

// # When error = 500 (Server Error)
app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'Failed',
    statusCode: 500,
    message: 'Server Error!'
  });
});

// # When error = 404 (Not Found)
app.use((req, res, next) => {
  res.status(404).json({
    status: 'Failed',
    statusCode: 404,
    message: 'Route Not Found!'
  })
});

app.listen(port, () => {
  console.info(`Express Run in Port ${port}`);
});