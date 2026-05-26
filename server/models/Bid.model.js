/**
 * @fileoverview Mongoose schema for vendor bids submitted against tenders.
 */

const mongoose = require('mongoose');
const {
  SUBMITTED,
  UNDER_EVALUATION,
  SHORTLISTED,
  NOT_SELECTED,
  AWARDED,
  REJECTED,
} = require('../constants/statusTypes');

const BID_STATUSES = [
  SUBMITTED,
  UNDER_EVALUATION,
  SHORTLISTED,
  NOT_SELECTED,
  AWARDED,
  REJECTED,
];

const technicalScoreSchema = new mongoose.Schema(
  {
    criteriaName: String,
    score: Number,
    maxScore: Number,
    scoredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { _id: true },
);

const bidSchema = new mongoose.Schema(
  {
    bidId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    tenderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tender',
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true,
    },
    quotedAmount: {
      type: Number,
      required: true,
    },
    deliveryDays: {
      type: Number,
      required: true,
    },
    bidValidityDays: {
      type: Number,
      required: true,
    },
    technicalProposalUrl: String,
    commercialProposalUrl: String,
    supportingDocs: [String],
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: BID_STATUSES,
      default: SUBMITTED,
    },
    technicalScores: [technicalScoreSchema],
    totalTechnicalScore: Number,
    commercialScore: Number,
    weightedTotalScore: Number,
    rank: Number,
    evaluatorComments: String,
    isFlagged: {
      type: Boolean,
      default: false,
    },
    flagReason: String,
  },
  { timestamps: true },
);

bidSchema.index({ tenderId: 1, vendorId: 1 }, { unique: true });

/**
 * Bid model.
 * @type {mongoose.Model}
 */
const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
