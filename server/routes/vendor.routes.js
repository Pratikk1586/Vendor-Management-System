/**
 * @fileoverview Vendor portal API routes.
 */

const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT');
const authorizeRole = require('../middleware/authorizeRole');
const checkAccountStatus = require('../middleware/checkAccountStatus');
const validateRequest = require('../middleware/validateRequest');
const { uploadMiddleware } = require('../config/multer');
const { VENDOR } = require('../constants/roles');
const vendorController = require('../controllers/vendor.controller');
const tenderController = require('../controllers/tender.controller');
const bidController = require('../controllers/bid.controller');
const contractController = require('../controllers/contract.controller');
const { submitBidSchema } = require('../validators/bid.validator');

const router = express.Router();

router.use(authenticateJWT, authorizeRole([VENDOR]), checkAccountStatus);

router.get('/profile', vendorController.getProfile);
router.put('/profile', vendorController.updateProfile);
router.post('/documents', uploadMiddleware.single('file'), vendorController.uploadDocuments);

router.get('/tenders', tenderController.getOpenTenders);
router.get('/tenders/:id', tenderController.getTenderById);
router.post('/tenders/:id/bid', validateRequest(submitBidSchema), bidController.submitBid);

router.get('/bids', bidController.getMyBids);
router.get('/bids/:id', bidController.getBidById);

router.get('/contracts', contractController.getMyContracts);
router.get('/contracts/:id', contractController.getContractById);

router.get('/notifications', vendorController.getNotifications);
router.patch('/notifications/:id/read', vendorController.markNotificationRead);

module.exports = router;
