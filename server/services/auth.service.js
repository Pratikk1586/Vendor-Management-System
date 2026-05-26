/**
 * @fileoverview Authentication, registration, and password reset business logic.
 */

const crypto = require('crypto');
const User = require('../models/User.model');
const Vendor = require('../models/Vendor.model');
const DeptHead = require('../models/DeptHead.model');
const AdminProfile = require('../models/AdminProfile.model');
const Department = require('../models/Department.model');
const Blacklist = require('../models/Blacklist.model');
const { VENDOR, DEPT_HEAD, HR_ADMIN } = require('../constants/roles');
const { PENDING, ACTIVE } = require('../constants/statusTypes');
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require('../config/jwt');
const {
  validateCode,
  revokeCode,
} = require('./authCode.service');
const { sendVendorRegistrationEmail, sendPasswordResetEmail } = require('./email.service');

/**
 * Builds JWT token pair for a user.
 * @param {object} user User document.
 * @returns {{ accessToken: string, refreshToken: string }}
 */
function buildTokens(user) {
  const payload = {
    id: user._id.toString(),
    role: user.role,
    departmentId: user.department?.toString(),
  };

  return {
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken({ id: user._id.toString() }),
  };
}

/**
 * Registers a new vendor account.
 * @param {object} data Validated registration data.
 * @returns {Promise<object>}
 */
async function registerVendor(data) {
  const blacklisted = await Blacklist.findOne({ email: data.email.toLowerCase() });
  if (blacklisted) {
    throw Object.assign(new Error('Email is blacklisted'), { statusCode: 403 });
  }

  const passwordHash = await hashPassword(data.password);

  const user = await User.create({
    name: data.contactName,
    email: data.email,
    passwordHash,
    role: VENDOR,
    status: PENDING,
  });

  const deptEntries = data.departments.map((deptId) => ({
    deptId,
    status: PENDING,
  }));

  const vendor = await Vendor.create({
    userId: user._id,
    companyName: data.companyName,
    gstNumber: data.gstNumber,
    panNumber: data.panNumber,
    yearEstablished: data.yearEstablished,
    companyType: data.companyType,
    departments: deptEntries,
    address: {
      street: data.street,
      city: data.city,
      state: data.state,
      pin: data.pin,
    },
    contacts: [{
      name: data.contactName,
      email: data.email,
      mobile: data.mobile,
      isPrimary: true,
    }],
  });

  user.vendorProfile = vendor._id;
  await user.save();

  try {
    await sendVendorRegistrationEmail(vendor);
  } catch {
    // Email failure should not block registration
  }

  return { user, vendor };
}

/**
 * Registers a new department head account.
 * @param {object} data Validated registration data.
 * @returns {Promise<object>}
 */
async function registerDeptHead(data) {
  const passwordHash = await hashPassword(data.password);

  const user = await User.create({
    name: data.name,
    email: data.email,
    passwordHash,
    role: DEPT_HEAD,
    department: data.department,
    status: PENDING,
  });

  const deptHead = await DeptHead.create({
    userId: user._id,
    employeeId: data.employeeId,
    department: data.department,
    designation: data.designation,
    yearsAtCompany: data.yearsAtCompany,
  });

  user.deptHeadProfile = deptHead._id;
  await user.save();

  return { user, deptHead };
}

/**
 * Registers a new admin account using an auth code.
 * @param {object} data Validated registration data.
 * @returns {Promise<object>}
 */
async function registerAdmin(data) {
  const authRecord = await validateCode(data.authCode);
  if (!authRecord) {
    throw Object.assign(new Error('Invalid or expired authorization code'), { statusCode: 400 });
  }

  const passwordHash = await hashPassword(data.password);

  const user = await User.create({
    name: data.name,
    email: data.email,
    passwordHash,
    role: HR_ADMIN,
    status: ACTIVE,
  });

  const adminProfile = await AdminProfile.create({
    userId: user._id,
    employeeId: data.employeeId,
    designation: data.designation,
    authCodeUsed: data.authCode,
  });

  user.adminProfile = adminProfile._id;
  await user.save();

  await revokeCode(data.authCode, user._id);

  const tokens = buildTokens(user);
  return { user, adminProfile, ...tokens };
}

/**
 * Authenticates a user and returns tokens.
 * @param {string} email User email.
 * @param {string} password Plain password.
 * @param {string} role Expected role.
 * @returns {Promise<object>}
 */
async function login(email, password, role) {
  const user = await User.findOne({ email: email.toLowerCase(), role });

  if (!user) {
    throw Object.assign(new Error('Invalid credentials'), { statusCode: 401 });
  }

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    throw Object.assign(new Error('Account is temporarily locked'), { statusCode: 403 });
  }

  const valid = await comparePassword(password, user.passwordHash);

  if (!valid) {
    user.loginAttempts = (user.loginAttempts || 0) + 1;
    if (user.loginAttempts >= 5) {
      user.lockedUntil = new Date(Date.now() + 30 * 60 * 1000);
    }
    await user.save();
    throw Object.assign(new Error('Invalid credentials'), { statusCode: 401 });
  }

  if (user.status !== ACTIVE) {
    throw Object.assign(
      new Error(`Account is ${user.status}. Please contact administrator.`),
      { statusCode: 403 },
    );
  }

  user.loginAttempts = 0;
  user.lockedUntil = undefined;
  user.lastLogin = new Date();
  await user.save();

  return { user, ...buildTokens(user) };
}

/**
 * Issues a new access token from a refresh token.
 * @param {string} refreshToken Refresh JWT.
 * @returns {Promise<{ accessToken: string }>}
 */
async function refreshToken(refreshToken) {
  const decoded = verifyRefreshToken(refreshToken);
  const user = await User.findById(decoded.id);

  if (!user || user.status !== ACTIVE) {
    throw Object.assign(new Error('Invalid refresh token'), { statusCode: 401 });
  }

  return { accessToken: signAccessToken({
    id: user._id.toString(),
    role: user.role,
    departmentId: user.department?.toString(),
  }) };
}

/**
 * Initiates password reset flow.
 * @param {string} email User email.
 * @returns {Promise<void>}
 */
async function forgotPassword(email) {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return;
  }

  const token = crypto.randomBytes(32).toString('hex');
  user.passwordResetToken = token;
  user.passwordResetExpiry = new Date(Date.now() + 60 * 60 * 1000);
  await user.save();

  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
  await sendPasswordResetEmail(user, resetUrl);
}

/**
 * Resets password using a valid reset token.
 * @param {string} token Reset token.
 * @param {string} password New password.
 * @returns {Promise<void>}
 */
async function resetPassword(token, password) {
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpiry: { $gt: new Date() },
  });

  if (!user) {
    throw Object.assign(new Error('Invalid or expired reset token'), { statusCode: 400 });
  }

  user.passwordHash = await hashPassword(password);
  user.passwordResetToken = undefined;
  user.passwordResetExpiry = undefined;
  await user.save();
}

/**
 * Validates an admin authorization code.
 * @param {string} authCode Plain auth code.
 * @returns {Promise<boolean>}
 */
async function validateAuthCode(authCode) {
  const record = await validateCode(authCode);
  return Boolean(record);
}

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
