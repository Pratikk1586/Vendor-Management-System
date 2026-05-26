/**
 * @fileoverview Application role identifiers and human-readable labels for the Tata Steel Colors portal.
 */

/** @type {'vendor'} User role for registered vendors. */
export const VENDOR = 'vendor';

/** @type {'dept_head'} User role for department heads. */
export const DEPT_HEAD = 'dept_head';

/** @type {'hr_admin'} User role for HR / portal administrators. */
export const HR_ADMIN = 'hr_admin';

/**
 * Maps each role constant to its display label in the UI.
 * @type {Record<string, string>}
 */
export const ROLE_LABELS = {
  [VENDOR]: 'Vendor',
  [DEPT_HEAD]: 'Department Head',
  [HR_ADMIN]: 'HR Admin',
};
