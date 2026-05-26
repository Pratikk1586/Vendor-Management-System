/**
 * @fileoverview Middleware that auto-logs mutating API requests after the response completes.
 */

const { createAuditLog } = require('../services/auditLog.service');

const MUTATING_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];

/**
 * Logs POST, PUT, PATCH, DELETE requests via auditLog.service after response finishes.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function auditLogger(req, res, next) {
  if (!MUTATING_METHODS.includes(req.method)) {
    return next();
  }

  res.on('finish', async () => {
    if (res.statusCode >= 400) {
      return;
    }

    try {
      await createAuditLog({
        action: `${req.method} ${req.originalUrl}`,
        performedBy: req.user?.id,
        role: req.user?.role,
        targetEntity: req.baseUrl || req.path,
        targetId: req.params?.id,
        newValue: {
          method: req.method,
          path: req.originalUrl,
          statusCode: res.statusCode,
        },
        ipAddress: req.ip || req.socket?.remoteAddress,
      });
    } catch {
      // Audit failures must not break the response cycle
    }
  });

  return next();
}

module.exports = auditLogger;
