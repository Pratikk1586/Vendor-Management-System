/**
 * @fileoverview In-app notification creation and read-state management.
 */

const Notification = require('../models/Notification.model');

/**
 * Creates a notification for a user.
 * @param {object} params Notification fields.
 * @param {string} params.userId Target user ID.
 * @param {string} params.title Notification title.
 * @param {string} params.message Notification body.
 * @param {string} [params.type] Notification category.
 * @param {string} [params.link] Deep link path.
 * @returns {Promise<object>}
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
 * @param {string} notificationId Notification ID.
 * @param {string} userId Owner user ID.
 * @returns {Promise<object|null>}
 */
async function markAsRead(notificationId, userId) {
  const notification = await Notification.findOne({
    where: { id: notificationId, userId }
  });

  if (!notification) {
    return null;
  }

  notification.isRead = true;
  await notification.save();
  return notification;
}

/**
 * Returns unread notifications for a user.
 * @param {string} userId User ID.
 * @returns {Promise<Array<object>>}
 */
async function getUnread(userId) {
  return Notification.findAll({
    where: { userId, isRead: false },
    order: [['createdAt', 'DESC']],
    raw: true
  });
}

module.exports = {
  createNotification,
  markAsRead,
  getUnread,
};
