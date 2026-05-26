/**
 * @fileoverview HTTP handlers for authentication and registration endpoints.
 */

const authService = require('../services/auth.service');
const { asyncHandler } = require('../utils/asyncHandler');
const { success, error } = require('../utils/responseEnvelope');
const { CREATED, OK } = require('../constants/httpCodes');

/**
 * Registers a vendor account.
 */
const registerVendor = asyncHandler(async (req, res) => {
  const result = await authService.registerVendor(req.body);
  return success(
    res,
    { userId: result.user._id, vendorId: result.vendor._id },
    'Vendor registration submitted for approval',
    CREATED,
  );
});

/**
 * Registers a department head account.
 */
const registerDeptHead = asyncHandler(async (req, res) => {
  const result = await authService.registerDeptHead(req.body);
  return success(
    res,
    { userId: result.user._id },
    'Department head registration submitted for approval',
    CREATED,
  );
});

/**
 * Registers an admin account.
 */
const registerAdmin = asyncHandler(async (req, res) => {
  const result = await authService.registerAdmin(req.body);
  return success(res, {
    user: { id: result.user._id, name: result.user.name, email: result.user.email, role: result.user.role },
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
  }, 'Admin registered successfully', CREATED);
});

/**
 * Authenticates a user and returns JWT tokens.
 */
const login = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  const result = await authService.login(email, password, role);
  return success(res, {
    user: {
      id: result.user._id,
      name: result.user.name,
      email: result.user.email,
      role: result.user.role,
      departmentId: result.user.department,
    },
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
  }, 'Login successful');
});

/**
 * Refreshes an access token.
 */
const refreshToken = asyncHandler(async (req, res) => {
  const result = await authService.refreshToken(req.body.refreshToken);
  return success(res, result, 'Token refreshed');
});

/**
 * Sends password reset email.
 */
const forgotPassword = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.body.email);
  return success(res, null, 'If the email exists, a reset link has been sent');
});

/**
 * Resets password with token.
 */
const resetPassword = asyncHandler(async (req, res) => {
  await authService.resetPassword(req.body.token, req.body.password);
  return success(res, null, 'Password reset successfully');
});

/**
 * Validates an admin authorization code.
 */
const validateAuthCode = asyncHandler(async (req, res) => {
  const valid = await authService.validateAuthCode(req.body.authCode);
  return success(res, { valid }, valid ? 'Auth code is valid' : 'Auth code is invalid');
});

module.exports = {
  registerVendor,
  registerDeptHead,
  registerAdmin,
  login,
  refreshToken,
  forgotPassword,
  resetPassword,
  validateAuthCode,
};
