/**
 * @fileoverview Mongoose schema for awarded contracts between departments and vendors.
 */

const mongoose = require('mongoose');

const CONTRACT_STATUSES = [
  'pending_admin',
  'active',
  'completed',
  'terminated',
];

const MILESTONE_STATUSES = ['pending', 'in_progress', 'completed', 'overdue'];

const milestoneSchema = new mongoose.Schema(
  {
    title: String,
    dueDate: Date,
    completedDate: Date,
    status: {
      type: String,
      enum: MILESTONE_STATUSES,
      default: 'pending',
    },
  },
  { _id: true },
);

const postContractRatingSchema = new mongoose.Schema(
  {
    quality: Number,
    delivery: Number,
    overall: Number,
  },
  { _id: false },
);

const contractSchema = new mongoose.Schema(
  {
    contractId: {
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
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    contractValue: {
      type: Number,
      required: true,
    },
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: CONTRACT_STATUSES,
      default: 'pending_admin',
    },
    milestones: [milestoneSchema],
    postContractRating: postContractRatingSchema,
    awardedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    confirmedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    terminationReason: String,
  },
  { timestamps: true },
);

/**
 * Contract model.
 * @type {mongoose.Model}
 */
const Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;
