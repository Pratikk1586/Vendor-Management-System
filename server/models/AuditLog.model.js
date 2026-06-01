/**
 * @fileoverview Sequelize model for immutable audit trail entries.
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AuditLog = sequelize.define('AuditLog', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
    set(val) {
      if (val) {
        this.setDataValue('action', val.trim());
      }
    },
  },
  performedBy: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  targetEntity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  targetId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  previousValue: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  newValue: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  indexes: [
    {
      fields: ['performedBy'],
    },
    {
      fields: ['timestamp'],
    },
  ],
});

module.exports = AuditLog;

// Define associations
process.nextTick(() => {
  const User = require('./User.model');
  AuditLog.belongsTo(User, { foreignKey: 'performedBy', as: 'performer' });
});
