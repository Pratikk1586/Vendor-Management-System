/**
 * @fileoverview Seeds super admin user, departments, and initial auth code on server start.
 */

const User = require('../models/User.model');
const AdminProfile = require('../models/AdminProfile.model');
const Department = require('../models/Department.model');
const { HR_ADMIN } = require('../constants/roles');
const { ACTIVE } = require('../constants/statusTypes');
const { DEPARTMENTS } = require('../constants/departments');
const { hashPassword } = require('./hashPassword');
const { generateCode } = require('../services/authCode.service');
const { logger } = require('../config/logger');

/**
 * Seeds all departments from constants if they do not exist.
 * @returns {Promise<void>}
 */
async function seedDepartments() {
  for (const dept of DEPARTMENTS) {
    await Department.upsert({
      code: dept.code,
      name: dept.name,
      category: dept.category,
      isActive: true,
    });
  }
  logger.info(`Seeded ${DEPARTMENTS.length} departments`);
}

/**
 * Creates super admin and initial auth code if no hr_admin exists.
 * @returns {Promise<void>}
 */
async function seedSuperAdmin() {
  const existingAdmin = await User.findOne({ where: { role: HR_ADMIN } });

  if (existingAdmin) {
    logger.info('Super admin already exists — skipping seed');
    await seedDepartments();
    return;
  }

  const email = process.env.SUPER_ADMIN_SEED_EMAIL;
  const password = process.env.SUPER_ADMIN_SEED_PASSWORD;

  if (!email || !password) {
    logger.warn('Super admin seed skipped: SUPER_ADMIN_SEED_EMAIL or PASSWORD not set');
    await seedDepartments();
    return;
  }

  await seedDepartments();

  const passwordHash = await hashPassword(password);

  const user = await User.create({
    name: 'Super Admin',
    email,
    passwordHash,
    role: HR_ADMIN,
    status: ACTIVE,
  });

  const adminProfile = await AdminProfile.create({
    userId: user.id,
    employeeId: 'TSC-ADMIN-001',
    designation: 'System Administrator',
    isSuperAdmin: true,
  });

  user.adminProfileId = adminProfile.id;
  await user.save();

  const { code } = await generateCode(user.id);

  console.log('========================================');
  console.log('  SUPER ADMIN SEEDED SUCCESSFULLY');
  console.log(`  Email:    ${email}`);
  console.log(`  Password: ${password}`);
  console.log(`  Auth Code: ${code}`);
  console.log('========================================');

  logger.info('Super admin and initial auth code seeded');
}

module.exports = { seedSuperAdmin, seedDepartments };

if (require.main === module) {
  require('dotenv').config();
  const { connectDB } = require('../config/db');

  connectDB()
    .then(seedSuperAdmin)
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
