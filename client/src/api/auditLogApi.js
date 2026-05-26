/**
 * @fileoverview Audit log API calls for admin users.
 */

import { axiosInstance } from '../utils/axiosInstance.js';
import { AUDIT_LOG } from '../constants/apiRoutes.js';
import { buildApiParams } from '../utils/buildApiParams.js';

/**
 * Fetches paginated audit logs with optional filters.
 * @param {object} [filters={}] Filters (performedBy, role, action, dateFrom, dateTo).
 * @param {number} [page] Page number.
 * @param {number} [limit] Items per page.
 * @returns {Promise<object>}
 */
export async function getAuditLog(filters = {}, page, limit) {
  const response = await axiosInstance.get(AUDIT_LOG, {
    params: buildApiParams(filters, page, limit),
  });
  return response.data;
}
