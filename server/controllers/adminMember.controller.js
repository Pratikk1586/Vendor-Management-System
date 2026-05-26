/**
 * @fileoverview Admin member management endpoints.
 */

const User = require('../models/User.model');
const AuditLog = require('../models/AuditLog.model');
const { asyncHandler } = require('../utils/asyncHandler');
const { success, error } = require('../utils/responseEnvelope');
const { NOT_FOUND } = require('../constants/httpCodes');
const { ACTIVE, DELETED, SUSPENDED } = require('../constants/statusTypes');
const { paginate } = require('../utils/paginateQuery');
const { buildFilter } = require('../utils/buildFilter');
const { hashPassword } = require('../utils/hashPassword');
const { createNotification } = require('../services/notification.service');
const { sendApprovalEmail } = require('../services/email.service');

/**
 * Returns all members with optional filters.
 */
const getAllMembers = asyncHandler(async (req, res) => {
  const filter = buildFilter(req.query);
  const query = User.find(filter).select('-passwordHash').sort({ createdAt: -1 });
  const result = await paginate(query, req.query.page, req.query.limit);
  return success(res, result);
});

/**
 * Returns a member by ID.
 */
const getMemberById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-passwordHash');
  if (!user) {
    return error(res, 'Member not found', NOT_FOUND);
  }
  return success(res, user);
});

/**
 * Updates member fields.
 */
const updateMember = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).select('-passwordHash');

  if (!user) {
    return error(res, 'Member not found', NOT_FOUND);
  }

  return success(res, user, 'Member updated');
});

/**
 * Changes a member's role.
 */
const changeMemberRole = asyncHandler(async (req, res) => {
  const { role, department } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role, department },
    { new: true },
  ).select('-passwordHash');

  if (!user) {
    return error(res, 'Member not found', NOT_FOUND);
  }

  return success(res, user, 'Role updated');
});

/**
 * Changes a member's account status.
 */
const changeMemberStatus = asyncHandler(async (req, res) => {
  const { status, reason, suspensionUntil } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { status, suspensionReason: reason, suspensionUntil },
    { new: true },
  ).select('-passwordHash');

  if (!user) {
    return error(res, 'Member not found', NOT_FOUND);
  }

  return success(res, user, 'Status updated');
});

/**
 * Soft-deletes a member.
 */
const deleteMember = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      status: DELETED,
      deletedAt: new Date(),
      deletedBy: req.user.id,
      deleteReason: req.body.reason,
    },
    { new: true },
  ).select('-passwordHash');

  if (!user) {
    return error(res, 'Member not found', NOT_FOUND);
  }

  return success(res, user, 'Member deleted');
});

/**
 * Resets a member's password.
 */
const resetMemberPassword = asyncHandler(async (req, res) => {
  const passwordHash = await hashPassword(req.body.password || 'TataReset@2024');
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { passwordHash },
    { new: true },
  ).select('-passwordHash');

  if (!user) {
    return error(res, 'Member not found', NOT_FOUND);
  }

  return success(res, null, 'Password reset successfully');
});

/**
 * Returns audit trail for a member.
 */
const getMemberAuditTrail = asyncHandler(async (req, res) => {
  const query = AuditLog.find({ performedBy: req.params.id }).sort({ timestamp: -1 });
  const result = await paginate(query, req.query.page, req.query.limit);
  return success(res, result);
});

/**
 * Performs bulk actions on members.
 */
const bulkAction = asyncHandler(async (req, res) => {
  const { action, memberIds, reason } = req.body;
  const results = [];

  for (const id of memberIds) {
    if (action === 'approve') {
      const user = await User.findByIdAndUpdate(id, { status: ACTIVE, approvedBy: req.user.id, approvedAt: new Date() }, { new: true });
      if (user) {
        await sendApprovalEmail(user);
        results.push({ id, status: 'approved' });
      }
    } else if (action === 'suspend') {
      await User.findByIdAndUpdate(id, { status: SUSPENDED, suspensionReason: reason });
      results.push({ id, status: 'suspended' });
    } else if (action === 'notify') {
      await createNotification({ userId: id, title: 'Admin Notice', message: reason || 'Important update from admin.', type: 'admin' });
      results.push({ id, status: 'notified' });
    } else if (action === 'export') {
      results.push({ id, status: 'queued_for_export' });
    }
  }

  return success(res, { results }, `Bulk ${action} completed`);
});

module.exports = {
  getAllMembers,
  getMemberById,
  updateMember,
  changeMemberRole,
  changeMemberStatus,
  deleteMember,
  resetMemberPassword,
  getMemberAuditTrail,
  bulkAction,
};
