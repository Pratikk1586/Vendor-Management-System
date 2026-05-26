/**
 * @fileoverview Admin department management endpoints.
 */

const Department = require('../models/Department.model');
const User = require('../models/User.model');
const { asyncHandler } = require('../utils/asyncHandler');
const { success, error } = require('../utils/responseEnvelope');
const { NOT_FOUND } = require('../constants/httpCodes');
const { paginate } = require('../utils/paginateQuery');

/**
 * Returns all departments.
 */
const getDepartments = asyncHandler(async (req, res) => {
  const query = Department.find().populate('headUserId', 'name email').sort({ name: 1 });
  const result = await paginate(query, req.query.page, req.query.limit);
  return success(res, result);
});

/**
 * Returns a department by ID.
 */
const getDeptById = asyncHandler(async (req, res) => {
  const dept = await Department.findById(req.params.id).populate('headUserId', 'name email');
  if (!dept) {
    return error(res, 'Department not found', NOT_FOUND);
  }
  return success(res, dept);
});

/**
 * Creates a department.
 */
const createDepartment = asyncHandler(async (req, res) => {
  const dept = await Department.create(req.body);
  return success(res, dept, 'Department created', 201);
});

/**
 * Updates a department.
 */
const updateDepartment = asyncHandler(async (req, res) => {
  const dept = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!dept) {
    return error(res, 'Department not found', NOT_FOUND);
  }
  return success(res, dept, 'Department updated');
});

/**
 * Deactivates a department.
 */
const deactivateDepartment = asyncHandler(async (req, res) => {
  const dept = await Department.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true },
  );
  if (!dept) {
    return error(res, 'Department not found', NOT_FOUND);
  }
  return success(res, dept, 'Department deactivated');
});

/**
 * Assigns a department head to a department.
 */
const assignHead = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const dept = await Department.findByIdAndUpdate(
    req.params.id,
    { headUserId: userId },
    { new: true },
  );

  if (!dept) {
    return error(res, 'Department not found', NOT_FOUND);
  }

  await User.findByIdAndUpdate(userId, { department: dept._id });
  return success(res, dept, 'Department head assigned');
});

module.exports = {
  getDepartments,
  getDeptById,
  createDepartment,
  updateDepartment,
  deactivateDepartment,
  assignHead,
};
