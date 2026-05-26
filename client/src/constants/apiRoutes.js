/**
 * @fileoverview API endpoint path constants for the Tata Steel Colors backend.
 */

/** Auth */
export const AUTH_LOGIN = '/auth/login';
export const AUTH_REFRESH = '/auth/refresh';
export const AUTH_REGISTER_VENDOR = '/auth/register/vendor';
export const AUTH_REGISTER_DEPT_HEAD = '/auth/register/dept-head';
export const AUTH_REGISTER_ADMIN = '/auth/register/admin';
export const AUTH_FORGOT_PASSWORD = '/auth/forgot-password';
export const AUTH_RESET_PASSWORD = '/auth/reset-password';
export const AUTH_VALIDATE_CODE = '/auth/validate-auth-code';

/** Vendor */
export const VENDOR_PROFILE = '/vendor/profile';
export const VENDOR_DOCUMENTS = '/vendor/documents';
export const VENDOR_TENDERS = '/vendor/tenders';
export const VENDOR_BIDS = '/vendor/bids';
export const VENDOR_CONTRACTS = '/vendor/contracts';
export const VENDOR_NOTIFICATIONS = '/vendor/notifications';

/** Dept */
export const DEPT_VENDORS = '/dept/vendors';
export const DEPT_TENDERS = '/dept/tenders';
export const DEPT_CONTRACTS = '/dept/contracts';
export const DEPT_REPORTS = '/dept/reports';

/** Admin */
export const ADMIN_MEMBERS = '/admin/members';
export const ADMIN_APPROVALS = '/admin/approvals';
export const ADMIN_DEPARTMENTS = '/admin/departments';
export const ADMIN_TENDERS = '/admin/tenders';
export const ADMIN_BIDS = '/admin/bids';
export const ADMIN_CONTRACTS = '/admin/contracts';
export const ADMIN_AUTH_CODES = '/admin/auth-codes';
export const ADMIN_REPORT_MEMBERS = '/admin/reports/members';
export const ADMIN_REPORT_VENDORS = '/admin/reports/vendors';
export const ADMIN_REPORT_TENDERS = '/admin/reports/tenders';
export const ADMIN_REPORT_FINANCIAL = '/admin/reports/financial';

/** Audit */
export const AUDIT_LOG = '/audit-log';
