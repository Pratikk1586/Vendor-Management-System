/**
 * @fileoverview Department head vendor management endpoints.
 */

const Vendor = require('../models/Vendor.model');
const User = require('../models/User.model');
const { asyncHandler } = require('../utils/asyncHandler');
const { success, error } = require('../utils/responseEnvelope');
const { NOT_FOUND } = require('../constants/httpCodes');
const { ACTIVE, PENDING } = require('../constants/statusTypes');
const { paginate } = require('../utils/paginateQuery');
const { buildFilter } = require('../utils/buildFilter');
const { evaluateTier } = require('../services/tierEvaluation.service');
const { createNotification } = require('../services/notification.service');

/**
 * Returns vendors scoped to the department head's department.
 */
const getVendors = asyncHandler(async (req, res) => {
  const deptId = req.deptFilter.departmentId;
  const filter = {
    'departments.deptId': deptId,
    ...buildFilter(req.query),
  };

  const query = Vendor.find(filter).populate('userId', 'name email status');
  const result = await paginate(query, req.query.page, req.query.limit);
  return success(res, result);
});

/**
 * Returns a vendor by ID within department scope.
 */
const getVendorById = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findOne({
    _id: req.params.id,
    'departments.deptId': req.deptFilter.departmentId,
  }).populate('userId', 'name email status');

  if (!vendor) {
    return error(res, 'Vendor not found', NOT_FOUND);
  }

  return success(res, vendor);
});

/**
 * Approves, rejects, or suspends a vendor for the department.
 */
const updateVendorStatus = asyncHandler(async (req, res) => {
  const { status, rejectionReason } = req.body;
  const vendor = await Vendor.findOne({
    _id: req.params.id,
    'departments.deptId': req.deptFilter.departmentId,
  });

  if (!vendor) {
    return error(res, 'Vendor not found', NOT_FOUND);
  }

  const deptEntry = vendor.departments.find(
    (d) => d.deptId.toString() === req.deptFilter.departmentId.toString(),
  );

  if (deptEntry) {
    if (status === 'rejected') {
      deptEntry.status = PENDING;
      deptEntry.rejectionReason = rejectionReason;
    } else {
      deptEntry.status = status;
      deptEntry.approvedBy = req.user.id;
      deptEntry.approvedAt = new Date();
      deptEntry.rejectionReason = rejectionReason;
    }
  }

  await vendor.save();

  if (status === ACTIVE) {
    const user = await User.findById(vendor.userId);
    if (user?.status === PENDING) {
      user.status = ACTIVE;
      user.approvedBy = req.user.id;
      user.approvedAt = new Date();
      await user.save();
    }
    await createNotification({
      userId: vendor.userId,
      title: 'Department Approval',
      message: 'Your vendor application has been approved for this department.',
      type: 'approval',
    });
  }

  if (status === 'rejected') {
    await createNotification({
      userId: vendor.userId,
      title: 'Application Rejected',
      message: rejectionReason || 'Your application was rejected.',
      type: 'rejection',
    });
  }

  return success(res, vendor, 'Vendor status updated');
});

/**
 * Updates vendor performance score and tier.
 */
const updateVendorScore = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findOne({
    _id: req.params.id,
    'departments.deptId': req.deptFilter.departmentId,
  });

  if (!vendor) {
    return error(res, 'Vendor not found', NOT_FOUND);
  }

  vendor.performanceScore = { ...vendor.performanceScore.toObject(), ...req.body };
  vendor.tier = evaluateTier(vendor.performanceScore);
  await vendor.save();

  return success(res, vendor, 'Vendor score updated');
});

/**
 * Requests additional documents from a vendor.
 */
const requestMoreDocuments = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);
  if (!vendor) {
    return error(res, 'Vendor not found', NOT_FOUND);
  }

  await createNotification({
    userId: vendor.userId,
    title: 'Documents Required',
    message: req.body.message || 'Please upload additional documents.',
    type: 'document_request',
    link: '/vendor/profile',
  });

  return success(res, null, 'Document request sent');
});

module.exports = {
  getVendors,
  getVendorById,
  updateVendorStatus,
  updateVendorScore,
  requestMoreDocuments,
};
