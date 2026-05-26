/**
 * @fileoverview Admin bid oversight endpoints.
 */

const Bid = require('../models/Bid.model');
const { asyncHandler } = require('../utils/asyncHandler');
const { success, error } = require('../utils/responseEnvelope');
const { NOT_FOUND } = require('../constants/httpCodes');
const { paginate } = require('../utils/paginateQuery');
const { buildFilter } = require('../utils/buildFilter');

/**
 * Returns all bids with filters.
 */
const getAllBids = asyncHandler(async (req, res) => {
  const query = Bid.find(buildFilter(req.query))
    .populate('tenderId', 'tenderId title')
    .populate('vendorId', 'companyName')
    .sort({ submittedAt: -1 });

  const result = await paginate(query, req.query.page, req.query.limit);
  return success(res, result);
});

/**
 * Flags a bid for review.
 */
const flagBid = asyncHandler(async (req, res) => {
  const bid = await Bid.findByIdAndUpdate(
    req.params.id,
    { isFlagged: true, flagReason: req.body.flagReason },
    { new: true },
  );

  if (!bid) {
    return error(res, 'Bid not found', NOT_FOUND);
  }

  return success(res, bid, 'Bid flagged');
});

/**
 * Overrides bid scores manually.
 */
const overrideScore = asyncHandler(async (req, res) => {
  const bid = await Bid.findByIdAndUpdate(
    req.params.id,
    {
      totalTechnicalScore: req.body.totalTechnicalScore,
      commercialScore: req.body.commercialScore,
      weightedTotalScore: req.body.weightedTotalScore,
      rank: req.body.rank,
    },
    { new: true },
  );

  if (!bid) {
    return error(res, 'Bid not found', NOT_FOUND);
  }

  return success(res, bid, 'Scores overridden');
});

module.exports = { getAllBids, flagBid, overrideScore };
