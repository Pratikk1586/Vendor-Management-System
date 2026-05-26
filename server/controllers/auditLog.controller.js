/**
 * @fileoverview Audit log retrieval endpoints.
 */

const AuditLog = require('../models/AuditLog.model');
const { asyncHandler } = require('../utils/asyncHandler');
const { success } = require('../utils/responseEnvelope');
const { paginate } = require('../utils/paginateQuery');

/**
 * Returns paginated, filterable audit logs.
 */
const getAuditLog = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.query.performedBy) {
    filter.performedBy = req.query.performedBy;
  }

  if (req.query.role) {
    filter.role = req.query.role;
  }

  if (req.query.action) {
    filter.action = { $regex: req.query.action, $options: 'i' };
  }

  if (req.query.dateFrom || req.query.dateTo) {
    filter.timestamp = {};
    if (req.query.dateFrom) {
      filter.timestamp.$gte = new Date(req.query.dateFrom);
    }
    if (req.query.dateTo) {
      filter.timestamp.$lte = new Date(req.query.dateTo);
    }
  }

  const query = AuditLog.find(filter)
    .populate('performedBy', 'name email role')
    .sort({ timestamp: -1 });

  const result = await paginate(query, req.query.page, req.query.limit);
  return success(res, result);
});

module.exports = { getAuditLog };
