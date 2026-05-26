/**
 * @fileoverview Department head reporting endpoints.
 */

const Contract = require('../models/Contract.model');
const { paginate } = require('../utils/paginateQuery');
const Tender = require('../models/Tender.model');
const Bid = require('../models/Bid.model');
const { asyncHandler } = require('../utils/asyncHandler');
const { success } = require('../utils/responseEnvelope');

/**
 * Returns department-scoped analytics reports.
 */
const getDeptReports = asyncHandler(async (req, res) => {
  const deptId = req.deptFilter.departmentId;

  const [spend, tenders, bids] = await Promise.all([
    Contract.aggregate([
      { $match: { departmentId: deptId, status: 'active' } },
      { $group: { _id: null, totalSpend: { $sum: '$contractValue' }, count: { $sum: 1 } } },
    ]),
    Tender.aggregate([
      { $match: { departmentId: deptId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          avgCycle: { $avg: { $subtract: ['$awardedAt', '$publishedAt'] } },
        },
      },
    ]),
    Bid.aggregate([
      {
        $lookup: {
          from: 'tenders',
          localField: 'tenderId',
          foreignField: '_id',
          as: 'tender',
        },
      },
      { $unwind: '$tender' },
      { $match: { 'tender.departmentId': deptId } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
  ]);

  return success(res, {
    spend: spend[0] || { totalSpend: 0, count: 0 },
    tenderStats: tenders,
    bidParticipation: bids,
  });
});

/**
 * Returns contracts for the department.
 */
const getDeptContracts = asyncHandler(async (req, res) => {
  const query = Contract.find({ departmentId: req.deptFilter.departmentId })
    .populate('vendorId', 'companyName')
    .sort({ createdAt: -1 });

  const result = await paginate(query, req.query.page, req.query.limit);
  return success(res, result);
});

module.exports = { getDeptReports, getDeptContracts };
