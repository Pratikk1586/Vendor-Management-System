/**
 * @fileoverview Builds MongoDB filter objects from HTTP query parameters.
 */

/**
 * Builds a MongoDB filter from common query string parameters.
 * @param {object} params Query parameters (req.query).
 * @returns {object} MongoDB filter object.
 */
function buildFilter(params = {}) {
  const filter = {};

  if (params.status) {
    filter.status = params.status;
  }

  if (params.role) {
    filter.role = params.role;
  }

  if (params.departmentId) {
    filter.departmentId = params.departmentId;
  }

  if (params.department) {
    filter.department = params.department;
  }

  if (params.tier) {
    filter.tier = params.tier;
  }

  if (params.type) {
    filter.type = params.type;
  }

  if (params.vendorId) {
    filter.vendorId = params.vendorId;
  }

  if (params.tenderId) {
    filter.tenderId = params.tenderId;
  }

  if (params.userId) {
    filter.userId = params.userId;
  }

  if (params.isRead !== undefined) {
    filter.isRead = params.isRead === 'true';
  }

  if (params.isActive !== undefined) {
    filter.isActive = params.isActive === 'true';
  }

  if (params.search) {
    const searchRegex = { $regex: params.search, $options: 'i' };
    filter.$or = [
      { name: searchRegex },
      { email: searchRegex },
      { title: searchRegex },
      { companyName: searchRegex },
      { tenderId: searchRegex },
      { bidId: searchRegex },
      { contractId: searchRegex },
    ];
  }

  if (params.dateFrom || params.dateTo) {
    const dateFilter = {};
    if (params.dateFrom) {
      dateFilter.$gte = new Date(params.dateFrom);
    }
    if (params.dateTo) {
      dateFilter.$lte = new Date(params.dateTo);
    }
    filter.createdAt = dateFilter;
  }

  return filter;
}

module.exports = { buildFilter };
