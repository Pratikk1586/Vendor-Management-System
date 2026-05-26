/**
 * @fileoverview Department head vendor management API calls.
 */

import { axiosInstance } from '../utils/axiosInstance.js';
import { DEPT_VENDORS } from '../constants/apiRoutes.js';
import { buildApiParams } from '../utils/buildApiParams.js';

/**
 * Fetches vendors scoped to the department.
 * @param {object} [filters={}] Query filters.
 * @param {number} [page] Page number.
 * @param {number} [limit] Items per page.
 * @returns {Promise<object>}
 */
export async function getVendors(filters = {}, page, limit) {
  const response = await axiosInstance.get(DEPT_VENDORS, {
    params: buildApiParams(filters, page, limit),
  });
  return response.data;
}

/**
 * Fetches a vendor by ID.
 * @param {string} id Vendor ID.
 * @returns {Promise<object>}
 */
export async function getVendorById(id) {
  const response = await axiosInstance.get(`${DEPT_VENDORS}/${id}`);
  return response.data;
}

/**
 * Updates vendor status for the department.
 * @param {string} id Vendor ID.
 * @param {string} status New status.
 * @param {string} [reason] Optional reason.
 * @returns {Promise<object>}
 */
export async function updateVendorStatus(id, status, reason) {
  const response = await axiosInstance.patch(`${DEPT_VENDORS}/${id}`, {
    status,
    rejectionReason: reason,
  });
  return response.data;
}

/**
 * Updates vendor performance scores.
 * @param {string} id Vendor ID.
 * @param {object} scores Performance score fields.
 * @returns {Promise<object>}
 */
export async function updateVendorScore(id, scores) {
  const response = await axiosInstance.post(`${DEPT_VENDORS}/${id}/score`, scores);
  return response.data;
}

/**
 * Requests additional documents from a vendor.
 * @param {string} id Vendor ID.
 * @param {string} message Request message.
 * @returns {Promise<object>}
 */
export async function requestMoreDocuments(id, message) {
  const response = await axiosInstance.post(`${DEPT_VENDORS}/${id}/request-documents`, {
    message,
  });
  return response.data;
}
