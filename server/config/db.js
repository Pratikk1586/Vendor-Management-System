/**
 * @fileoverview Mongoose database connection with retry logic for the Tata Steel Colors API.
 */

const mongoose = require('mongoose');
const { logger } = require('./logger');

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;

/**
 * Attempts to connect to MongoDB with exponential backoff retries.
 * @param {number} [attempt=1] Current attempt number.
 * @returns {Promise<void>}
 */
async function connectWithRetry(attempt = 1) {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  try {
    await mongoose.connect(mongoUri);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error(`MongoDB connection failed (attempt ${attempt}/${MAX_RETRIES}): ${error.message}`);

    if (attempt >= MAX_RETRIES) {
      logger.error('Max MongoDB connection retries reached. Exiting.');
      throw error;
    }

    logger.warn(`Retrying MongoDB connection in ${RETRY_DELAY_MS / 1000}s...`);
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    return connectWithRetry(attempt + 1);
  }
}

/**
 * Establishes the Mongoose connection and registers connection event listeners.
 * @returns {Promise<void>}
 */
async function connectDB() {
  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected');
  });

  mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB connection error: ${err.message}`);
  });

  await connectWithRetry();
}

module.exports = { connectDB };
