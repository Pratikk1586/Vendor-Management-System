/**
 * @fileoverview Service for creating immutable audit log entries.
 */

const AuditLog = require('../models/AuditLog.model');

/**
 * Persists an audit log entry.
 * @param {object} params Audit log fields.
 * @param {string} params.action Action identifier.
 * @param {import('mongoose').Types.ObjectId} [params.performedBy] User who performed the action.
 * @param {string} [params.role] Role of the performer.
 * @param {string} [params.targetEntity] Entity type affected.
 * @param {import('mongoose').Types.ObjectId} [params.targetId] Entity ID affected.
 * @param {*} [params.previousValue] State before change.
 * @param {*} [params.newValue] State after change.
 * @param {string} [params.ipAddress] Client IP address.
 * @returns {Promise<import('mongoose').Document>}
 */
async function createAuditLog({
  action,
  performedBy,
  role,
  targetEntity,
  targetId,
  previousValue,
  newValue,
  ipAddress,
}) {
  return AuditLog.create({
    action,
    performedBy,
    role,
    targetEntity,
    targetId,
    previousValue,
    newValue,
    ipAddress,
    timestamp: new Date(),
  });
}

module.exports = { createAuditLog };
