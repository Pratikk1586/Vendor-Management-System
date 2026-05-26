/**
 * @fileoverview Route guard that restricts rendering to authenticated users.
 */

import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page and keep track of where the user was heading
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
