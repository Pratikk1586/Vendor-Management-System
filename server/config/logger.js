/**
 * @fileoverview Winston logger with console (dev) and file (prod) transports.
 */

const path = require('path');
const fs = require('fs');
const winston = require('winston');

const isProduction = process.env.NODE_ENV === 'production';
const logDir = path.resolve('logs');

if (isProduction && !fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ level, message, timestamp, stack }) => {
    if (stack) {
      return `${timestamp} [${level}]: ${message}\n${stack}`;
    }
    return `${timestamp} [${level}]: ${message}`;
  }),
);

/** @type {winston.transport[]} */
const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      logFormat,
    ),
  }),
];

if (isProduction) {
  transports.push(
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      format: logFormat,
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      format: logFormat,
    }),
  );
}

/**
 * Application logger instance.
 * @type {winston.Logger}
 */
const logger = winston.createLogger({
  level: isProduction ? 'info' : 'debug',
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  transports,
});

module.exports = { logger };
