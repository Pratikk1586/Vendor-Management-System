/**
 * @fileoverview Express application setup with middleware and API route mounting.
 */

const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const { corsMiddleware } = require('./config/cors');
const { apiLimiter } = require('./middleware/rateLimiter');
const auditLogger = require('./middleware/auditLogger');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes/index');

const app = express();

app.use(helmet());
app.use(corsMiddleware);
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Tata Steel Colors API is running', data: null, errors: null });
});

app.use('/api', apiLimiter);
app.use('/api', auditLogger);
app.use('/api', routes);

app.use(errorHandler);

module.exports = app;
