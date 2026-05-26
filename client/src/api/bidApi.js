/**
 * @fileoverview Vendor-facing bid API calls.
 */

import { axiosInstance } from '../utils/axiosInstance.js';
import { VENDOR_TENDERS, VENDOR_BIDS } from '../constants/apiRoutes.js';
import { buildApiParams } from '../utils/buildApiParams.js';

/**
 * Submits a bid for a tender.
 * @param {string} tenderId Tender ID.
 * @param {object} bidData Bid submission payload.
 * @returns {Promise<object>}
 */
export async function submitBid(tenderId, bidData) {
  const response = await axiosInstance.post(`${VENDOR_TENDERS}/${tenderId}/bid`, bidData);
  return response.data;
}

/**
 * Fetches the vendor's bids.
 * @param {object} [filters={}] Query filters.
 * @param {number} [page] Page number.
 * @param {number} [limit] Items per page.
 * @returns {Promise<object>}
 */
export async function getMyBids(filters = {}, page, limit) {
  const response = await axiosInstance.get(VENDOR_BIDS, {
    params: buildApiParams(filters, page, limit),
  });
  return response.data;
}

/**
 * Fetches a bid by ID.
 * @param {string} id Bid ID.
 * @returns {Promise<object>}
 */
export async function getBidById(id) {
  const response = await axiosInstance.get(`${VENDOR_BIDS}/${id}`);
  return response.data;
}
