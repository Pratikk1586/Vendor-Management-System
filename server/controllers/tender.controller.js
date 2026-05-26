/**
 * @fileoverview Vendor-facing tender listing and detail endpoints.
 */

const Tender = require('../models/Tender.model');
const Vendor = require('../models/Vendor.model');
const { asyncHandler } = require('../utils/asyncHandler');
const { success, error } = require('../utils/responseEnvelope');
const { NOT_FOUND } = require('../constants/httpCodes');
const { ACTIVE, PUBLISHED } = require('../constants/statusTypes');
const { paginate } = require('../utils/paginateQuery');
const { buildFilter } = require('../utils/buildFilter');

/**
 * Returns open tenders matching vendor's approved departments.
 */
const getOpenTenders = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findOne({ userId: req.user.id });
  if (!vendor) {
    return error(res, 'Vendor profile not found', NOT_FOUND);
  }

  const approvedDeptIds = vendor.departments
    .filter((d) => d.status === ACTIVE)
    .map((d) => d.deptId);

  const filter = {
    departmentId: { $in: approvedDeptIds },
    status: { $in: [PUBLISHED, 'bid_open'] },
    submissionDeadline: { $gte: new Date() },
    ...buildFilter(req.query),
  };

  const query = Tender.find(filter)
    .select('-termsDocUrl')
    .populate('departmentId', 'name code')
    .sort({ submissionDeadline: 1 });

  const result = await paginate(query, req.query.page, req.query.limit);
  return success(res, result);
});

/**
 * Returns a single tender by ID.
 */
const getTenderById = asyncHandler(async (req, res) => {
  const tender = await Tender.findById(req.params.id)
    .populate('departmentId', 'name code');

  if (!tender) {
    return error(res, 'Tender not found', NOT_FOUND);
  }

  return success(res, tender);
});

module.exports = { getOpenTenders, getTenderById };
