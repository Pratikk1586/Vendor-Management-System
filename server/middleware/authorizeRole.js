/**
 * @fileoverview Role-based authorization middleware factory.
 */

const { error } = require('../utils/responseEnvelope');
const { FORBIDDEN } = require('../constants/httpCodes');

/**
 * Returns middleware that allows only specified roles.
 * @param {string[]} allowedRoles Roles permitted to access the route.
 * @returns {function(import('express').Request, import('express').Response, import('express').NextFunction): void}
 */
function authorizeRole(allowedRoles) {
  return (req, res, next) => {
    if (!req.user?.role) {
      return error(res, 'Access denied', FORBIDDEN);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return error(res, 'You do not have permission to access this resource', FORBIDDEN);
    }

    return next();
  };
}

module.exports = authorizeRole;
