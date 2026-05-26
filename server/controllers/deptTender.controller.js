/**
 * @fileoverview Department head tender management endpoints.
 */

const Tender = require('../models/Tender.model');
const { asyncHandler } = require('../utils/asyncHandler');
const { success, error } = require('../utils/responseEnvelope');
const { NOT_FOUND, BAD_REQUEST } = require('../constants/httpCodes');
const { DRAFT, PUBLISHED, CANCELLED } = require('../constants/statusTypes');
const { generateTenderId } = require('../utils/generateId');
const { paginate } = require('../utils/paginateQuery');
const { buildFilter } = require('../utils/buildFilter');

/**
 * Creates a new tender for the department.
 */
const createTender = asyncHandler(async (req, res) => {
  const tender = await Tender.create({
    ...req.body,
    tenderId: generateTenderId(),
    departmentId: req.deptFilter.departmentId || req.user.departmentId,
    createdBy: req.user.id,
    status: DRAFT,
  });

  return success(res, tender, 'Tender created', 201);
});

/**
 * Updates a draft tender.
 */
const updateTender = asyncHandler(async (req, res) => {
  const tender = await Tender.findOne({
    _id: req.params.id,
    departmentId: req.deptFilter.departmentId,
    createdBy: req.user.id,
  });

  if (!tender) {
    return error(res, 'Tender not found', NOT_FOUND);
  }

  if (tender.status !== DRAFT) {
    return error(res, 'Only draft tenders can be updated', BAD_REQUEST);
  }

  Object.assign(tender, req.body);
  await tender.save();

  return success(res, tender, 'Tender updated');
});

/**
 * Publishes a tender.
 */
const publishTender = asyncHandler(async (req, res) => {
  const tender = await Tender.findOneAndUpdate(
    {
      _id: req.params.id,
      departmentId: req.deptFilter.departmentId,
      status: DRAFT,
    },
    { status: PUBLISHED, publishedAt: new Date() },
    { new: true },
  );

  if (!tender) {
    return error(res, 'Tender not found or not in draft status', NOT_FOUND);
  }

  return success(res, tender, 'Tender published');
});

/**
 * Returns tenders for the department.
 */
const getTenders = asyncHandler(async (req, res) => {
  const filter = {
    departmentId: req.deptFilter.departmentId,
    ...buildFilter(req.query),
  };

  const query = Tender.find(filter).sort({ createdAt: -1 });
  const result = await paginate(query, req.query.page, req.query.limit);
  return success(res, result);
});

/**
 * Returns a tender by ID.
 */
const getTenderById = asyncHandler(async (req, res) => {
  const tender = await Tender.findOne({
    _id: req.params.id,
    departmentId: req.deptFilter.departmentId,
  });

  if (!tender) {
    return error(res, 'Tender not found', NOT_FOUND);
  }

  return success(res, tender);
});

/**
 * Cancels a tender.
 */
const cancelTender = asyncHandler(async (req, res) => {
  const tender = await Tender.findOneAndUpdate(
    {
      _id: req.params.id,
      departmentId: req.deptFilter.departmentId,
    },
    { status: CANCELLED, cancelReason: req.body.cancelReason },
    { new: true },
  );

  if (!tender) {
    return error(res, 'Tender not found', NOT_FOUND);
  }

  return success(res, tender, 'Tender cancelled');
});

module.exports = {
  createTender,
  updateTender,
  publishTender,
  getTenders,
  getTenderById,
  cancelTender,
};
