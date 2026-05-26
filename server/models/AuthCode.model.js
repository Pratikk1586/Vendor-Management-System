/**
 * @fileoverview Mongoose schema for one-time admin registration authorization codes.
 */

const mongoose = require('mongoose');

const authCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    hashedCode: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    usedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

/**
 * Auth code model for admin onboarding.
 * @type {mongoose.Model}
 */
const AuthCode = mongoose.model('AuthCode', authCodeSchema);

module.exports = AuthCode;
