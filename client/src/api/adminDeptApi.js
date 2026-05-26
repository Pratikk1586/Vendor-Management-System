/**
 * @fileoverview Admin department management API calls.
 */

import { axiosInstance } from '../utils/axiosInstance.js';
import { ADMIN_DEPARTMENTS } from '../constants/apiRoutes.js';

/**
 * Fetches all departments.
 * @returns {Promise<object>}
 */
export async function getDepartments() {
  const response = await axiosInstance.get(ADMIN_DEPARTMENTS);
  return response.data;
}

/**
 * Fetches a department by ID.
 * @param {string} id Department ID.
 * @returns {Promise<object>}
 */
export async function getDeptById(id) {
  const response = await axiosInstance.get(`${ADMIN_DEPARTMENTS}/${id}`);
  return response.data;
}

/**
 * Creates a new department.
 * @param {object} data Department payload.
 * @returns {Promise<object>}
 */
export async function createDepartment(data) {
  const response = await axiosInstance.post(ADMIN_DEPARTMENTS, data);
  return response.data;
}

/**
 * Updates a department.
 * @param {string} id Department ID.
 * @param {object} data Fields to update.
 * @returns {Promise<object>}
 */
export async function updateDepartment(id, data) {
  const response = await axiosInstance.put(`${ADMIN_DEPARTMENTS}/${id}`, data);
  return response.data;
}

/**
 * Assigns a department head to a department.
 * @param {string} deptId Department ID.
 * @param {string} userId User ID of the department head.
 * @returns {Promise<object>}
 */
export async function assignHead(deptId, userId) {
  const response = await axiosInstance.post(
    `${ADMIN_DEPARTMENTS}/${deptId}/assign-head`,
    { userId },
  );
  return response.data;
}
