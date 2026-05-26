/**
 * @fileoverview Vendor profile and document API calls.
 */

import { axiosInstance } from '../utils/axiosInstance.js';
import { VENDOR_PROFILE, VENDOR_DOCUMENTS } from '../constants/apiRoutes.js';

/**
 * Fetches the authenticated vendor profile.
 * @returns {Promise<object>}
 */
export async function getVendorProfile() {
  const response = await axiosInstance.get(VENDOR_PROFILE);
  return response.data;
}

/**
 * Updates the vendor profile.
 * @param {object} data Profile fields to update.
 * @returns {Promise<object>}
 */
export async function updateVendorProfile(data) {
  const response = await axiosInstance.put(VENDOR_PROFILE, data);
  return response.data;
}

/**
 * Uploads a vendor document.
 * @param {FormData} formData Multipart form with file and type.
 * @param {object} [config] Optional axios config (e.g. onUploadProgress).
 * @returns {Promise<object>}
 */
export async function uploadVendorDocuments(formData, config = {}) {
  const response = await axiosInstance.post(VENDOR_DOCUMENTS, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    ...config,
  });
  return response.data;
}
