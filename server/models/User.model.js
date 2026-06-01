/**
 * @fileoverview Sequelize model for portal users (vendors, department heads, and admins).
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { VENDOR, DEPT_HEAD, HR_ADMIN } = require('../constants/roles');
const {
  PENDING,
  ACTIVE,
  SUSPENDED,
  BLACKLISTED,
  DELETED,
} = require('../constants/statusTypes');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    set(val) {
      if (val) {
        this.setDataValue('email', val.trim().toLowerCase());
      }
    },
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [[VENDOR, DEPT_HEAD, HR_ADMIN]],
    },
  },
  departmentId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  vendorProfileId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  deptHeadProfileId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  adminProfileId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: PENDING,
    validate: {
      isIn: [[PENDING, ACTIVE, SUSPENDED, BLACKLISTED, DELETED]],
    },
  },
  suspensionReason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  suspensionUntil: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  blacklistReason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  blacklistedBy: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  blacklistedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  approvedBy: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  approvedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  rejectedBy: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  rejectedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  rejectionReason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  passwordResetToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  passwordResetExpiry: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  loginAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lockedUntil: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  deletedBy: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  deleteReason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = User;

// Define associations
process.nextTick(() => {
  const Vendor = require('./Vendor.model');
  const DeptHead = require('./DeptHead.model');
  const AdminProfile = require('./AdminProfile.model');
  const Department = require('./Department.model');

  User.belongsTo(Department, { foreignKey: 'departmentId', as: 'dept' });
  User.belongsTo(Vendor, { foreignKey: 'vendorProfileId', as: 'vendorProfile' });
  User.belongsTo(DeptHead, { foreignKey: 'deptHeadProfileId', as: 'deptHeadProfile' });
  User.belongsTo(AdminProfile, { foreignKey: 'adminProfileId', as: 'adminProfile' });

  User.belongsTo(User, { foreignKey: 'blacklistedBy', as: 'blacklistedByUser' });
  User.belongsTo(User, { foreignKey: 'approvedBy', as: 'approvedByUser' });
  User.belongsTo(User, { foreignKey: 'rejectedBy', as: 'rejectedByUser' });
  User.belongsTo(User, { foreignKey: 'deletedBy', as: 'deletedByUser' });
});
