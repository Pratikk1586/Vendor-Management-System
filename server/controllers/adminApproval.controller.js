/**
 * @fileoverview Admin registration approval queue endpoints.
 */

const User = require('../models/User.model');
const { asyncHandler } = require('../utils/asyncHandler');
const { success, error } = require('../utils/responseEnvelope');
const { NOT_FOUND } = require('../constants/httpCodes');
const { PENDING, ACTIVE } = require('../constants/statusTypes');
const { paginate } = require('../utils/paginateQuery');
const { sendApprovalEmail, sendRejectionEmail } = require('../services/email.service');
const { createNotification } = require('../services/notification.service');

/**
 * Returns users pending approval.
 */
const getPendingApprovals = asyncHandler(async (req, res) => {
  const query = User.find({ status: PENDING }).select('-passwordHash').sort({ createdAt: 1 });
  const result = await paginate(query, req.query.page, req.query.limit);
  return success(res, result);
});

/**
 * Approves a pending registration.
 */
const approveRegistration = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { status: ACTIVE, approvedBy: req.user.id, approvedAt: new Date() },
    { new: true },
  ).select('-passwordHash');

  if (!user) {
    return error(res, 'User not found', NOT_FOUND);
  }

  await sendApprovalEmail(user);
  await createNotification({
    userId: user._id,
    title: 'Account Approved',
    message: 'Your registration has been approved. You can now log in.',
    type: 'approval',
  });

  return success(res, user, 'Registration approved');
});

/**
 * Rejects a pending registration.
 */
const rejectRegistration = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      rejectedBy: req.user.id,
      rejectedAt: new Date(),
      rejectionReason: req.body.reason,
    },
    { new: true },
  ).select('-passwordHash');

  if (!user) {
    return error(res, 'User not found', NOT_FOUND);
  }

  await sendRejectionEmail(user, req.body.reason);
  return success(res, user, 'Registration rejected');
});

module.exports = {
  getPendingApprovals,
  approveRegistration,
  rejectRegistration,
};
