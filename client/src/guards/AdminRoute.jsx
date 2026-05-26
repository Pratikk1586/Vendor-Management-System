/**
 * @fileoverview Route guard that enforces the user session has the HR / Portal Admin role.
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { HR_ADMIN } from '../constants/roles.js';

export default function AdminRoute() {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== HR_ADMIN) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
