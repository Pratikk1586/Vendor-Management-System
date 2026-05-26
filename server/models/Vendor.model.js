/**
 * @fileoverview Mongoose schema for vendor company profiles and performance data.
 */

const mongoose = require('mongoose');
const {
  PENDING,
  ACTIVE,
  SUSPENDED,
  BLACKLISTED,
} = require('../constants/statusTypes');

const COMPANY_TYPES = [
  'proprietorship',
  'partnership',
  'private_limited',
  'public_limited',
  'llp',
  'other',
];

const VENDOR_TIERS = ['silver', 'gold', 'platinum'];

const vendorDepartmentSchema = new mongoose.Schema(
  {
    deptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    status: {
      type: String,
      enum: [PENDING, ACTIVE, SUSPENDED, BLACKLISTED],
      default: PENDING,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    approvedAt: Date,
    rejectionReason: String,
  },
  { _id: true },
);

const performanceScoreSchema = new mongoose.Schema(
  {
    quality: { type: Number, default: 0 },
    delivery: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    compliance: { type: Number, default: 0 },
    overall: { type: Number, default: 0 },
  },
  { _id: false },
);

const addressSchema = new mongoose.Schema(
  {
    street: String,
    city: String,
    state: String,
    pin: String,
  },
  { _id: false },
);

const contactSchema = new mongoose.Schema(
  {
    name: String,
    designation: String,
    email: String,
    mobile: String,
    isPrimary: { type: Boolean, default: false },
  },
  { _id: true },
);

const documentSchema = new mongoose.Schema(
  {
    type: String,
    url: String,
    uploadedAt: Date,
    expiryDate: Date,
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    isVerified: { type: Boolean, default: false },
  },
  { _id: true },
);

const vendorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    gstNumber: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    panNumber: {
      type: String,
      trim: true,
    },
    yearEstablished: Number,
    companyType: {
      type: String,
      enum: COMPANY_TYPES,
    },
    industryType: String,
    website: String,
    departments: [vendorDepartmentSchema],
    tier: {
      type: String,
      enum: VENDOR_TIERS,
      default: 'silver',
    },
    performanceScore: {
      type: performanceScoreSchema,
      default: () => ({}),
    },
    address: addressSchema,
    contacts: [contactSchema],
    documents: [documentSchema],
    annualTurnover: String,
    operationalLocations: [String],
    isPreferred: {
      type: Boolean,
      default: false,
    },
    isStrategicPartner: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

/**
 * Vendor profile model.
 * @type {mongoose.Model}
 */
const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
