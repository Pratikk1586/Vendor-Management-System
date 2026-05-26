/**
 * @fileoverview Analytics and reporting via MongoDB aggregation pipelines.
 */

const Vendor = require('../models/Vendor.model');
const Tender = require('../models/Tender.model');
const Bid = require('../models/Bid.model');
const Contract = require('../models/Contract.model');
const User = require('../models/User.model');
const { VENDOR, DEPT_HEAD, HR_ADMIN } = require('../constants/roles');

/**
 * Returns vendor statistics grouped by tier and status.
 * @returns {Promise<object>}
 */
async function getVendorStats() {
  const [byTier, total, preferred] = await Promise.all([
    Vendor.aggregate([
      { $group: { _id: '$tier', count: { $sum: 1 } } },
    ]),
    Vendor.countDocuments(),
    Vendor.countDocuments({ isPreferred: true }),
  ]);

  return { total, preferred, byTier };
}

/**
 * Returns tender statistics grouped by status.
 * @returns {Promise<object>}
 */
async function getTenderStats() {
  const [byStatus, total, totalBudget] = await Promise.all([
    Tender.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Tender.countDocuments(),
    Tender.aggregate([
      { $group: { _id: null, total: { $sum: '$estimatedBudget' } } },
    ]),
  ]);

  return {
    total,
    totalBudget: totalBudget[0]?.total || 0,
    byStatus,
  };
}

/**
 * Returns bid statistics grouped by status.
 * @returns {Promise<object>}
 */
async function getBidStats() {
  const [byStatus, total, avgAmount] = await Promise.all([
    Bid.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Bid.countDocuments(),
    Bid.aggregate([
      { $group: { _id: null, avg: { $avg: '$quotedAmount' } } },
    ]),
  ]);

  return {
    total,
    averageQuotedAmount: Math.round(avgAmount[0]?.avg || 0),
    byStatus,
  };
}

/**
 * Returns contract statistics grouped by status.
 * @returns {Promise<object>}
 */
async function getContractStats() {
  const [byStatus, total, totalValue] = await Promise.all([
    Contract.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Contract.countDocuments(),
    Contract.aggregate([
      { $group: { _id: null, total: { $sum: '$contractValue' } } },
    ]),
  ]);

  return {
    total,
    totalValue: totalValue[0]?.total || 0,
    byStatus,
  };
}

/**
 * Returns member counts by role and status.
 * @returns {Promise<object>}
 */
async function getMemberStats() {
  const [byRole, byStatus, total] = await Promise.all([
    User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
    ]),
    User.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    User.countDocuments(),
  ]);

  return {
    total,
    vendors: byRole.find((r) => r._id === VENDOR)?.count || 0,
    deptHeads: byRole.find((r) => r._id === DEPT_HEAD)?.count || 0,
    admins: byRole.find((r) => r._id === HR_ADMIN)?.count || 0,
    byRole,
    byStatus,
  };
}

/**
 * Returns total contract spend aggregated by department.
 * @returns {Promise<Array<object>>}
 */
async function getSpendByDepartment() {
  return Contract.aggregate([
    {
      $group: {
        _id: '$departmentId',
        totalSpend: { $sum: '$contractValue' },
        contractCount: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'departments',
        localField: '_id',
        foreignField: '_id',
        as: 'department',
      },
    },
    { $unwind: { path: '$department', preserveNullAndEmptyArrays: true } },
    {
      $project: {
        departmentId: '$_id',
        departmentName: '$department.name',
        departmentCode: '$department.code',
        totalSpend: 1,
        contractCount: 1,
      },
    },
    { $sort: { totalSpend: -1 } },
  ]);
}

/**
 * Returns monthly tender and contract trend for the last 12 months.
 * @returns {Promise<object>}
 */
async function getMonthlyTrend() {
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  const [tenders, contracts] = await Promise.all([
    Tender.aggregate([
      { $match: { createdAt: { $gte: twelveMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]),
    Contract.aggregate([
      { $match: { createdAt: { $gte: twelveMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
          value: { $sum: '$contractValue' },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]),
  ]);

  return { tenders, contracts };
}

module.exports = {
  getVendorStats,
  getTenderStats,
  getBidStats,
  getContractStats,
  getMemberStats,
  getSpendByDepartment,
  getMonthlyTrend,
};
