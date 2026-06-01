/**
 * @fileoverview Global Express error handler with standard response envelope.
 */

const { ZodError } = require('zod');
const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken');
const multer = require('multer');
const { ValidationError, UniqueConstraintError, DatabaseError } = require('sequelize');
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

  // Handle Sequelize Validation Errors
  if (err instanceof ValidationError) {
    const errors = err.errors.map((e) => e.message);
    return error(res, 'Validation failed', BAD_REQUEST, errors);
  }

  // Handle Sequelize Unique Constraint Errors
  if (err instanceof UniqueConstraintError) {
    const field = err.errors[0]?.path || 'field';
    return error(res, `${field} already exists`, CONFLICT);
  }

  // Handle Sequelize Database Casting or Parsing Errors
  if (err instanceof DatabaseError && err.message.includes('truncated')) {
    return error(res, 'Invalid resource identifier or data truncation', BAD_REQUEST);
  }

  const statusCode = err.statusCode || SERVER_ERROR;
  const message = err.message || 'Internal server error';

  return error(res, message, statusCode, err.errors || null);
}

module.exports = errorHandler;
