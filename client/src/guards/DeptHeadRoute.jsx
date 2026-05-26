/**
 * @fileoverview Route guard that enforces the user session has the Department Head role.
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { DEPT_HEAD } from '../constants/roles.js';

export default function DeptHeadRoute() {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== DEPT_HEAD) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
