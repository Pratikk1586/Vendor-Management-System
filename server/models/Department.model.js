/**
 * @fileoverview Sequelize model for organizational departments.
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Department = sequelize.define('Department', {
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
        this.setDataValue('code', val.trim().toUpperCase());
      }
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    set(val) {
      if (val) {
        this.setDataValue('name', val.trim());
      }
    },
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
    set(val) {
      if (val) {
        this.setDataValue('category', val.trim());
      }
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  headUserId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
});

module.exports = Department;

// Define relationships
process.nextTick(() => {
  const User = require('./User.model');
  Department.belongsTo(User, { foreignKey: 'headUserId', as: 'headUser' });
});
