/**
 * @fileoverview Admin registration approval API calls.
 */

import { axiosInstance } from '../utils/axiosInstance.js';
import { ADMIN_APPROVALS } from '../constants/apiRoutes.js';
import { buildApiParams } from '../utils/buildApiParams.js';

/**
 * Fetches pending registration approvals.
 * @param {object} [filters={}] Query filters.
 * @param {number} [page] Page number.
 * @param {number} [limit] Items per page.
 * @returns {Promise<object>}
 */
export async function getPendingApprovals(filters = {}, page, limit) {
  const response = await axiosInstance.get(ADMIN_APPROVALS, {
    params: buildApiParams(filters, page, limit),
  });
  return response.data;
}

/**
 * Approves a pending registration.
 * @param {string} id User ID.
 * @param {string} [notes] Optional approval notes.
 * @returns {Promise<object>}
 */
export async function approveRegistration(id, notes) {
  const response = await axiosInstance.post(`${ADMIN_APPROVALS}/${id}/approve`, {
    notes,
  });
  return response.data;
}

/**
 * Rejects a pending registration.
 * @param {string} id User ID.
 * @param {string} reason Rejection reason.
 * @returns {Promise<object>}
 */
export async function rejectRegistration(id, reason) {
  const response = await axiosInstance.post(`${ADMIN_APPROVALS}/${id}/reject`, {
    reason,
  });
  return response.data;
}
