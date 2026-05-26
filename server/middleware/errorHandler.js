/**
 * @fileoverview Global Express error handler with standard response envelope.
 */

const mongoose = require('mongoose');
const { ZodError } = require('zod');
const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken');
const multer = require('multer');
const { logger } = require('../config/logger');
const { error } = require('../utils/responseEnvelope');
const {
  BAD_REQUEST,
  UNAUTHORIZED,
  CONFLICT,
  SERVER_ERROR,
} = require('../constants/httpCodes');

/**
 * Maps errors to HTTP responses using the standard envelope.
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  logger.error(`${req.method} ${req.originalUrl} — ${err.message}`);

  if (err instanceof ZodError) {
    return error(res, 'Validation failed', BAD_REQUEST, err.flatten());
  }

  if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
    return error(res, 'Invalid or expired token', UNAUTHORIZED);
  }

  if (err instanceof multer.MulterError) {
    return error(res, err.message, BAD_REQUEST, { code: err.code });
  }

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message);
    return error(res, 'Validation failed', BAD_REQUEST, errors);
  }

  if (err.name === 'CastError') {
    return error(res, 'Invalid resource identifier', BAD_REQUEST);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'field';
    return error(res, `${field} already exists`, CONFLICT);
  }

  const statusCode = err.statusCode || SERVER_ERROR;
  const message = err.message || 'Internal server error';

  return error(res, message, statusCode, err.errors || null);
}

module.exports = errorHandler;
