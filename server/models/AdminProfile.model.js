/**
 * @fileoverview Mongoose schema for HR admin employee profiles.
 */

const mongoose = require('mongoose');

const adminProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    employeeId: {
      type: String,
      required: true,
      trim: true,
    },
    designation: String,
    authCodeUsed: String,
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

/**
 * Admin profile model.
 * @type {mongoose.Model}
 */
const AdminProfile = mongoose.model('AdminProfile', adminProfileSchema);

module.exports = AdminProfile;
