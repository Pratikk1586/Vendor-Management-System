/**
 * @fileoverview Sequelize model for awarded contracts between departments and vendors.
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CONTRACT_STATUSES = [
  'pending_admin',
  'active',
  'completed',
  'terminated',
];

const Contract = sequelize.define('Contract', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  contractId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    set(val) {
      if (val) {
        this.setDataValue('contractId', val.trim());
      }
    },
  },
  tenderId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  vendorId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  departmentId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  contractValue: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending_admin',
    validate: {
      isIn: [CONTRACT_STATUSES],
    },
  },
  milestones: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  postContractRating: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  awardedBy: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  confirmedBy: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  terminationReason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Contract;

// Define associations
process.nextTick(() => {
  const Tender = require('./Tender.model');
  const Vendor = require('./Vendor.model');
  const Department = require('./Department.model');
  const User = require('./User.model');

  Contract.belongsTo(Tender, { foreignKey: 'tenderId', as: 'tender' });
  Contract.belongsTo(Vendor, { foreignKey: 'vendorId', as: 'vendor' });
  Contract.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });
  Contract.belongsTo(User, { foreignKey: 'awardedBy', as: 'awarder' });
  Contract.belongsTo(User, { foreignKey: 'confirmedBy', as: 'confirmer' });
});
