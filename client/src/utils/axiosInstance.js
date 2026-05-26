/**
 * @fileoverview Configured Axios client with auth and token refresh interceptors.
 */

import axios from 'axios';
import { AUTH_TOKEN_KEY } from '../constants/storageKeys.js';
import { AUTH_REFRESH } from '../constants/apiRoutes.js';
import { LOGIN } from '../constants/routes.js';
import {
  getToken,
  setToken,
  getRefreshToken,
  clearToken,
  clearRefreshToken,
} from './tokenUtils.js';

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  console.warn('VITE_API_BASE_URL is not defined. API requests may fail.');
}

let isRefreshing = false;
let refreshQueue = [];

/**
 * Processes queued requests after token refresh.
 * @param {string|null} newToken New access token or null on failure.
 */
function processQueue(newToken) {
  refreshQueue.forEach(({ resolve, reject, config }) => {
    if (newToken) {
      config.headers.Authorization = `Bearer ${newToken}`;
      resolve(axiosInstance(config));
    } else {
      reject(new Error('Token refresh failed'));
    }
  });
  refreshQueue = [];
}

/**
 * Axios instance with base URL and JSON defaults.
 * @type {import('axios').AxiosInstance}
 */
export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken() || localStorage.getItem(AUTH_TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest?._retry) {
      return Promise.reject(error);
    }

    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      clearToken();
      clearRefreshToken();
      window.location.href = LOGIN;
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject, config: originalRequest });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { data } = await axios.post(`${baseURL}${AUTH_REFRESH}`, {
        refreshToken,
      });

      const newToken = data?.data?.accessToken;
      setToken(newToken);
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      processQueue(newToken);
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      processQueue(null);
      clearToken();
      clearRefreshToken();
      window.location.href = LOGIN;
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
