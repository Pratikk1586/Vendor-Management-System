/**
 * @fileoverview Server entry point — database connection, seeding, scheduler, and HTTP listener.
 */

require('dotenv').config();

const app = require('./app');
const { connectDB } = require('./config/db');
const { logger } = require('./config/logger');
const { startScheduler } = require('./services/scheduler.service');
const { seedSuperAdmin } = require('./utils/seedSuperAdmin');

const PORT = process.env.PORT || 5000;

/**
 * Starts the HTTP server after database connection and initialization.
 * @returns {Promise<void>}
 */
async function startServer() {
  await connectDB();
  await seedSuperAdmin();
  startScheduler();

  app.listen(PORT, () => {
    logger.info(`Tata Steel Colors API running on port ${PORT}`);
    logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

startServer().catch((err) => {
  logger.error(`Failed to start server: ${err.message}`);
  process.exit(1);
});
