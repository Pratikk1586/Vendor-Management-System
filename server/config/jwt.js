/**
 * @fileoverview JWT access and refresh token signing and verification utilities.
 */

const jwt = require('jsonwebtoken');

/**
 * Signs a short-lived access token.
 * @param {object} payload JWT payload (user id, role, etc.).
 * @returns {string} Signed access token.
 */
function signAccessToken(payload) {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '8h';

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign(payload, secret, { expiresIn });
}

/**
 * Signs a long-lived refresh token.
 * @param {object} payload JWT payload (typically user id).
 * @returns {string} Signed refresh token.
 */
function signRefreshToken(payload) {
  const secret = process.env.JWT_REFRESH_SECRET;
  const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET is not defined in environment variables');
  }

  return jwt.sign(payload, secret, { expiresIn });
}

/**
 * Verifies an access token and returns the decoded payload.
 * @param {string} token JWT access token.
 * @returns {object} Decoded payload.
 */
function verifyAccessToken(token) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.verify(token, secret);
}

/**
 * Verifies a refresh token and returns the decoded payload.
 * @param {string} token JWT refresh token.
 * @returns {object} Decoded payload.
 */
function verifyRefreshToken(token) {
  const secret = process.env.JWT_REFRESH_SECRET;

  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET is not defined in environment variables');
  }

  return jwt.verify(token, secret);
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
