/**
 * @fileoverview Wrapper for async Express route handlers to forward errors to next().
 */

/**
 * Wraps an async route handler and passes rejected promises to Express error middleware.
 * @param {function(import('express').Request, import('express').Response, import('express').NextFunction): Promise<void>} fn Async route handler.
 * @returns {function(import('express').Request, import('express').Response, import('express').NextFunction): void}
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = { asyncHandler };
