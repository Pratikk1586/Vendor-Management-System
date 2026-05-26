/**
 * @fileoverview Indian GST number validation utility.
 */

const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

/**
 * Validates an Indian GST identification number format.
 * @param {string} str GST string to validate.
 * @returns {boolean}
 */
export function isValidGST(str) {
  if (!str || typeof str !== 'string') {
    return false;
  }
  return GST_REGEX.test(str.trim().toUpperCase());
}
