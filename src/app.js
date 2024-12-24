const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/routes');
const cors = require('cors');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
const { loggerMiddleware } = require('./middlewares/loggerMiddleware');

const app = express();

// Middlewares
app.use(express.json());
app.use(loggerMiddleware);
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/', routes);

// Error Handling Middleware
app.use(errorMiddleware);

module.exports = app;