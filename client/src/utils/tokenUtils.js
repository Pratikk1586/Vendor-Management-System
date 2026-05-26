/**
 * @fileoverview Local storage helpers for JWT access and refresh tokens.
 */

import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../constants/storageKeys.js';

/**
 * Returns the stored access token.
 * @returns {string|null}
 */
export function getToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

/**
 * Stores the access token.
 * @param {string} token JWT access token.
 */
export function setToken(token) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

/**
 * Removes the access token from storage.
 */
export function clearToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

/**
 * Returns the stored refresh token.
 * @returns {string|null}
 */
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

/**
 * Stores the refresh token.
 * @param {string} token JWT refresh token.
 */
export function setRefreshToken(token) {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

/**
 * Removes the refresh token from storage.
 */
export function clearRefreshToken() {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}
