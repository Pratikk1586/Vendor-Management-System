/**
 * @fileoverview Indian currency formatting utilities.
 */

const INR_FORMATTER = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

/**
 * Formats an amount in Indian Rupees (₹).
 * @param {number} amount Amount to format.
 * @returns {string}
 */
export function formatINR(amount) {
  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return '₹0';
  }
  return INR_FORMATTER.format(amount);
}

/**
 * Formats an amount in crores (e.g. ₹1.25 Cr).
 * @param {number} amount Amount in rupees.
 * @returns {string}
 */
export function formatCrore(amount) {
  if (!amount) {
    return '₹0';
  }
  const crores = amount / 10000000;
  return `₹${crores.toFixed(2)} Cr`;
}

/**
 * Formats an amount in lakhs (e.g. ₹12.5 L).
 * @param {number} amount Amount in rupees.
 * @returns {string}
 */
export function formatLakh(amount) {
  if (!amount) {
    return '₹0';
  }
  const lakhs = amount / 100000;
  return `₹${lakhs.toFixed(2)} L`;
}
