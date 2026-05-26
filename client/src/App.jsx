/**
 * @fileoverview Main React Router configuration for the Tata Steel Colors portal.
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import VendorLayout from './components/layout/VendorLayout';
import DeptHeadLayout from './components/layout/DeptHeadLayout';
import AdminLayout from './components/layout/AdminLayout';

// Authorization Guards
import VendorRoute from './guards/VendorRoute';
import DeptHeadRoute from './guards/DeptHeadRoute';
import AdminRoute from './guards/AdminRoute';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import ForgotPasswordPage from './pages/public/ForgotPasswordPage';
import ResetPasswordPage from './pages/public/ResetPasswordPage';

// Vendor Pages
import VendorDashboard from './pages/vendor/VendorDashboard';
import VendorProfile from './pages/vendor/VendorProfile';
import VendorTenders from './pages/vendor/VendorTenders';
import VendorTenderDetail from './pages/vendor/VendorTenderDetail';
import VendorMyBids from './pages/vendor/VendorMyBids';
import VendorBidDetail from './pages/vendor/VendorBidDetail';
import VendorContracts from './pages/vendor/VendorContracts';
import VendorNotifications from './pages/vendor/VendorNotifications';

// Dept Head Pages
import DeptDashboard from './pages/dept-head/DeptDashboard';
import DeptVendors from './pages/dept-head/DeptVendors';
import DeptTenders from './pages/dept-head/DeptTenders';
import DeptTenderCreate from './pages/dept-head/DeptTenderCreate';
import DeptTenderDetail from './pages/dept-head/DeptTenderDetail';
import DeptBidEvaluation from './pages/dept-head/DeptBidEvaluation';
import DeptContracts from './pages/dept-head/DeptContracts';
import DeptReports from './pages/dept-head/DeptReports';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMembers from './pages/admin/AdminMembers';
import AdminMemberDetail from './pages/admin/AdminMemberDetail';
import AdminApprovals from './pages/admin/AdminApprovals';
import AdminVendors from './pages/admin/AdminVendors';
import AdminDeptHeads from './pages/admin/AdminDeptHeads';
import AdminDepartments from './pages/admin/AdminDepartments';
import AdminTenders from './pages/admin/AdminTenders';
import AdminBids from './pages/admin/AdminBids';
import AdminContracts from './pages/admin/AdminContracts';
import AdminReports from './pages/admin/AdminReports';
import AdminAuditLog from './pages/admin/AdminAuditLog';
import AdminAuthCodes from './pages/admin/AdminAuthCodes';
import AdminSettings from './pages/admin/AdminSettings';

// Global Components
import Toast from './components/common/Toast';
import AnnouncementBanner from './components/common/AnnouncementBanner';

export default function App() {
  return (
    <>
      <AnnouncementBanner
        message="System Update: Colors portal version 2.4.0 is now live. New structural packaging bidding rules are active."
        type="info"
      />
      <BrowserRouter>
        <Routes>
          
          {/* PUBLIC ROUTING LAYER */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          </Route>

          {/* SECURE VENDOR WORKSPACE PATHS */}
          <Route element={<VendorRoute />}>
            <Route element={<VendorLayout />}>
              <Route path="/vendor/dashboard" element={<VendorDashboard />} />
              <Route path="/vendor/profile" element={<VendorProfile />} />
              <Route path="/vendor/tenders" element={<VendorTenders />} />
              <Route path="/vendor/tenders/:id" element={<VendorTenderDetail />} />
              <Route path="/vendor/bids" element={<VendorMyBids />} />
              <Route path="/vendor/bids/:id" element={<VendorBidDetail />} />
              <Route path="/vendor/contracts" element={<VendorContracts />} />
              <Route path="/vendor/notifications" element={<VendorNotifications />} />
            </Route>
          </Route>

          {/* SECURE DEPARTMENT HEAD SOURCING PATHS (Supports double aliases) */}
          <Route element={<DeptHeadRoute />}>
            <Route element={<DeptHeadLayout />}>
              {/* Dept dashboards */}
              <Route path="/dept/dashboard" element={<DeptDashboard />} />
              <Route path="/dept-head/dashboard" element={<DeptDashboard />} />
              
              {/* Vendor directory */}
              <Route path="/dept/vendors" element={<DeptVendors />} />
              <Route path="/dept-head/vendors" element={<DeptVendors />} />

              {/* Tenders lists & builders */}
              <Route path="/dept/tenders" element={<DeptTenders />} />
              <Route path="/dept-head/tenders" element={<DeptTenders />} />
              <Route path="/dept/tenders/create" element={<DeptTenderCreate />} />
              <Route path="/dept-head/tenders/create" element={<DeptTenderCreate />} />
              <Route path="/dept/tenders/:id" element={<DeptTenderDetail />} />
              <Route path="/dept-head/tenders/:id" element={<DeptTenderDetail />} />

              {/* Bid evaluation scoreboards */}
              <Route path="/dept/tenders/:id/bids" element={<DeptBidEvaluation />} />
              <Route path="/dept-head/tenders/:id/bids" element={<DeptBidEvaluation />} />
              <Route path="/dept/bids" element={<DeptBidEvaluation />} />
              <Route path="/dept-head/bids" element={<DeptBidEvaluation />} />

              {/* Sourcing contracts */}
              <Route path="/dept/contracts" element={<DeptContracts />} />
              <Route path="/dept-head/contracts" element={<DeptContracts />} />

              {/* Reports */}
              <Route path="/dept/reports" element={<DeptReports />} />
              <Route path="/dept-head/reports" element={<DeptReports />} />
            </Route>
          </Route>

          {/* SECURE SUPER ADMIN OVERSIGHT PATHS */}
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              
              {/* Members & Approvals */}
              <Route path="/admin/members" element={<AdminMembers />} />
              <Route path="/admin/members/all" element={<AdminMembers />} />
              <Route path="/admin/members/:id" element={<AdminMemberDetail />} />
              <Route path="/admin/approvals" element={<AdminApprovals />} />
              <Route path="/admin/members/approvals" element={<AdminApprovals />} />
              
              {/* Directories */}
              <Route path="/admin/vendors" element={<AdminVendors />} />
              <Route path="/admin/dept-heads" element={<AdminDeptHeads />} />
              <Route path="/admin/departments" element={<AdminDepartments />} />
              
              {/* Oversights */}
              <Route path="/admin/tenders" element={<AdminTenders />} />
              <Route path="/admin/bids" element={<AdminBids />} />
              <Route path="/admin/contracts" element={<AdminContracts />} />
              
              {/* Utilities & Configs */}
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/admin/audit-logs" element={<AdminAuditLog />} />
              <Route path="/admin/audit-log" element={<AdminAuditLog />} />
              <Route path="/admin/auth-codes" element={<AdminAuthCodes />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>
          </Route>

          {/* FALLBACK DIRECT NAVIGATION REDIRECTS */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
      <Toast />
    </>
  );
}
