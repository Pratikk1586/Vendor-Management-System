/**
 * @fileoverview Admin analytics and reporting API calls.
 */

import { axiosInstance } from '../utils/axiosInstance.js';
import {
  ADMIN_REPORT_MEMBERS,
  ADMIN_REPORT_VENDORS,
  ADMIN_REPORT_TENDERS,
  ADMIN_REPORT_FINANCIAL,
} from '../constants/apiRoutes.js';

/**
 * Fetches member statistics report.
 * @param {object} [params={}] Optional query params.
 * @returns {Promise<object>}
 */
export async function getMemberReport(params = {}) {
  const response = await axiosInstance.get(ADMIN_REPORT_MEMBERS, { params });
  return response.data;
}

/**
 * Fetches vendor statistics report.
 * @param {object} [params={}] Optional query params.
 * @returns {Promise<object>}
 */
export async function getVendorReport(params = {}) {
  const response = await axiosInstance.get(ADMIN_REPORT_VENDORS, { params });
  return response.data;
}

/**
 * Fetches tender statistics report.
 * @param {object} [params={}] Optional query params.
 * @returns {Promise<object>}
 */
export async function getTenderReport(params = {}) {
  const response = await axiosInstance.get(ADMIN_REPORT_TENDERS, { params });
  return response.data;
}

/**
 * Fetches financial spend and trend report.
 * @param {object} [params={}] Optional query params.
 * @returns {Promise<object>}
 */
export async function getFinancialReport(params = {}) {
  const response = await axiosInstance.get(ADMIN_REPORT_FINANCIAL, { params });
  return response.data;
}
