/**
 * @fileoverview Frontend route path constants for public, vendor, department head, and admin areas.
 */

/** @type {'/'} Landing / home page. */
export const HOME = '/';

/** @type {'/login'} Login page. */
export const LOGIN = '/login';

/** @type {'/register'} Registration page. */
export const REGISTER = '/register';

/** @type {'/vendor/dashboard'} Vendor dashboard. */
export const VENDOR_DASHBOARD = '/vendor/dashboard';

/** @type {'/vendor/profile'} Vendor profile. */
export const VENDOR_PROFILE = '/vendor/profile';

/** @type {'/vendor/tenders'} Vendor tender list. */
export const VENDOR_TENDERS = '/vendor/tenders';

/** @type {'/vendor/tenders/:id'} Vendor tender detail. */
export const VENDOR_TENDER_DETAIL = '/vendor/tenders/:id';

/** @type {'/vendor/bids'} Vendor bids list. */
export const VENDOR_BIDS = '/vendor/bids';

/** @type {'/vendor/bids/:id'} Vendor bid detail. */
export const VENDOR_BID_DETAIL = '/vendor/bids/:id';

/** @type {'/vendor/contracts'} Vendor contracts. */
export const VENDOR_CONTRACTS = '/vendor/contracts';

/** @type {'/vendor/notifications'} Vendor notifications. */
export const VENDOR_NOTIFICATIONS = '/vendor/notifications';

/** @type {'/dept-head/dashboard'} Department head dashboard. */
export const DEPT_DASHBOARD = '/dept-head/dashboard';

/** @type {'/dept-head/vendors'} Department head vendor management. */
export const DEPT_VENDORS = '/dept-head/vendors';

/** @type {'/dept-head/tenders'} Department head tender list. */
export const DEPT_TENDERS = '/dept-head/tenders';

/** @type {'/dept-head/tenders/create'} Create tender. */
export const DEPT_TENDER_CREATE = '/dept-head/tenders/create';

/** @type {'/dept-head/tenders/:id'} Department head tender detail. */
export const DEPT_TENDER_DETAIL = '/dept-head/tenders/:id';

/** @type {'/dept-head/tenders/:id/bids'} Tender bid evaluation. */
export const DEPT_BID_EVAL = '/dept-head/tenders/:id/bids';

/** @type {'/dept-head/contracts'} Department head contracts. */
export const DEPT_CONTRACTS = '/dept-head/contracts';

/** @type {'/dept-head/reports'} Department head reports. */
export const DEPT_REPORTS = '/dept-head/reports';

/** @type {'/admin/dashboard'} Admin dashboard. */
export const ADMIN_DASHBOARD = '/admin/dashboard';

/** @type {'/admin/members'} Admin members. */
export const ADMIN_MEMBERS = '/admin/members';

/** @type {'/admin/approvals'} Admin approvals queue. */
export const ADMIN_APPROVALS = '/admin/approvals';

/** @type {'/admin/vendors'} Admin vendor management. */
export const ADMIN_VENDORS = '/admin/vendors';

/** @type {'/admin/dept-heads'} Admin department head management. */
export const ADMIN_DEPT_HEADS = '/admin/dept-heads';

/** @type {'/admin/departments'} Admin departments. */
export const ADMIN_DEPARTMENTS = '/admin/departments';

/** @type {'/admin/tenders'} Admin tenders overview. */
export const ADMIN_TENDERS = '/admin/tenders';

/** @type {'/admin/bids'} Admin bids overview. */
export const ADMIN_BIDS = '/admin/bids';

/** @type {'/admin/contracts'} Admin contracts. */
export const ADMIN_CONTRACTS = '/admin/contracts';

/** @type {'/admin/reports'} Admin reports. */
export const ADMIN_REPORTS = '/admin/reports';

/** @type {'/admin/audit-log'} Admin audit log. */
export const ADMIN_AUDIT_LOG = '/admin/audit-log';

/** @type {'/admin/auth-codes'} Admin authorization codes. */
export const ADMIN_AUTH_CODES = '/admin/auth-codes';

/** @type {'/admin/settings'} Admin settings. */
export const ADMIN_SETTINGS = '/admin/settings';

/**
 * Public route paths grouped for router configuration.
 * @type {{ HOME: string, LOGIN: string, REGISTER: string }}
 */
export const PUBLIC = {
  HOME,
  LOGIN,
  REGISTER,
};

/**
 * Vendor route paths grouped for router configuration.
 */
export const VENDOR = {
  VENDOR_DASHBOARD,
  VENDOR_PROFILE,
  VENDOR_TENDERS,
  VENDOR_TENDER_DETAIL,
  VENDOR_BIDS,
  VENDOR_BID_DETAIL,
  VENDOR_CONTRACTS,
  VENDOR_NOTIFICATIONS,
};

/**
 * Department head route paths grouped for router configuration.
 */
export const DEPT_HEAD = {
  DEPT_DASHBOARD,
  DEPT_VENDORS,
  DEPT_TENDERS,
  DEPT_TENDER_CREATE,
  DEPT_TENDER_DETAIL,
  DEPT_BID_EVAL,
  DEPT_CONTRACTS,
  DEPT_REPORTS,
};

/**
 * Admin route paths grouped for router configuration.
 */
export const ADMIN = {
  ADMIN_DASHBOARD,
  ADMIN_MEMBERS,
  ADMIN_APPROVALS,
  ADMIN_VENDORS,
  ADMIN_DEPT_HEADS,
  ADMIN_DEPARTMENTS,
  ADMIN_TENDERS,
  ADMIN_BIDS,
  ADMIN_CONTRACTS,
  ADMIN_REPORTS,
  ADMIN_AUDIT_LOG,
  ADMIN_AUTH_CODES,
  ADMIN_SETTINGS,
};
