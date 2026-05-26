/**
 * @fileoverview Vendor-facing tender API calls.
 */

import { axiosInstance } from '../utils/axiosInstance.js';
import { VENDOR_TENDERS } from '../constants/apiRoutes.js';
import { buildApiParams } from '../utils/buildApiParams.js';

/**
 * Fetches open tenders for the vendor.
 * @param {object} [filters={}] Query filters.
 * @param {number} [page] Page number.
 * @param {number} [limit] Items per page.
 * @returns {Promise<object>}
 */
export async function getOpenTenders(filters = {}, page, limit) {
  const response = await axiosInstance.get(VENDOR_TENDERS, {
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
  const response = await axiosInstance.get(`${VENDOR_TENDERS}/${id}`);
  return response.data;
}
