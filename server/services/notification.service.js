/**
 * @fileoverview In-app notification creation and read-state management.
 */

const Notification = require('../models/Notification.model');

/**
 * Creates a notification for a user.
 * @param {object} params Notification fields.
 * @param {import('mongoose').Types.ObjectId} params.userId Target user ID.
 * @param {string} params.title Notification title.
 * @param {string} params.message Notification body.
 * @param {string} [params.type] Notification category.
 * @param {string} [params.link] Deep link path.
 * @returns {Promise<import('mongoose').Document>}
 */
async function createNotification({ userId, title, message, type, link }) {
  return Notification.create({
    userId,
    title,
    message,
    type,
    link,
  });
}

/**
 * Marks a notification as read for the owning user.
 * @param {import('mongoose').Types.ObjectId|string} notificationId Notification ID.
 * @param {import('mongoose').Types.ObjectId|string} userId Owner user ID.
 * @returns {Promise<import('mongoose').Document|null>}
 */
async function markAsRead(notificationId, userId) {
  return Notification.findOneAndUpdate(
    { _id: notificationId, userId },
    { isRead: true },
    { new: true },
  );
}

/**
 * Returns unread notifications for a user.
 * @param {import('mongoose').Types.ObjectId|string} userId User ID.
 * @returns {Promise<import('mongoose').Document[]>}
 */
async function getUnread(userId) {
  return Notification.find({ userId, isRead: false })
    .sort({ createdAt: -1 })
    .lean();
}

module.exports = {
  createNotification,
  markAsRead,
  getUnread,
};
