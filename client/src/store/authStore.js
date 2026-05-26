/**
 * @fileoverview Zustand store for authenticated user session state.
 */

import { create } from 'zustand';
import {
  setToken,
  clearToken,
  setRefreshToken,
  clearRefreshToken,
} from '../utils/tokenUtils.js';

/**
 * Auth store hook for user session management.
 * @type {import('zustand').UseBoundStore}
 */
export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  role: null,
  isAuthenticated: false,

  /**
   * Sets authenticated session and persists tokens.
   * @param {object} user User object from API.
   * @param {string} token Access token.
   * @param {string} role User role.
   * @param {string} [refreshToken] Optional refresh token.
   */
  setAuth: (user, token, role, refreshToken) => {
    setToken(token);
    if (refreshToken) {
      setRefreshToken(refreshToken);
    }
    set({
      user,
      token,
      role,
      isAuthenticated: true,
    });
  },

  /**
   * Clears session and removes tokens from storage.
   */
  clearAuth: () => {
    clearToken();
    clearRefreshToken();
    set({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
    });
  },

  /**
   * Merges partial updates into the current user object.
   * @param {object} updates Fields to update on user.
   */
  updateUser: (updates) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    }));
  },
}));
