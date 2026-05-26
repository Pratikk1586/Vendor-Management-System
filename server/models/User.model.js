/**
 * @fileoverview Mongoose schema for portal users (vendors, department heads, and admins).
 */

const mongoose = require('mongoose');
const { VENDOR, DEPT_HEAD, HR_ADMIN } = require('../constants/roles');
const {
  PENDING,
  ACTIVE,
  SUSPENDED,
  BLACKLISTED,
  DELETED,
} = require('../constants/statusTypes');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [VENDOR, DEPT_HEAD, HR_ADMIN],
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },
    vendorProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
    },
    deptHeadProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DeptHead',
    },
    adminProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdminProfile',
    },
    status: {
      type: String,
      enum: [PENDING, ACTIVE, SUSPENDED, BLACKLISTED, DELETED],
      default: PENDING,
    },
    suspensionReason: String,
    suspensionUntil: Date,
    blacklistReason: String,
    blacklistedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    blacklistedAt: Date,
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    approvedAt: Date,
    rejectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rejectedAt: Date,
    rejectionReason: String,
    lastLogin: Date,
    passwordResetToken: String,
    passwordResetExpiry: Date,
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockedUntil: Date,
    deletedAt: Date,
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    deleteReason: String,
  },
  { timestamps: true },
);

/**
 * User model for authentication and role-based access.
 * @type {mongoose.Model}
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
