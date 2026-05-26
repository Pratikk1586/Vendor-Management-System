/**
 * @fileoverview Department head API routes.
 */

const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT');
const authorizeRole = require('../middleware/authorizeRole');
const checkAccountStatus = require('../middleware/checkAccountStatus');
const checkDeptScope = require('../middleware/checkDeptScope');
const validateRequest = require('../middleware/validateRequest');
const { DEPT_HEAD } = require('../constants/roles');
const deptVendorController = require('../controllers/deptVendor.controller');
const deptTenderController = require('../controllers/deptTender.controller');
const deptBidController = require('../controllers/deptBid.controller');
const deptReportController = require('../controllers/deptReport.controller');
const { createTenderSchema, updateTenderSchema } = require('../validators/tender.validator');
const { scoreBidSchema } = require('../validators/bid.validator');

const router = express.Router();

router.use(
  authenticateJWT,
  authorizeRole([DEPT_HEAD]),
  checkAccountStatus,
  checkDeptScope,
);

router.get('/vendors', deptVendorController.getVendors);
router.get('/vendors/:id', deptVendorController.getVendorById);
router.patch('/vendors/:id', deptVendorController.updateVendorStatus);
router.post('/vendors/:id/score', deptVendorController.updateVendorScore);
router.post('/vendors/:id/request-documents', deptVendorController.requestMoreDocuments);

router.get('/tenders', deptTenderController.getTenders);
router.post('/tenders', validateRequest(createTenderSchema), deptTenderController.createTender);
router.put('/tenders/:id', validateRequest(updateTenderSchema), deptTenderController.updateTender);
router.patch('/tenders/:id', validateRequest(updateTenderSchema), deptTenderController.updateTender);
router.get('/tenders/:id', deptTenderController.getTenderById);
router.post('/tenders/:id/publish', deptTenderController.publishTender);
router.post('/tenders/:id/cancel', deptTenderController.cancelTender);

router.get('/tenders/:id/bids', deptBidController.getBidsForTender);
router.post('/tenders/:id/open', deptBidController.openBidEvaluation);
router.post('/tenders/:id/bids/:bidId/score', validateRequest(scoreBidSchema), deptBidController.scoreBid);
router.post('/tenders/:id/bids/:bidId/shortlist', deptBidController.shortlistBid);
router.post('/tenders/:id/bids/:bidId/reject', deptBidController.rejectBid);
router.post('/tenders/:id/award', deptBidController.awardContract);

router.get('/contracts', deptReportController.getDeptContracts);
router.get('/reports', deptReportController.getDeptReports);

module.exports = router;
