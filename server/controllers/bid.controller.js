/**
 * @fileoverview Vendor-facing bid submission and retrieval endpoints.
 */

const Bid = require('../models/Bid.model');
const Tender = require('../models/Tender.model');
const Vendor = require('../models/Vendor.model');
const { asyncHandler } = require('../utils/asyncHandler');
const { success, error } = require('../utils/responseEnvelope');
const { NOT_FOUND, CONFLICT, BAD_REQUEST } = require('../constants/httpCodes');
const { generateBidId } = require('../utils/generateId');
const { paginate } = require('../utils/paginateQuery');

/**
 * Submits a bid for a tender.
 */
const submitBid = asyncHandler(async (req, res) => {
  const tender = await Tender.findById(req.params.id);
  if (!tender) {
    return error(res, 'Tender not found', NOT_FOUND);
  }

  if (new Date() > tender.submissionDeadline) {
    return error(res, 'Submission deadline has passed', BAD_REQUEST);
  }

  const vendor = await Vendor.findOne({ userId: req.user.id });
  if (!vendor) {
    return error(res, 'Vendor profile not found', NOT_FOUND);
  }

  const existing = await Bid.findOne({ tenderId: tender._id, vendorId: vendor._id });
  if (existing) {
    return error(res, 'You have already submitted a bid for this tender', CONFLICT);
  }

  const bid = await Bid.create({
    bidId: generateBidId(),
    tenderId: tender._id,
    vendorId: vendor._id,
    ...req.body,
    technicalProposalUrl: req.body.technicalProposalUrl,
    commercialProposalUrl: req.body.commercialProposalUrl,
    supportingDocs: req.body.supportingDocs || [],
  });

  return success(res, bid, 'Bid submitted successfully', 201);
});

/**
 * Returns all bids for the authenticated vendor.
 */
const getMyBids = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findOne({ userId: req.user.id });
  if (!vendor) {
    return error(res, 'Vendor profile not found', NOT_FOUND);
  }

  const query = Bid.find({ vendorId: vendor._id })
    .populate('tenderId', 'tenderId title status submissionDeadline')
    .sort({ submittedAt: -1 });

  const result = await paginate(query, req.query.page, req.query.limit);
  return success(res, result);
});

/**
 * Returns a single bid by ID.
 */
const getBidById = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findOne({ userId: req.user.id });
  const bid = await Bid.findOne({ _id: req.params.id, vendorId: vendor?._id })
    .populate('tenderId', 'tenderId title status');

  if (!bid) {
    return error(res, 'Bid not found', NOT_FOUND);
  }

  return success(res, bid);
});

module.exports = { submitBid, getMyBids, getBidById };
