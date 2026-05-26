/**
 * @fileoverview Admin member management API calls.
 */

import { axiosInstance } from '../utils/axiosInstance.js';
import { ADMIN_MEMBERS } from '../constants/apiRoutes.js';
import { buildApiParams } from '../utils/buildApiParams.js';

/**
 * Fetches all members with optional filters.
 * @param {object} [filters={}] Query filters.
 * @param {number} [page] Page number.
 * @param {number} [limit] Items per page.
 * @returns {Promise<object>}
 */
export async function getAllMembers(filters = {}, page, limit) {
  const response = await axiosInstance.get(ADMIN_MEMBERS, {
    params: buildApiParams(filters, page, limit),
  });
  return response.data;
}

/**
 * Fetches a member by ID.
 * @param {string} id User ID.
 * @returns {Promise<object>}
 */
export async function getMemberById(id) {
  const response = await axiosInstance.get(`${ADMIN_MEMBERS}/${id}`);
  return response.data;
}

/**
 * Updates a member's profile fields.
 * @param {string} id User ID.
 * @param {object} data Fields to update.
 * @returns {Promise<object>}
 */
export async function updateMember(id, data) {
  const response = await axiosInstance.put(`${ADMIN_MEMBERS}/${id}`, data);
  return response.data;
}

/**
 * Changes a member's role.
 * @param {string} id User ID.
 * @param {string} role New role.
 * @param {string} [dept] Department ID (required for dept_head).
 * @returns {Promise<object>}
 */
export async function changeMemberRole(id, role, dept) {
  const response = await axiosInstance.patch(`${ADMIN_MEMBERS}/${id}/role`, {
    role,
    department: dept,
  });
  return response.data;
}

/**
 * Changes a member's account status.
 * @param {string} id User ID.
 * @param {string} status New status.
 * @param {string} [reason] Reason for status change.
 * @param {string|Date} [until] Suspension end date.
 * @returns {Promise<object>}
 */
export async function changeMemberStatus(id, status, reason, until) {
  const response = await axiosInstance.patch(`${ADMIN_MEMBERS}/${id}/status`, {
    status,
    reason,
    suspensionUntil: until,
  });
  return response.data;
}

/**
 * Soft-deletes a member.
 * @param {string} id User ID.
 * @param {string} [reason] Deletion reason.
 * @returns {Promise<object>}
 */
export async function deleteMember(id, reason) {
  const response = await axiosInstance.delete(`${ADMIN_MEMBERS}/${id}`, {
    data: { reason },
  });
  return response.data;
}

/**
 * Resets a member's password.
 * @param {string} id User ID.
 * @param {string} [password] Optional new password.
 * @returns {Promise<object>}
 */
export async function resetMemberPassword(id, password) {
  const response = await axiosInstance.post(`${ADMIN_MEMBERS}/${id}/reset-password`, {
    password,
  });
  return response.data;
}

/**
 * Fetches audit trail for a member.
 * @param {string} id User ID.
 * @param {number} [page] Page number.
 * @param {number} [limit] Items per page.
 * @returns {Promise<object>}
 */
export async function getMemberAuditTrail(id, page, limit) {
  const response = await axiosInstance.get(`${ADMIN_MEMBERS}/${id}/audit`, {
    params: buildApiParams({}, page, limit),
  });
  return response.data;
}

/**
 * Performs a bulk action on multiple members.
 * @param {string} action Action type (approve, suspend, notify, export).
 * @param {string[]} ids Member IDs.
 * @param {object} [data] Additional payload (e.g. reason).
 * @returns {Promise<object>}
 */
export async function bulkAction(action, ids, data = {}) {
  const response = await axiosInstance.post(`${ADMIN_MEMBERS}/bulk-action`, {
    action,
    memberIds: ids,
    ...data,
  });
  return response.data;
}
