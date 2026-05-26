/**
 * @fileoverview Express rate limiters for auth and general API routes.
 */

const rateLimit = require('express-rate-limit');

/**
 * Rate limiter for login and registration endpoints (5 requests per 15 minutes).
 * @type {import('express-rate-limit').RateLimitRequestHandler}
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again later.',
    data: null,
    errors: null,
  },
});

/**
 * Rate limiter for general API routes (100 requests per 15 minutes).
 * @type {import('express-rate-limit').RateLimitRequestHandler}
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
    data: null,
    errors: null,
  },
});

module.exports = { authLimiter, apiLimiter };
