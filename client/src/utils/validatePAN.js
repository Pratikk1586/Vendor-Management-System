/**
 * @fileoverview Indian PAN number validation utility.
 */

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

/**
 * Validates an Indian PAN format.
 * @param {string} str PAN string to validate.
 * @returns {boolean}
 */
export function isValidPAN(str) {
  if (!str || typeof str !== 'string') {
    return false;
  }
  return PAN_REGEX.test(str.trim().toUpperCase());
}
