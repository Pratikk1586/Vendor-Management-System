/**
 * @fileoverview Mongoose database connection with retry logic for the Tata Steel Colors API.
 */

const { Sequelize } = require('sequelize');
const { logger } = require('./logger'); // Update path if needed

const sequelize = new Sequelize(
  process.env.DB_NAME || 'vendor_management_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'Chotu@1586',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',

    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },

    logging: (msg) => {
      logger.info(msg);
    },
  }
);

// Test database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('MySQL database connected successfully');

    // Register all Sequelize models to ensure they are synchronized
    require('../models/Department.model');
    require('../models/User.model');
    require('../models/Vendor.model');
    require('../models/DeptHead.model');
    require('../models/AdminProfile.model');
    require('../models/Tender.model');
    require('../models/Bid.model');
    require('../models/Contract.model');
    require('../models/AuditLog.model');
    require('../models/AuthCode.model');
    require('../models/Blacklist.model');
    require('../models/Notification.model');

    // Sync database tables with defined models
    await sequelize.sync({ alter: true });
    logger.info('MySQL database models synced successfully');
  } catch (error) {
    logger.error('Unable to connect to MySQL or sync models:', error);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectDB,
};

