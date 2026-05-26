/**
 * @fileoverview Pagination helper for Mongoose query results.
 */

/**
 * Executes a paginated Mongoose query.
 * @param {import('mongoose').Query} query Mongoose query instance.
 * @param {number|string} [page=1] Page number (1-based).
 * @param {number|string} [limit=10] Items per page.
 * @returns {Promise<{ data: Array, total: number, page: number, totalPages: number }>}
 */
async function paginate(query, page = 1, limit = 10) {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
  const skip = (pageNum - 1) * limitNum;

  const [data, total] = await Promise.all([
    query.clone().skip(skip).limit(limitNum).exec(),
    query.model.countDocuments(query.getFilter()),
  ]);

  return {
    data,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum) || 0,
  };
}

module.exports = { paginate };
