/**
 * @fileoverview Mongoose schema for organizational departments.
 */

const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    description: String,
    headUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

/**
 * Department model.
 * @type {mongoose.Model}
 */
const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
