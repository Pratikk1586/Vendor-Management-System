/**
 * @fileoverview Analytics and reporting via Sequelize aggregation.
 */

const { Op } = require('sequelize');
const { sequelize } = require('../config/db');
const Vendor = require('../models/Vendor.model');
const Tender = require('../models/Tender.model');
const Bid = require('../models/Bid.model');
const Contract = require('../models/Contract.model');
const User = require('../models/User.model');
const Department = require('../models/Department.model');
const { VENDOR, DEPT_HEAD, HR_ADMIN } = require('../constants/roles');

/**
 * Returns vendor statistics grouped by tier and status.
 * @returns {Promise<object>}
 */
async function getVendorStats() {
  const [byTier, total, preferred] = await Promise.all([
    Vendor.findAll({
      attributes: [['tier', '_id'], [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['tier'],
      raw: true
    }),
    Vendor.count(),
    Vendor.count({ where: { isPreferred: true } }),
  ]);

  return { total, preferred, byTier };
}

/**
 * Returns tender statistics grouped by status.
 * @returns {Promise<object>}
 */
async function getTenderStats() {
  const [byStatus, total, totalBudget] = await Promise.all([
    Tender.findAll({
      attributes: [['status', '_id'], [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['status'],
      raw: true
    }),
    Tender.count(),
    Tender.sum('estimatedBudget'),
  ]);

  return {
    total,
    totalBudget: totalBudget || 0,
    byStatus,
  };
}

/**
 * Returns bid statistics grouped by status.
 * @returns {Promise<object>}
 */
async function getBidStats() {
  const [byStatus, total, avgAmount] = await Promise.all([
    Bid.findAll({
      attributes: [['status', '_id'], [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['status'],
      raw: true
    }),
    Bid.count(),
    Bid.findAll({
      attributes: [[sequelize.fn('AVG', sequelize.col('quotedAmount')), 'avg']],
      raw: true
    }),
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
    Contract.findAll({
      attributes: [['status', '_id'], [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['status'],
      raw: true
    }),
    Contract.count(),
    Contract.sum('contractValue'),
  ]);

  return {
    total,
    totalValue: totalValue || 0,
    byStatus,
  };
}

/**
 * Returns member counts by role and status.
 * @returns {Promise<object>}
 */
async function getMemberStats() {
  const [byRole, byStatus, total] = await Promise.all([
    User.findAll({
      attributes: [['role', '_id'], [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['role'],
      raw: true
    }),
    User.findAll({
      attributes: [['status', '_id'], [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['status'],
      raw: true
    }),
    User.count(),
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
  const results = await Contract.findAll({
    attributes: [
      ['departmentId', 'departmentId'],
      [sequelize.fn('SUM', sequelize.col('contractValue')), 'totalSpend'],
      [sequelize.fn('COUNT', sequelize.col('Contract.id')), 'contractCount']
    ],
    include: [{
      model: Department,
      as: 'department',
      attributes: ['name', 'code']
    }],
    group: ['departmentId', 'department.id'],
    order: [[sequelize.fn('SUM', sequelize.col('contractValue')), 'DESC']],
    raw: true,
    nest: true
  });

  return results.map(r => ({
    departmentId: r.departmentId,
    departmentName: r.department?.name,
    departmentCode: r.department?.code,
    totalSpend: Number(r.totalSpend || 0),
    contractCount: Number(r.contractCount || 0)
  }));
}

/**
 * Returns monthly tender and contract trend for the last 12 months.
 * @returns {Promise<object>}
 */
async function getMonthlyTrend() {
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  const [tendersList, contractsList] = await Promise.all([
    Tender.findAll({
      where: { createdAt: { [Op.gte]: twelveMonthsAgo } },
      attributes: ['createdAt'],
      raw: true
    }),
    Contract.findAll({
      where: { createdAt: { [Op.gte]: twelveMonthsAgo } },
      attributes: ['createdAt', 'contractValue'],
      raw: true
    }),
  ]);

  const tendersGroup = {};
  tendersList.forEach(t => {
    const date = new Date(t.createdAt);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    tendersGroup[key] = (tendersGroup[key] || 0) + 1;
  });

  const contractsGroup = {};
  contractsList.forEach(c => {
    const date = new Date(c.createdAt);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    if (!contractsGroup[key]) {
      contractsGroup[key] = { count: 0, value: 0 };
    }
    contractsGroup[key].count += 1;
    contractsGroup[key].value += c.contractValue || 0;
  });

  const tenders = Object.keys(tendersGroup).map(key => {
    const [year, month] = key.split('-').map(Number);
    return { _id: { year, month }, count: tendersGroup[key] };
  }).sort((a, b) => a._id.year - b._id.year || a._id.month - b._id.month);

  const contracts = Object.keys(contractsGroup).map(key => {
    const [year, month] = key.split('-').map(Number);
    return { _id: { year, month }, count: contractsGroup[key].count, value: contractsGroup[key].value };
  }).sort((a, b) => a._id.year - b._id.year || a._id.month - b._id.month);

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
