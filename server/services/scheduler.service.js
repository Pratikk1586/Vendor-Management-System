/**
 * @fileoverview Cron-based scheduled jobs for document, tender, and contract maintenance.
 */

const cron = require('node-cron');
const Tender = require('../models/Tender.model');
const { UNDER_EVALUATION } = require('../constants/statusTypes');
const Contract = require('../models/Contract.model');
const { logger } = require('../config/logger');
const { getExpiringDocuments } = require('./document.service');
const { sendDocumentExpiryEmail } = require('./email.service');
const { createNotification } = require('./notification.service');
const Vendor = require('../models/Vendor.model');

/**
 * Checks vendor documents expiring soon and sends alerts.
 * @returns {Promise<void>}
 */
async function runDocumentExpiryCheck() {
  logger.info('Scheduler: checking document expiries');
  const expiring = await getExpiringDocuments(30);

  for (const item of expiring) {
    try {
      const vendor = await Vendor.findById(item.vendorId);
      if (vendor) {
        await sendDocumentExpiryEmail(vendor, item.document.type);
        await createNotification({
          userId: item.userId,
          title: 'Document Expiring Soon',
          message: `Your ${item.document.type} document expires on ${new Date(item.document.expiryDate).toLocaleDateString()}.`,
          type: 'document_expiry',
          link: '/vendor/profile',
        });
      }
    } catch (err) {
      logger.error(`Document expiry alert failed: ${err.message}`);
    }
  }
}

/**
 * Updates tenders whose submission deadline has passed.
 * @returns {Promise<void>}
 */
async function runTenderDeadlineCheck() {
  logger.info('Scheduler: checking tender deadlines');
  const now = new Date();

  const result = await Tender.updateMany(
    {
      status: { $in: ['published', 'bid_open'] },
      submissionDeadline: { $lt: now },
    },
    { $set: { status: UNDER_EVALUATION } },
  );

  if (result.modifiedCount > 0) {
    logger.info(`Updated ${result.modifiedCount} tenders to under_evaluation`);
  }
}

/**
 * Checks contracts nearing end date and sends renewal alerts.
 * @returns {Promise<void>}
 */
async function runContractExpiryCheck() {
  logger.info('Scheduler: checking contract expiries');
  const thirtyDaysAhead = new Date();
  thirtyDaysAhead.setDate(thirtyDaysAhead.getDate() + 30);

  const expiringContracts = await Contract.find({
    status: 'active',
    endDate: { $lte: thirtyDaysAhead, $gte: new Date() },
  }).populate('vendorId');

  for (const contract of expiringContracts) {
    try {
      const vendor = contract.vendorId;
      if (vendor?.userId) {
        await createNotification({
          userId: vendor.userId,
          title: 'Contract Expiring Soon',
          message: `Contract ${contract.contractId} ends on ${new Date(contract.endDate).toLocaleDateString()}.`,
          type: 'contract_expiry',
          link: '/vendor/contracts',
        });
      }
    } catch (err) {
      logger.error(`Contract expiry alert failed: ${err.message}`);
    }
  }
}

/**
 * Registers and starts all cron jobs.
 */
function startScheduler() {
  cron.schedule('0 8 * * *', runDocumentExpiryCheck);
  cron.schedule('0 * * * *', runTenderDeadlineCheck);
  cron.schedule('0 9 * * *', runContractExpiryCheck);
  logger.info('Scheduler started: document (8am), tender (hourly), contract (9am)');
}

module.exports = { startScheduler };
