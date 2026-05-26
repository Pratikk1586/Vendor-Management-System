/**
 * @fileoverview Role-based access and navigation helpers.
 */

import { useAuthStore } from '../store/authStore.js';
import { VENDOR, DEPT_HEAD, HR_ADMIN } from '../constants/roles.js';
import {
  VENDOR_DASHBOARD,
  DEPT_DASHBOARD,
  ADMIN_DASHBOARD,
} from '../constants/routes.js';

/** @type {Record<string, string>} Role to dashboard path map. */
const DASHBOARD_PATHS = {
  [VENDOR]: VENDOR_DASHBOARD,
  [DEPT_HEAD]: DEPT_DASHBOARD,
  [HR_ADMIN]: ADMIN_DASHBOARD,
};

/**
 * Returns role-checking utilities and dashboard path resolver.
 * @returns {object}
 */
export function useRole() {
  const role = useAuthStore((state) => state.role);

  /**
   * Checks if the current user role matches the required role.
   * @param {string|string[]} requiredRole Single role or array of allowed roles.
   * @returns {boolean}
   */
  const canAccess = (requiredRole) => {
    if (!role) {
      return false;
    }
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(role);
    }
    return role === requiredRole;
  };

  /**
   * Returns the dashboard path for the current or given role.
   * @param {string} [targetRole] Optional role override.
   * @returns {string}
   */
  const getDashboardPath = (targetRole = role) => {
    return DASHBOARD_PATHS[targetRole] || '/';
  };

  return { canAccess, getDashboardPath, role };
}
