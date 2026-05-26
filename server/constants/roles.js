/**
 * @fileoverview Application role identifiers and human-readable labels (mirrors client constants).
 */

/** @type {'vendor'} User role for registered vendors. */
const VENDOR = 'vendor';

/** @type {'dept_head'} User role for department heads. */
const DEPT_HEAD = 'dept_head';

/** @type {'hr_admin'} User role for HR / portal administrators. */
const HR_ADMIN = 'hr_admin';

/**
 * Maps each role constant to its display label.
 * @type {Record<string, string>}
 */
const ROLE_LABELS = {
  [VENDOR]: 'Vendor',
  [DEPT_HEAD]: 'Department Head',
  [HR_ADMIN]: 'HR Admin',
};

module.exports = {
  VENDOR,
  DEPT_HEAD,
  HR_ADMIN,
  ROLE_LABELS,
};
