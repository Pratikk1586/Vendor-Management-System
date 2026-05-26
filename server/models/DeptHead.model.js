/**
 * @fileoverview Mongoose schema for department head employee profiles.
 */

const mongoose = require('mongoose');

const deptHeadDocumentSchema = new mongoose.Schema(
  {
    type: String,
    url: String,
    uploadedAt: Date,
  },
  { _id: true },
);

const deptHeadSchema = new mongoose.Schema(
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
      unique: true,
      trim: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },
    designation: String,
    yearsAtCompany: Number,
    documents: [deptHeadDocumentSchema],
  },
  { timestamps: true },
);

/**
 * Department head profile model.
 * @type {mongoose.Model}
 */
const DeptHead = mongoose.model('DeptHead', deptHeadSchema);

module.exports = DeptHead;
