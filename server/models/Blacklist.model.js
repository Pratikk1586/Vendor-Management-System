/**
 * @fileoverview Mongoose schema for globally blacklisted email addresses.
 */

const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    reason: String,
    blacklistedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

/**
 * Blacklist model.
 * @type {mongoose.Model}
 */
const Blacklist = mongoose.model('Blacklist', blacklistSchema);

module.exports = Blacklist;
