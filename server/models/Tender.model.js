/**
 * @fileoverview Mongoose schema for procurement tenders and bidding lifecycle.
 */

const mongoose = require('mongoose');
const {
  DRAFT,
  PUBLISHED,
  UNDER_EVALUATION,
  AWARDED,
  CANCELLED,
} = require('../constants/statusTypes');

const TENDER_TYPES = ['rate_contract', 'one_time', 'amc', 'works_contract'];

const TENDER_STATUSES = [
  DRAFT,
  PUBLISHED,
  'bid_open',
  UNDER_EVALUATION,
  AWARDED,
  CANCELLED,
];

const eligibilitySchema = new mongoose.Schema(
  {
    minTier: {
      type: String,
      enum: ['silver', 'gold', 'platinum'],
    },
    minTurnover: String,
    requiredCertifications: [String],
  },
  { _id: false },
);

const evaluationCriteriaSchema = new mongoose.Schema(
  {
    name: String,
    weightage: Number,
  },
  { _id: true },
);

const tenderSchema = new mongoose.Schema(
  {
    tenderId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    description: String,
    scopeOfWork: String,
    type: {
      type: String,
      enum: TENDER_TYPES,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    estimatedBudget: Number,
    isBudgetHidden: {
      type: Boolean,
      default: true,
    },
    eligibility: {
      type: eligibilitySchema,
      default: () => ({}),
    },
    submissionDeadline: {
      type: Date,
      required: true,
    },
    bidOpeningDate: Date,
    evaluationCriteria: [evaluationCriteriaSchema],
    commercialWeightage: {
      type: Number,
      default: 40,
    },
    status: {
      type: String,
      enum: TENDER_STATUSES,
      default: DRAFT,
    },
    termsDocUrl: String,
    publishedAt: Date,
    awardedAt: Date,
    awardedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
    },
    adminConfirmed: {
      type: Boolean,
      default: false,
    },
    adminConfirmedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    cancelReason: String,
  },
  { timestamps: true },
);

/**
 * Tender model.
 * @type {mongoose.Model}
 */
const Tender = mongoose.model('Tender', tenderSchema);

module.exports = Tender;
