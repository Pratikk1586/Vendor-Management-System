/**
 * @fileoverview Admin contract confirmation and amendment endpoints.
 */

const Contract = require('../models/Contract.model');
const Tender = require('../models/Tender.model');
const { asyncHandler } = require('../utils/asyncHandler');
const { success, error } = require('../utils/responseEnvelope');
const { NOT_FOUND } = require('../constants/httpCodes');
const { paginate } = require('../utils/paginateQuery');
const { buildFilter } = require('../utils/buildFilter');

/**
 * Returns all contracts.
 */
const getAllContracts = asyncHandler(async (req, res) => {
  const query = Contract.find(buildFilter(req.query))
    .populate('vendorId', 'companyName')
    .populate('departmentId', 'name code')
    .sort({ createdAt: -1 });

  const result = await paginate(query, req.query.page, req.query.limit);
  return success(res, result);
});

/**
 * Confirms an awarded contract.
 */
const confirmAward = asyncHandler(async (req, res) => {
  const contract = await Contract.findByIdAndUpdate(
    req.params.id,
    {
      status: 'active',
      confirmedBy: req.user.id,
      startDate: req.body.startDate || new Date(),
    },
    { new: true },
  );

  if (!contract) {
    return error(res, 'Contract not found', NOT_FOUND);
  }

  await Tender.findByIdAndUpdate(contract.tenderId, {
    adminConfirmed: true,
    adminConfirmedBy: req.user.id,
  });

  return success(res, contract, 'Contract confirmed');
});

/**
 * Rejects a pending contract award.
 */
const rejectAward = asyncHandler(async (req, res) => {
  const contract = await Contract.findByIdAndUpdate(
    req.params.id,
    { status: 'terminated', terminationReason: req.body.reason },
    { new: true },
  );

  if (!contract) {
    return error(res, 'Contract not found', NOT_FOUND);
  }

  return success(res, contract, 'Award rejected');
});

/**
 * Amends contract details.
 */
const amendContract = asyncHandler(async (req, res) => {
  const contract = await Contract.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!contract) {
    return error(res, 'Contract not found', NOT_FOUND);
  }

  return success(res, contract, 'Contract amended');
});

module.exports = {
  getAllContracts,
  confirmAward,
  rejectAward,
  amendContract,
};
