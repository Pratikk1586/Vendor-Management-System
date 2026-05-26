/**
 * @fileoverview Returns the configured axios instance with token refresh support.
 */

import { axiosInstance } from '../utils/axiosInstance.js';

/**
 * Returns the shared axios instance (handles token refresh on 401).
 * @returns {import('axios').AxiosInstance}
 */
export function useApi() {
  return axiosInstance;
}
