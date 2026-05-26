/**
 * @fileoverview Public authentication and registration routes.
 */

const express = require('express');
const authController = require('../controllers/auth.controller');
const validateRequest = require('../middleware/validateRequest');
const { authLimiter } = require('../middleware/rateLimiter');
const {
  vendorRegisterSchema,
  deptHeadRegisterSchema,
  adminRegisterSchema,
  loginSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  validateAuthCodeSchema,
} = require('../validators/auth.validator');

const router = express.Router();

router.use(authLimiter);

router.post(
  '/register/vendor',
  validateRequest(vendorRegisterSchema),
  authController.registerVendor,
);

router.post(
  '/register/dept-head',
  validateRequest(deptHeadRegisterSchema),
  authController.registerDeptHead,
);

router.post(
  '/register/admin',
  validateRequest(adminRegisterSchema),
  authController.registerAdmin,
);

router.post('/login', validateRequest(loginSchema), authController.login);
router.post('/refresh', validateRequest(refreshTokenSchema), authController.refreshToken);
router.post('/forgot-password', validateRequest(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', validateRequest(resetPasswordSchema), authController.resetPassword);
router.post('/validate-auth-code', validateRequest(validateAuthCodeSchema), authController.validateAuthCode);

module.exports = router;
