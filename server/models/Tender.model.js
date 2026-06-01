/**
 * @fileoverview Sequelize model for procurement tenders and bidding lifecycle.
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const {
  DRAFT,
  PUBLISHED,
  UNDER_EVALUATION,
  AWARDED,
  CANCELLED,
} = require('../constants/statusTypes');

const TENDER_TYPES = ['rate_contract', 'one_time', 'amc', 'works_contract'];
const TENDER_STATUSES = [
  DRAFT,
  PUBLISHED,
  'bid_open',
  UNDER_EVALUATION,
  AWARDED,
  CANCELLED,
];

const Tender = sequelize.define('Tender', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  tenderId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    set(val) {
      if (val) {
        this.setDataValue('tenderId', val.trim());
      }
    },
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
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  scopeOfWork: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isIn: [TENDER_TYPES],
    },
  },
  departmentId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  estimatedBudget: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  isBudgetHidden: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  eligibility: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {},
  },
  submissionDeadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  bidOpeningDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  evaluationCriteria: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  commercialWeightage: {
    type: DataTypes.INTEGER,
    defaultValue: 40,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: DRAFT,
    validate: {
      isIn: [TENDER_STATUSES],
    },
  },
  termsDocUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  awardedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  awardedTo: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  adminConfirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  adminConfirmedBy: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  cancelReason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Tender;

// Define associations
process.nextTick(() => {
  const Department = require('./Department.model');
  const User = require('./User.model');
  const Vendor = require('./Vendor.model');

  Tender.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });
  Tender.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });
  Tender.belongsTo(Vendor, { foreignKey: 'awardedTo', as: 'awardedVendor' });
  Tender.belongsTo(User, { foreignKey: 'adminConfirmedBy', as: 'adminConfirmer' });
});
