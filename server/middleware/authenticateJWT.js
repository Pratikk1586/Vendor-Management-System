/**
 * @fileoverview JWT Bearer token authentication middleware.
 */

const { verifyAccessToken } = require('../config/jwt');
const { error } = require('../utils/responseEnvelope');
const { UNAUTHORIZED } = require('../constants/httpCodes');

/**
 * Verifies JWT from Authorization header and attaches decoded payload to req.user.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return error(res, 'Authentication token required', UNAUTHORIZED);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token);
    req.user = {
      ...decoded,
      id: decoded.id || decoded.userId || decoded._id,
      departmentId: decoded.departmentId || decoded.department,
    };
    return next();
  } catch {
    return error(res, 'Invalid or expired token', UNAUTHORIZED);
  }
}

module.exports = authenticateJWT;
