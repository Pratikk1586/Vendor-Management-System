/**
 * @fileoverview Department head bid evaluation and award endpoints.
 */

const Bid = require('../models/Bid.model');
const Tender = require('../models/Tender.model');
const Contract = require('../models/Contract.model');
const Vendor = require('../models/Vendor.model');
const { asyncHandler } = require('../utils/asyncHandler');
const { success, error } = require('../utils/responseEnvelope');
const { NOT_FOUND, BAD_REQUEST } = require('../constants/httpCodes');
const {
  UNDER_EVALUATION,
  SHORTLISTED,
  REJECTED,
  AWARDED,
} = require('../constants/statusTypes');
const { calculateBidScores } = require('../services/scoring.service');
const { generateContractId } = require('../utils/generateId');
const { sendContractAwardEmail } = require('../services/email.service');
const { createNotification } = require('../services/notification.service');

/**
 * Returns bids for a tender (sealed until bid opening date).
 */
const getBidsForTender = asyncHandler(async (req, res) => {
  const tender = await Tender.findOne({
    _id: req.params.id,
    departmentId: req.deptFilter.departmentId,
  });

  if (!tender) {
    return error(res, 'Tender not found', NOT_FOUND);
  }

  const now = new Date();
  if (tender.bidOpeningDate && now < tender.bidOpeningDate) {
    return success(res, { sealed: true, message: 'Bids are sealed until bid opening date', count: 0 });
  }

  const bids = await Bid.find({ tenderId: tender._id })
    .populate('vendorId', 'companyName tier')
    .sort({ weightedTotalScore: -1 });

  return success(res, bids);
});

/**
 * Opens bid evaluation for a tender.
 */
const openBidEvaluation = asyncHandler(async (req, res) => {
  const tender = await Tender.findOneAndUpdate(
    {
      _id: req.params.id,
      departmentId: req.deptFilter.departmentId,
    },
    { status: UNDER_EVALUATION },
    { new: true },
  );

  if (!tender) {
    return error(res, 'Tender not found', NOT_FOUND);
  }

  return success(res, tender, 'Bid evaluation opened');
});

/**
 * Scores a bid using evaluation criteria.
 */
const scoreBid = asyncHandler(async (req, res) => {
  const tender = await Tender.findById(req.params.id);
  const bid = await Bid.findById(req.params.bidId);

  if (!tender || !bid || bid.tenderId.toString() !== tender._id.toString()) {
    return error(res, 'Bid or tender not found', NOT_FOUND);
  }

  bid.technicalScores = req.body.technicalScores;
  bid.evaluatorComments = req.body.evaluatorComments;

  const lowestBid = await Bid.findOne({ tenderId: tender._id })
    .sort({ quotedAmount: 1 })
    .select('quotedAmount');

  const scores = calculateBidScores(bid, tender, lowestBid?.quotedAmount);
  bid.totalTechnicalScore = scores.technicalScore;
  bid.commercialScore = scores.commercialScore;
  bid.weightedTotalScore = scores.weightedTotalScore;
  bid.status = UNDER_EVALUATION;
  await bid.save();

  return success(res, bid, 'Bid scored');
});

/**
 * Shortlists a bid.
 */
const shortlistBid = asyncHandler(async (req, res) => {
  const bid = await Bid.findByIdAndUpdate(
    req.params.bidId,
    { status: SHORTLISTED },
    { new: true },
  );

  if (!bid) {
    return error(res, 'Bid not found', NOT_FOUND);
  }

  return success(res, bid, 'Bid shortlisted');
});

/**
 * Rejects a bid.
 */
const rejectBid = asyncHandler(async (req, res) => {
  const bid = await Bid.findByIdAndUpdate(
    req.params.bidId,
    { status: REJECTED, evaluatorComments: req.body.reason },
    { new: true },
  );

  if (!bid) {
    return error(res, 'Bid not found', NOT_FOUND);
  }

  return success(res, bid, 'Bid rejected');
});

/**
 * Awards contract from winning bid (pending admin confirmation).
 */
const awardContract = asyncHandler(async (req, res) => {
  const { bidId } = req.body;
  const tender = await Tender.findOne({
    _id: req.params.id,
    departmentId: req.deptFilter.departmentId,
  });

  if (!tender) {
    return error(res, 'Tender not found', NOT_FOUND);
  }

  const bid = await Bid.findById(bidId);
  if (!bid) {
    return error(res, 'Bid not found', NOT_FOUND);
  }

  const contract = await Contract.create({
    contractId: generateContractId(),
    tenderId: tender._id,
    vendorId: bid.vendorId,
    departmentId: tender.departmentId,
    contractValue: bid.quotedAmount,
    status: 'pending_admin',
    awardedBy: req.user.id,
  });

  bid.status = AWARDED;
  await bid.save();

  tender.status = AWARDED;
  tender.awardedTo = bid.vendorId;
  tender.awardedAt = new Date();
  await tender.save();

  const vendor = await Vendor.findById(bid.vendorId);
  if (vendor) {
    await sendContractAwardEmail(vendor, contract);
    await createNotification({
      userId: vendor.userId,
      title: 'Contract Awarded',
      message: `Contract ${contract.contractId} is pending admin confirmation.`,
      type: 'contract_award',
    });
  }

  return success(res, contract, 'Contract created pending admin confirmation', 201);
});

module.exports = {
  getBidsForTender,
  openBidEvaluation,
  scoreBid,
  shortlistBid,
  rejectBid,
  awardContract,
};
