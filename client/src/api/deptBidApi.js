/**
 * @fileoverview Department head bid evaluation API calls.
 */

import { axiosInstance } from '../utils/axiosInstance.js';
import { DEPT_TENDERS } from '../constants/apiRoutes.js';

/**
 * Fetches bids for a tender.
 * @param {string} tenderId Tender ID.
 * @returns {Promise<object>}
 */
export async function getBidsForTender(tenderId) {
  const response = await axiosInstance.get(`${DEPT_TENDERS}/${tenderId}/bids`);
  return response.data;
}

/**
 * Opens bid evaluation for a tender.
 * @param {string} tenderId Tender ID.
 * @returns {Promise<object>}
 */
export async function openBidEvaluation(tenderId) {
  const response = await axiosInstance.post(`${DEPT_TENDERS}/${tenderId}/open`);
  return response.data;
}

/**
 * Scores a bid against evaluation criteria.
 * @param {string} tenderId Tender ID.
 * @param {string} bidId Bid ID.
 * @param {object} scores Scoring payload.
 * @returns {Promise<object>}
 */
export async function scoreBid(tenderId, bidId, scores) {
  const response = await axiosInstance.post(
    `${DEPT_TENDERS}/${tenderId}/bids/${bidId}/score`,
    scores,
  );
  return response.data;
}

/**
 * Shortlists a bid.
 * @param {string} tenderId Tender ID.
 * @param {string} bidId Bid ID.
 * @returns {Promise<object>}
 */
export async function shortlistBid(tenderId, bidId) {
  const response = await axiosInstance.post(
    `${DEPT_TENDERS}/${tenderId}/bids/${bidId}/shortlist`,
  );
  return response.data;
}

/**
 * Rejects a bid.
 * @param {string} tenderId Tender ID.
 * @param {string} bidId Bid ID.
 * @param {string} reason Rejection reason.
 * @returns {Promise<object>}
 */
export async function rejectBid(tenderId, bidId, reason) {
  const response = await axiosInstance.post(
    `${DEPT_TENDERS}/${tenderId}/bids/${bidId}/reject`,
    { reason },
  );
  return response.data;
}

/**
 * Awards a contract from a winning bid.
 * @param {string} tenderId Tender ID.
 * @param {string} bidId Winning bid ID.
 * @returns {Promise<object>}
 */
export async function awardContract(tenderId, bidId) {
  const response = await axiosInstance.post(`${DEPT_TENDERS}/${tenderId}/award`, {
    bidId,
  });
  return response.data;
}
