/**
 * @fileoverview Authentication API calls for login, registration, and password reset.
 */

import { axiosInstance } from '../utils/axiosInstance.js';
import { VENDOR, DEPT_HEAD, HR_ADMIN } from '../constants/roles.js';
import {
  AUTH_LOGIN,
  AUTH_REGISTER_VENDOR,
  AUTH_REGISTER_DEPT_HEAD,
  AUTH_REGISTER_ADMIN,
  AUTH_FORGOT_PASSWORD,
  AUTH_RESET_PASSWORD,
  AUTH_VALIDATE_CODE,
} from '../constants/apiRoutes.js';

/**
 * Authenticates with the given credentials and role.
 * @param {{ email: string, password: string, role: string }} credentials
 * @returns {Promise<object>}
 */
export async function login(credentials) {
  const response = await axiosInstance.post(AUTH_LOGIN, credentials);
  return response.data;
}

/**
 * Logs in as a vendor.
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<object>}
 */
export async function loginVendor(credentials) {
  return login({ ...credentials, role: VENDOR });
}

/**
 * Logs in as a department head.
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<object>}
 */
export async function loginDeptHead(credentials) {
  return login({ ...credentials, role: DEPT_HEAD });
}

/**
 * Logs in as an HR admin.
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<object>}
 */
export async function loginAdmin(credentials) {
  return login({ ...credentials, role: HR_ADMIN });
}

/**
 * Registers a new vendor.
 * @param {object} formData Registration payload.
 * @returns {Promise<object>}
 */
export async function registerVendor(formData) {
  const response = await axiosInstance.post(AUTH_REGISTER_VENDOR, formData);
  return response.data;
}

/**
 * Registers a new department head.
 * @param {object} formData Registration payload.
 * @returns {Promise<object>}
 */
export async function registerDeptHead(formData) {
  const response = await axiosInstance.post(AUTH_REGISTER_DEPT_HEAD, formData);
  return response.data;
}

/**
 * Registers a new admin.
 * @param {object} formData Registration payload.
 * @returns {Promise<object>}
 */
export async function registerAdmin(formData) {
  const response = await axiosInstance.post(AUTH_REGISTER_ADMIN, formData);
  return response.data;
}

/**
 * Validates an admin authorization code.
 * @param {string} code Plain auth code.
 * @returns {Promise<object>}
 */
export async function validateAuthCode(code) {
  const response = await axiosInstance.post(AUTH_VALIDATE_CODE, { authCode: code });
  return response.data;
}

/**
 * Sends a password reset email.
 * @param {string} email User email.
 * @returns {Promise<object>}
 */
export async function forgotPassword(email) {
  const response = await axiosInstance.post(AUTH_FORGOT_PASSWORD, { email });
  return response.data;
}

/**
 * Resets password with a valid token.
 * @param {string} token Reset token.
 * @param {string} password New password.
 * @returns {Promise<object>}
 */
export async function resetPassword(token, password) {
  const response = await axiosInstance.post(AUTH_RESET_PASSWORD, {
    token,
    password,
    confirmPassword: password,
  });
  return response.data;
}
