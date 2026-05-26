/**
 * @fileoverview Department head tender management API calls.
 */

import { axiosInstance } from '../utils/axiosInstance.js';
import { DEPT_TENDERS } from '../constants/apiRoutes.js';
import { buildApiParams } from '../utils/buildApiParams.js';

/**
 * Fetches tenders for the department.
 * @param {object} [filters={}] Query filters.
 * @param {number} [page] Page number.
 * @param {number} [limit] Items per page.
 * @returns {Promise<object>}
 */
export async function getTenders(filters = {}, page, limit) {
  const response = await axiosInstance.get(DEPT_TENDERS, {
    params: buildApiParams(filters, page, limit),
  });
  return response.data;
}

/**
 * Fetches a tender by ID.
 * @param {string} id Tender ID.
 * @returns {Promise<object>}
 */
export async function getTenderById(id) {
  const response = await axiosInstance.get(`${DEPT_TENDERS}/${id}`);
  return response.data;
}

/**
 * Creates a new tender.
 * @param {object} data Tender payload.
 * @returns {Promise<object>}
 */
export async function createTender(data) {
  const response = await axiosInstance.post(DEPT_TENDERS, data);
  return response.data;
}

/**
 * Updates a tender.
 * @param {string} id Tender ID.
 * @param {object} data Fields to update.
 * @returns {Promise<object>}
 */
export async function updateTender(id, data) {
  const response = await axiosInstance.put(`${DEPT_TENDERS}/${id}`, data);
  return response.data;
}

/**
 * Publishes a draft tender.
 * @param {string} id Tender ID.
 * @returns {Promise<object>}
 */
export async function publishTender(id) {
  const response = await axiosInstance.post(`${DEPT_TENDERS}/${id}/publish`);
  return response.data;
}

/**
 * Cancels a tender.
 * @param {string} id Tender ID.
 * @param {string} reason Cancellation reason.
 * @returns {Promise<object>}
 */
export async function cancelTender(id, reason) {
  const response = await axiosInstance.post(`${DEPT_TENDERS}/${id}/cancel`, {
    cancelReason: reason,
  });
  return response.data;
}
