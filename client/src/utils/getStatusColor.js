/**
 * @fileoverview Tailwind CSS class mappings for status badge colors.
 */

/** @type {Record<string, string>} Status to Tailwind class map. */
const STATUS_COLORS = {
  pending: 'bg-amber-100 text-amber-800',
  active: 'bg-green-100 text-green-800',
  suspended: 'bg-orange-100 text-orange-800',
  blacklisted: 'bg-red-100 text-red-800',
  deleted: 'bg-gray-100 text-gray-600',
  draft: 'bg-gray-100 text-gray-700',
  published: 'bg-blue-100 text-blue-800',
  bid_open: 'bg-blue-100 text-blue-800',
  under_evaluation: 'bg-purple-100 text-purple-800',
  awarded: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  submitted: 'bg-blue-100 text-blue-800',
  shortlisted: 'bg-indigo-100 text-indigo-800',
  not_selected: 'bg-gray-100 text-gray-600',
  rejected: 'bg-red-100 text-red-800',
  pending_admin: 'bg-amber-100 text-amber-800',
  completed: 'bg-green-100 text-green-800',
  terminated: 'bg-red-100 text-red-800',
};

const DEFAULT_COLOR = 'bg-gray-100 text-gray-700';

/**
 * Returns Tailwind classes for a given status label.
 * @param {string} status Status key.
 * @returns {string}
 */
export function getStatusColor(status) {
  return STATUS_COLORS[status] || DEFAULT_COLOR;
}
