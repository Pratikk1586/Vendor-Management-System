/**
 * @fileoverview Authentication hook combining store, API, and navigation.
 */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';
import { login as loginApi } from '../api/authApi.js';
import { VENDOR, DEPT_HEAD, HR_ADMIN } from '../constants/roles.js';
import { LOGIN } from '../constants/routes.js';
import { useRole } from './useRole.js';
import { useToast } from './useToast.js';

/**
 * Returns auth state, role flags, and login/logout actions.
 * @returns {object}
 */
export function useAuth() {
  const navigate = useNavigate();
  const { toastSuccess, toastError } = useToast();
  const { getDashboardPath } = useRole();

  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const isVendor = role === VENDOR;
  const isDeptHead = role === DEPT_HEAD;
  const isAdmin = role === HR_ADMIN;

  /**
   * Logs in the user, persists session, and redirects to dashboard.
   * @param {{ email: string, password: string, role: string }} credentials Login credentials.
   */
  const login = useCallback(
    async (credentials) => {
      try {
        const response = await loginApi(credentials);

        if (!response.success) {
          toastError(response.message || 'Login failed');
          return;
        }

        const { user: userData, accessToken, refreshToken } = response.data;
        setAuth(userData, accessToken, userData.role, refreshToken);
        toastSuccess('Login successful');
        navigate(getDashboardPath(userData.role));
      } catch (err) {
        const message = err.response?.data?.message || err.message || 'Login failed';
        toastError(message);
      }
    },
    [setAuth, navigate, getDashboardPath, toastSuccess, toastError],
  );

  /**
   * Clears session and redirects to login page.
   */
  const logout = useCallback(() => {
    clearAuth();
    navigate(LOGIN);
  }, [clearAuth, navigate]);

  return {
    user,
    token,
    role,
    isAuthenticated,
    isVendor,
    isDeptHead,
    isAdmin,
    login,
    logout,
  };
}
