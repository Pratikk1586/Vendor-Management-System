/**
 * @fileoverview Mongoose schema for in-app user notifications.
 */

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
    message: String,
    type: String,
    isRead: {
      type: Boolean,
      default: false,
    },
    link: String,
  },
  { timestamps: true },
);

notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });

/**
 * Notification model.
 * @type {mongoose.Model}
 */
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
