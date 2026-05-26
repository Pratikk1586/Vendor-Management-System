/**
 * @fileoverview Standard API response envelope helpers for success and error responses.
 */

const { OK } = require('../constants/httpCodes');

/**
 * Sends a successful JSON response using the standard envelope.
 * @param {import('express').Response} res Express response object.
 * @param {*} [data=null] Response payload.
 * @param {string} [message='Success'] Human-readable message.
 * @param {number} [statusCode=200] HTTP status code.
 * @returns {import('express').Response}
 */
function success(res, data = null, message = 'Success', statusCode = OK) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    errors: null,
  });
}

/**
 * Sends an error JSON response using the standard envelope.
 * @param {import('express').Response} res Express response object.
 * @param {string} [message='An error occurred'] Human-readable message.
 * @param {number} [statusCode=500] HTTP status code.
 * @param {*} [errors=null] Validation or error details.
 * @returns {import('express').Response}
 */
function error(res, message = 'An error occurred', statusCode = 500, errors = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
    errors,
  });
}

module.exports = { success, error };
