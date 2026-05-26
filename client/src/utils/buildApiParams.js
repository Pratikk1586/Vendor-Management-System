/**
 * @fileoverview Builds axios query params from filters and pagination.
 */

/**
 * Merges filter object with optional page and limit for API requests.
 * @param {object} [filters={}] Query filters.
 * @param {number} [page] Page number.
 * @param {number} [limit] Items per page.
 * @returns {object}
 */
export function buildApiParams(filters = {}, page, limit) {
  const params = { ...filters };

  if (page !== undefined) {
    params.page = page;
  }

  if (limit !== undefined) {
    params.limit = limit;
  }

  return params;
}
