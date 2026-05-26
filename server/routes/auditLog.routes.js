/**
 * @fileoverview Audit log API routes (admin only).
 */

const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT');
const authorizeRole = require('../middleware/authorizeRole');
const { HR_ADMIN } = require('../constants/roles');
const auditLogController = require('../controllers/auditLog.controller');

const router = express.Router();

router.use(authenticateJWT, authorizeRole([HR_ADMIN]));
router.get('/', auditLogController.getAuditLog);

module.exports = router;
