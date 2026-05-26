/**
 * @fileoverview Vendor-facing contract API calls.
 */

import { axiosInstance } from '../utils/axiosInstance.js';
import { VENDOR_CONTRACTS } from '../constants/apiRoutes.js';
import { buildApiParams } from '../utils/buildApiParams.js';

/**
 * Fetches contracts for the authenticated vendor.
 * @param {object} [filters={}] Query filters.
 * @param {number} [page] Page number.
 * @param {number} [limit] Items per page.
 * @returns {Promise<object>}
 */
export async function getMyContracts(filters = {}, page, limit) {
  const response = await axiosInstance.get(VENDOR_CONTRACTS, {
    params: buildApiParams(filters, page, limit),
  });
  return response.data;
}

/**
 * Fetches a contract by ID.
 * @param {string} id Contract ID.
 * @returns {Promise<object>}
 */
export async function getContractById(id) {
  const response = await axiosInstance.get(`${VENDOR_CONTRACTS}/${id}`);
  return response.data;
}
