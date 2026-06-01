/**
 * @fileoverview Sequelize model for globally blacklisted email addresses.
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Blacklist = sequelize.define('Blacklist', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
  reason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  blacklistedBy: {
    type: DataTypes.UUID,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Blacklist;

// Define associations
process.nextTick(() => {
  const User = require('./User.model');
  Blacklist.belongsTo(User, { foreignKey: 'blacklistedBy', as: 'blacklister' });
});
