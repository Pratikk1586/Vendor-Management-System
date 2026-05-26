/**
 * @fileoverview HTTP handlers for vendor profile and notification endpoints.
 */

const Vendor = require('../models/Vendor.model');
const { asyncHandler } = require('../utils/asyncHandler');
const { success, error } = require('../utils/responseEnvelope');
const { NOT_FOUND } = require('../constants/httpCodes');
const { saveDocument } = require('../services/document.service');
const { getUnread, markAsRead } = require('../services/notification.service');
const { evaluateTier } = require('../services/tierEvaluation.service');

/**
 * Returns the authenticated vendor's profile.
 */
const getProfile = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findOne({ userId: req.user.id })
    .populate('departments.deptId', 'name code');

  if (!vendor) {
    return error(res, 'Vendor profile not found', NOT_FOUND);
  }

  return success(res, vendor);
});

/**
 * Updates the authenticated vendor's profile.
 */
const updateProfile = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findOneAndUpdate(
    { userId: req.user.id },
    { $set: req.body },
    { new: true, runValidators: true },
  );

  if (!vendor) {
    return error(res, 'Vendor profile not found', NOT_FOUND);
  }

  if (req.body.performanceScore) {
    vendor.tier = evaluateTier(vendor.performanceScore);
    await vendor.save();
  }

  return success(res, vendor, 'Profile updated');
});

/**
 * Uploads a document for the vendor profile.
 */
const uploadDocuments = asyncHandler(async (req, res) => {
  if (!req.file) {
    return error(res, 'No file uploaded', 400);
  }

  const doc = await saveDocument(req.file, req.user.id, req.body.type || 'general');
  return success(res, doc, 'Document uploaded', 201);
});

/**
 * Returns vendor notifications.
 */
const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await getUnread(req.user.id);
  return success(res, notifications);
});

/**
 * Marks a notification as read.
 */
const markNotificationRead = asyncHandler(async (req, res) => {
  const notification = await markAsRead(req.params.id, req.user.id);
  return success(res, notification, 'Notification marked as read');
});

module.exports = {
  getProfile,
  updateProfile,
  uploadDocuments,
  getNotifications,
  markNotificationRead,
};
