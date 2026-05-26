/**
 * @fileoverview Route guard that enforces the user session has the Vendor role.
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { VENDOR } from '../constants/roles.js';

export default function VendorRoute() {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== VENDOR) {
    // Redirect non-vendors to login or home
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
