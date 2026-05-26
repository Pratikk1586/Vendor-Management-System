/**
 * @fileoverview Bcrypt password hashing and comparison utilities.
 */

const bcrypt = require('bcryptjs');

/**
 * Hashes a plain-text password using bcrypt.
 * @param {string} plain Plain-text password.
 * @returns {Promise<string>} Password hash.
 */
async function hashPassword(plain) {
  const rounds = parseInt(process.env.BCRYPT_ROUNDS, 10) || 12;
  return bcrypt.hash(plain, rounds);
}

/**
 * Compares a plain-text password against a stored hash.
 * @param {string} plain Plain-text password.
 * @param {string} hash Stored password hash.
 * @returns {Promise<boolean>} True if passwords match.
 */
async function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

module.exports = { hashPassword, comparePassword };
