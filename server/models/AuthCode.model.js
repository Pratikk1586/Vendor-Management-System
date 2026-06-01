/**
 * @fileoverview Sequelize model for one-time admin registration authorization codes.
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AuthCode = sequelize.define('AuthCode', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    set(val) {
      if (val) {
        this.setDataValue('code', val.trim());
      }
    },
  },
  hashedCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  usedBy: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  isUsed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = AuthCode;

// Define associations
process.nextTick(() => {
  const User = require('./User.model');

  AuthCode.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });
  AuthCode.belongsTo(User, { foreignKey: 'usedBy', as: 'user' });
});
