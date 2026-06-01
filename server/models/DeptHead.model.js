/**
 * @fileoverview Sequelize model for department head employee profiles.
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const DeptHead = sequelize.define('DeptHead', {
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
    unique: true,
    set(val) {
      if (val) {
        this.setDataValue('employeeId', val.trim());
      }
    },
  },
  departmentId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  yearsAtCompany: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  documents: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
}, {
  timestamps: true,
});

module.exports = DeptHead;

// Define associations
process.nextTick(() => {
  const User = require('./User.model');
  const Department = require('./Department.model');

  DeptHead.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  DeptHead.belongsTo(Department, { foreignKey: 'departmentId', as: 'dept' });
});
