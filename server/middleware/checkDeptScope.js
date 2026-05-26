/**
 * @fileoverview Injects department-scoped filters for department head routes.
 */

const { DEPT_HEAD, HR_ADMIN } = require('../constants/roles');

/**
 * Sets req.deptFilter based on user role for department-scoped queries.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function checkDeptScope(req, res, next) {
  if (req.user?.role === HR_ADMIN) {
    req.deptFilter = {};
    return next();
  }

  if (req.user?.role === DEPT_HEAD) {
    req.deptFilter = { departmentId: req.user.departmentId };
    return next();
  }

  req.deptFilter = {};
  return next();
}

module.exports = checkDeptScope;
