/**
 * @fileoverview Admin registration authorization code generation and validation.
 */

const crypto = require('crypto');
const { Op } = require('sequelize');
const AuthCode = require('../models/AuthCode.model');
const { hashPassword, comparePassword } = require('../utils/hashPassword');

const CODE_EXPIRY_DAYS = 30;

/**
 * Generates a random authorization code string.
 * @returns {string}
 */
function generatePlainCode() {
  const segment = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `TSC-ADMIN-${segment}`;
}

/**
 * Creates a new admin auth code and returns the plain code once.
 * @param {string} createdBy User ID of the creating admin.
 * @returns {Promise<{ code: string, expiresAt: Date }>}
 */
async function generateCode(createdBy) {
  const plainCode = generatePlainCode();
  const hashedCode = await hashPassword(plainCode);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + CODE_EXPIRY_DAYS);

  await AuthCode.create({
    code: plainCode,
    hashedCode,
    createdBy,
    expiresAt,
  });

  return { code: plainCode, expiresAt };
}

/**
 * Validates a plain auth code against stored hashes.
 * @param {string} plainCode Code entered by the user.
 * @returns {Promise<object|null>}
 */
async function validateCode(plainCode) {
  const candidates = await AuthCode.findAll({
    where: {
      isUsed: false,
      expiresAt: { [Op.gt]: new Date() },
    }
  });

  for (const record of candidates) {
    const match = await comparePassword(plainCode, record.hashedCode);
    if (match) {
      return record;
    }
  }

  return null;
}

/**
 * Revokes an auth code by marking it used or deleting it.
 * @param {string} code Plain or stored code identifier.
 * @param {string} [usedBy] User who consumed the code.
 * @returns {Promise<boolean>}
 */
async function revokeCode(code, usedBy) {
  const record = await AuthCode.findOne({
    where: {
      [Op.or]: [{ code }, { hashedCode: code }],
    }
  });

  if (!record) {
    return false;
  }

  record.isUsed = true;
  if (usedBy) {
    record.usedBy = usedBy;
  }
  await record.save();
  return true;
}

module.exports = { generateCode, validateCode, revokeCode };
