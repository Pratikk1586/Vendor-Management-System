/**
 * @fileoverview Mongoose schema for immutable audit trail entries.
 */

const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    trim: true,
  },
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  role: String,
  targetEntity: String,
  targetId: mongoose.Schema.Types.ObjectId,
  previousValue: mongoose.Schema.Types.Mixed,
  newValue: mongoose.Schema.Types.Mixed,
  ipAddress: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

auditLogSchema.index({ performedBy: 1 });
auditLogSchema.index({ timestamp: -1 });

/**
 * Audit log model.
 * @type {mongoose.Model}
 */
const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog;
