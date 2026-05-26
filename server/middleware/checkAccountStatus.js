/**
 * @fileoverview Blocks requests from suspended, blacklisted, or deleted accounts.
 */

const User = require('../models/User.model');
const { error } = require('../utils/responseEnvelope');
const { FORBIDDEN, NOT_FOUND } = require('../constants/httpCodes');
const {
  SUSPENDED,
  BLACKLISTED,
  DELETED,
} = require('../constants/statusTypes');

/**
 * Verifies the authenticated user's account status in the database.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function checkAccountStatus(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select('status suspensionReason');

    if (!user) {
      return error(res, 'User not found', NOT_FOUND);
    }

    if (user.status === SUSPENDED) {
      return error(
        res,
        user.suspensionReason || 'Account is suspended',
        FORBIDDEN,
      );
    }

    if (user.status === BLACKLISTED) {
      return error(res, 'Account is blacklisted', FORBIDDEN);
    }

    if (user.status === DELETED) {
      return error(res, 'Account has been deleted', FORBIDDEN);
    }

    req.dbUser = user;
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = checkAccountStatus;
