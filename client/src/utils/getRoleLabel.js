/**
 * @fileoverview Role label and color utilities for UI badges.
 */

import { ROLE_LABELS, VENDOR, DEPT_HEAD, HR_ADMIN } from '../constants/roles.js';

/** @type {Record<string, string>} Role to Tailwind class map. */
const ROLE_COLORS = {
  [VENDOR]: 'bg-blue-100 text-tata-blue',
  [DEPT_HEAD]: 'bg-amber-100 text-amber-800',
  [HR_ADMIN]: 'bg-purple-100 text-purple-800',
};

const DEFAULT_ROLE_COLOR = 'bg-gray-100 text-gray-700';

/**
 * Returns the display label for a role.
 * @param {string} role Role key.
 * @returns {string}
 */
export function getRoleLabel(role) {
  return ROLE_LABELS[role] || role;
}

/**
 * Returns Tailwind classes for a role badge.
 * @param {string} role Role key.
 * @returns {string}
 */
export function getRoleColor(role) {
  return ROLE_COLORS[role] || DEFAULT_ROLE_COLOR;
}
