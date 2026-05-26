/**
 * @fileoverview Admin authorization code API calls.
 */

import { axiosInstance } from '../utils/axiosInstance.js';
import { ADMIN_AUTH_CODES } from '../constants/apiRoutes.js';

/**
 * Lists all authorization codes.
 * @returns {Promise<object>}
 */
export async function listCodes() {
  const response = await axiosInstance.get(ADMIN_AUTH_CODES);
  return response.data;
}

/**
 * Generates a new authorization code.
 * @returns {Promise<object>}
 */
export async function generateCode() {
  const response = await axiosInstance.post(ADMIN_AUTH_CODES);
  return response.data;
}

/**
 * Revokes an authorization code.
 * @param {string} code Code identifier to revoke.
 * @returns {Promise<object>}
 */
export async function revokeCode(code) {
  const response = await axiosInstance.delete(`${ADMIN_AUTH_CODES}/${code}`);
  return response.data;
}
