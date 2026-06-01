/**
 * @fileoverview Sequelize model for in-app user notifications.
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
    set(val) {
      if (val) {
        this.setDataValue('title', val.trim());
      }
    },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['userId', 'isRead', 'createdAt'],
    },
  ],
});

module.exports = Notification;

// Define associations
process.nextTick(() => {
  const User = require('./User.model');
  Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });
});
