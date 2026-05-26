/**
 * @fileoverview HR admin API routes.
 */

const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT');
const authorizeRole = require('../middleware/authorizeRole');
const checkAccountStatus = require('../middleware/checkAccountStatus');
const validateRequest = require('../middleware/validateRequest');
const { HR_ADMIN } = require('../constants/roles');
const adminMemberController = require('../controllers/adminMember.controller');
const adminApprovalController = require('../controllers/adminApproval.controller');
const adminDeptController = require('../controllers/adminDept.controller');
const adminTenderController = require('../controllers/adminTender.controller');
const adminBidController = require('../controllers/adminBid.controller');
const adminContractController = require('../controllers/adminContract.controller');
const adminReportController = require('../controllers/adminReport.controller');
const adminSettingsController = require('../controllers/adminSettings.controller');
const adminAuthCodeController = require('../controllers/adminAuthCode.controller');
const {
  updateMemberSchema,
  changeRoleSchema,
  changeStatusSchema,
  bulkActionSchema,
} = require('../validators/member.validator');

const router = express.Router();

router.use(authenticateJWT, authorizeRole([HR_ADMIN]), checkAccountStatus);

router.get('/members', adminMemberController.getAllMembers);
router.get('/members/:id', adminMemberController.getMemberById);
router.put('/members/:id', validateRequest(updateMemberSchema), adminMemberController.updateMember);
router.patch('/members/:id/role', validateRequest(changeRoleSchema), adminMemberController.changeMemberRole);
router.patch('/members/:id/status', validateRequest(changeStatusSchema), adminMemberController.changeMemberStatus);
router.delete('/members/:id', adminMemberController.deleteMember);
router.post('/members/:id/reset-password', adminMemberController.resetMemberPassword);
router.get('/members/:id/audit', adminMemberController.getMemberAuditTrail);
router.post('/members/bulk-action', validateRequest(bulkActionSchema), adminMemberController.bulkAction);

router.get('/approvals', adminApprovalController.getPendingApprovals);
router.post('/approvals/:id/approve', adminApprovalController.approveRegistration);
router.post('/approvals/:id/reject', adminApprovalController.rejectRegistration);

router.get('/departments', adminDeptController.getDepartments);
router.post('/departments', adminDeptController.createDepartment);
router.get('/departments/:id', adminDeptController.getDeptById);
router.put('/departments/:id', adminDeptController.updateDepartment);
router.delete('/departments/:id', adminDeptController.deactivateDepartment);
router.post('/departments/:id/assign-head', adminDeptController.assignHead);

router.get('/dept-heads', adminMemberController.getAllMembers);
router.get('/tenders', adminTenderController.getAllTenders);
router.post('/tenders/:id/cancel', adminTenderController.cancelTender);
router.patch('/tenders/:id/deadline', adminTenderController.extendDeadline);

router.get('/bids', adminBidController.getAllBids);
router.post('/bids/:id/flag', adminBidController.flagBid);
router.patch('/bids/:id/score', adminBidController.overrideScore);

router.get('/contracts', adminContractController.getAllContracts);
router.post('/contracts/:id/confirm', adminContractController.confirmAward);
router.post('/contracts/:id/reject', adminContractController.rejectAward);
router.patch('/contracts/:id', adminContractController.amendContract);

router.get('/reports/members', adminReportController.getMemberReport);
router.get('/reports/vendors', adminReportController.getVendorReport);
router.get('/reports/tenders', adminReportController.getTenderReport);
router.get('/reports/financial', adminReportController.getFinancialReport);
router.get('/reports/audit', adminReportController.getAuditSummary);

router.get('/settings', adminSettingsController.getSettings);
router.put('/settings', adminSettingsController.updateSettings);

router.get('/auth-codes', adminAuthCodeController.listCodes);
router.post('/auth-codes', adminAuthCodeController.generateCode);
router.delete('/auth-codes/:code', adminAuthCodeController.revokeCode);

module.exports = router;
