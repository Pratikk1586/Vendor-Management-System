/**
 * @fileoverview Admin tender oversight endpoints.
 */

const Tender = require('../models/Tender.model');
const { asyncHandler } = require('../utils/asyncHandler');
const { success, error } = require('../utils/responseEnvelope');
const { NOT_FOUND } = require('../constants/httpCodes');
const { CANCELLED } = require('../constants/statusTypes');
const { paginate } = require('../utils/paginateQuery');
const { buildFilter } = require('../utils/buildFilter');

/**
 * Returns all tenders with filters.
 */
const getAllTenders = asyncHandler(async (req, res) => {
  const query = Tender.find(buildFilter(req.query))
    .populate('departmentId', 'name code')
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });

  const result = await paginate(query, req.query.page, req.query.limit);
  return success(res, result);
});

/**
 * Cancels a tender.
 */
const cancelTender = asyncHandler(async (req, res) => {
  const tender = await Tender.findByIdAndUpdate(
    req.params.id,
    { status: CANCELLED, cancelReason: req.body.cancelReason },
    { new: true },
  );

  if (!tender) {
    return error(res, 'Tender not found', NOT_FOUND);
  }

  return success(res, tender, 'Tender cancelled');
});

/**
 * Extends a tender submission deadline.
 */
const extendDeadline = asyncHandler(async (req, res) => {
  const tender = await Tender.findByIdAndUpdate(
    req.params.id,
    { submissionDeadline: req.body.submissionDeadline },
    { new: true },
  );

  if (!tender) {
    return error(res, 'Tender not found', NOT_FOUND);
  }

  return success(res, tender, 'Deadline extended');
});

module.exports = { getAllTenders, cancelTender, extendDeadline };
