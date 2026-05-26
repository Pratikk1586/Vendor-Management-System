/**
 * @fileoverview Vendor-facing contract retrieval endpoints.
 */

const Contract = require('../models/Contract.model');
const Vendor = require('../models/Vendor.model');
const { asyncHandler } = require('../utils/asyncHandler');
const { success, error } = require('../utils/responseEnvelope');
const { NOT_FOUND } = require('../constants/httpCodes');
const { paginate } = require('../utils/paginateQuery');

/**
 * Returns contracts for the authenticated vendor.
 */
const getMyContracts = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findOne({ userId: req.user.id });
  if (!vendor) {
    return error(res, 'Vendor profile not found', NOT_FOUND);
  }

  const query = Contract.find({ vendorId: vendor._id })
    .populate('tenderId', 'tenderId title')
    .populate('departmentId', 'name code')
    .sort({ createdAt: -1 });

  const result = await paginate(query, req.query.page, req.query.limit);
  return success(res, result);
});

/**
 * Returns a single contract by ID.
 */
const getContractById = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findOne({ userId: req.user.id });
  const contract = await Contract.findOne({
    _id: req.params.id,
    vendorId: vendor?._id,
  })
    .populate('tenderId', 'tenderId title')
    .populate('departmentId', 'name code');

  if (!contract) {
    return error(res, 'Contract not found', NOT_FOUND);
  }

  return success(res, contract);
});

module.exports = { getMyContracts, getContractById };
