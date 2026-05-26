/**
 * @fileoverview Central API router mounting all sub-routers.
 */

const express = require('express');
const authRoutes = require('./auth.routes');
const vendorRoutes = require('./vendor.routes');
const deptRoutes = require('./dept.routes');
const adminRoutes = require('./admin.routes');
const auditLogRoutes = require('./auditLog.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/vendor', vendorRoutes);
router.use('/dept', deptRoutes);
router.use('/admin', adminRoutes);
router.use('/audit-log', auditLogRoutes);

module.exports = router;
