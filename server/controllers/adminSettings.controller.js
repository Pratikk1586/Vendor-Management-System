/**
 * @fileoverview Admin portal settings endpoints.
 */

const { asyncHandler } = require('../utils/asyncHandler');
const { success } = require('../utils/responseEnvelope');

/** @type {object} In-memory settings store until Settings model is added. */
let settings = {
  portalName: process.env.VITE_APP_NAME || 'Tata Steel Colors Vendor Portal',
  maxFileSizeMb: parseInt(process.env.MAX_FILE_SIZE_MB, 10) || 5,
  commercialWeightageDefault: 40,
  bidValidityMinDays: 30,
  sessionTimeoutHours: 8,
  emailNotificationsEnabled: true,
};

/**
 * Returns current portal settings.
 */
const getSettings = asyncHandler(async (req, res) => {
  return success(res, settings);
});

/**
 * Updates portal settings.
 */
const updateSettings = asyncHandler(async (req, res) => {
  settings = { ...settings, ...req.body };
  return success(res, settings, 'Settings updated');
});

module.exports = { getSettings, updateSettings };
