/**
 * @fileoverview Sequelize model for vendor company profiles and performance data.
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const COMPANY_TYPES = [
  'proprietorship',
  'partnership',
  'private_limited',
  'public_limited',
  'llp',
  'other',
];

const VENDOR_TIERS = ['silver', 'gold', 'platinum'];

const Vendor = sequelize.define('Vendor', {
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
  companyName: {
    type: DataTypes.STRING,
    allowNull: true,
    set(val) {
      if (val) {
        this.setDataValue('companyName', val.trim());
      }
    },
  },
  gstNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    set(val) {
      if (val) {
        this.setDataValue('gstNumber', val.trim());
      }
    },
  },
  panNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    set(val) {
      if (val) {
        this.setDataValue('panNumber', val.trim());
      }
    },
  },
  yearEstablished: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  companyType: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isIn: [COMPANY_TYPES],
    },
  },
  industryType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  departments: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  tier: {
    type: DataTypes.STRING,
    defaultValue: 'silver',
    validate: {
      isIn: [VENDOR_TIERS],
    },
  },
  performanceScore: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {
      quality: 0,
      delivery: 0,
      price: 0,
      compliance: 0,
      overall: 0,
    },
  },
  address: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  contacts: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  documents: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  annualTurnover: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  operationalLocations: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  isPreferred: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isStrategicPartner: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

module.exports = Vendor;

// Define associations
process.nextTick(() => {
  const User = require('./User.model');
  Vendor.belongsTo(User, { foreignKey: 'userId', as: 'user' });
});
