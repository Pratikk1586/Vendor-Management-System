/**
 * @fileoverview Sequelize model for HR admin employee profiles.
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AdminProfile = sequelize.define('AdminProfile', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },
  employeeId: {
    type: DataTypes.STRING,
    allowNull: false,
    set(val) {
      if (val) {
        this.setDataValue('employeeId', val.trim());
      }
    },
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  authCodeUsed: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isSuperAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

module.exports = AdminProfile;

// Define associations
process.nextTick(() => {
  const User = require('./User.model');
  AdminProfile.belongsTo(User, { foreignKey: 'userId', as: 'user' });
});
