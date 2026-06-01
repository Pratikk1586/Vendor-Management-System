/**
 * @fileoverview Sequelize model for vendor bids submitted against tenders.
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const {
  SUBMITTED,
  UNDER_EVALUATION,
  SHORTLISTED,
  NOT_SELECTED,
  AWARDED,
  REJECTED,
} = require('../constants/statusTypes');

const BID_STATUSES = [
  SUBMITTED,
  UNDER_EVALUATION,
  SHORTLISTED,
  NOT_SELECTED,
  AWARDED,
  REJECTED,
];

const Bid = sequelize.define('Bid', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  bidId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    set(val) {
      if (val) {
        this.setDataValue('bidId', val.trim());
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
  quotedAmount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  deliveryDays: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bidValidityDays: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  technicalProposalUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  commercialProposalUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  supportingDocs: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  submittedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: SUBMITTED,
    validate: {
      isIn: [BID_STATUSES],
    },
  },
  technicalScores: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  totalTechnicalScore: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  commercialScore: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  weightedTotalScore: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  rank: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  evaluatorComments: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isFlagged: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  flagReason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['tenderId', 'vendorId'],
    },
  ],
});

module.exports = Bid;

// Define associations
process.nextTick(() => {
  const Tender = require('./Tender.model');
  const Vendor = require('./Vendor.model');

  Bid.belongsTo(Tender, { foreignKey: 'tenderId', as: 'tender' });
  Bid.belongsTo(Vendor, { foreignKey: 'vendorId', as: 'vendor' });
});
