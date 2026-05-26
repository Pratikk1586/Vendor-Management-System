/**
 * @fileoverview Admin analytics and reporting endpoints.
 */

const {
  getVendorStats,
  getTenderStats,
  getBidStats,
  getContractStats,
  getMemberStats,
  getSpendByDepartment,
  getMonthlyTrend,
} = require('../services/report.service');
const AuditLog = require('../models/AuditLog.model');
const { asyncHandler } = require('../utils/asyncHandler');
const { success } = require('../utils/responseEnvelope');
const { paginate } = require('../utils/paginateQuery');

/**
 * Returns member statistics report.
 */
const getMemberReport = asyncHandler(async (req, res) => {
  const stats = await getMemberStats();
  return success(res, stats);
});

/**
 * Returns vendor statistics report.
 */
const getVendorReport = asyncHandler(async (req, res) => {
  const stats = await getVendorStats();
  return success(res, stats);
});

/**
 * Returns tender statistics report.
 */
const getTenderReport = asyncHandler(async (req, res) => {
  const stats = await getTenderStats();
  return success(res, stats);
});

/**
 * Returns financial spend report.
 */
const getFinancialReport = asyncHandler(async (req, res) => {
  const [contracts, spendByDept, trend] = await Promise.all([
    getContractStats(),
    getSpendByDepartment(),
    getMonthlyTrend(),
  ]);

  return success(res, { contracts, spendByDept, trend });
});

/**
 * Returns audit log summary.
 */
const getAuditSummary = asyncHandler(async (req, res) => {
  const query = AuditLog.find().sort({ timestamp: -1 });
  const result = await paginate(query, req.query.page, req.query.limit);
  const actionCounts = await AuditLog.aggregate([
    { $group: { _id: '$action', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 20 },
  ]);

  return success(res, { ...result, actionCounts });
});

module.exports = {
  getMemberReport,
  getVendorReport,
  getTenderReport,
  getFinancialReport,
  getAuditSummary,
};
