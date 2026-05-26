/**
 * @fileoverview Admin authorization code management endpoints.
 */

const AuthCode = require('../models/AuthCode.model');
const { asyncHandler } = require('../utils/asyncHandler');
const { success, error } = require('../utils/responseEnvelope');
const { NOT_FOUND } = require('../constants/httpCodes');
const { paginate } = require('../utils/paginateQuery');
const {
  generateCode,
  revokeCode,
} = require('../services/authCode.service');

/**
 * Lists authorization codes.
 */
const listCodes = asyncHandler(async (req, res) => {
  const query = AuthCode.find()
    .select('-hashedCode')
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });

  const result = await paginate(query, req.query.page, req.query.limit);
  return success(res, result);
});

/**
 * Generates a new authorization code.
 */
const generateAuthCode = asyncHandler(async (req, res) => {
  const result = await generateCode(req.user.id);
  return success(res, result, 'Auth code generated', 201);
});

/**
 * Revokes an authorization code.
 */
const revokeAuthCode = asyncHandler(async (req, res) => {
  const revoked = await revokeCode(req.params.code, req.user.id);
  if (!revoked) {
    return error(res, 'Auth code not found', NOT_FOUND);
  }
  return success(res, null, 'Auth code revoked');
});

module.exports = { listCodes, generateCode: generateAuthCode, revokeCode: revokeAuthCode };
