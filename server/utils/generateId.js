/**
 * @fileoverview Human-readable ID generators for tenders, bids, and contracts.
 */

const crypto = require('crypto');

/**
 * Generates a random numeric suffix of given length.
 * @param {number} length Number of digits.
 * @returns {string}
 */
function randomDigits(length) {
  const max = 10 ** length;
  const num = crypto.randomInt(0, max);
  return String(num).padStart(length, '0');
}

/**
 * Generates a tender ID: TSC-TENDER-YYYYMMDD-XXXX.
 * @returns {string}
 */
function generateTenderId() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `TSC-TENDER-${y}${m}${d}-${randomDigits(4)}`;
}

/**
 * Generates a bid ID: TSC-BID-XXXX.
 * @returns {string}
 */
function generateBidId() {
  return `TSC-BID-${randomDigits(4)}`;
}

/**
 * Generates a contract ID: TSC-CON-XXXX.
 * @returns {string}
 */
function generateContractId() {
  return `TSC-CON-${randomDigits(4)}`;
}

module.exports = {
  generateTenderId,
  generateBidId,
  generateContractId,
};
