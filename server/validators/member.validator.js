/**
 * @fileoverview Zod schemas for member management by administrators.
 */

const { z } = require('zod');
const { VENDOR, DEPT_HEAD, HR_ADMIN } = require('../constants/roles');
const {
  PENDING,
  ACTIVE,
  SUSPENDED,
  BLACKLISTED,
  DELETED,
} = require('../constants/statusTypes');

/** @type {import('zod').ZodSchema} Partial member update schema. */
const updateMemberSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  designation: z.string().optional(),
  employeeId: z.string().optional(),
}).partial();

/** @type {import('zod').ZodSchema} Change role schema. */
const changeRoleSchema = z
  .object({
    role: z.enum([VENDOR, DEPT_HEAD, HR_ADMIN]),
    department: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === DEPT_HEAD && !data.department) {
      ctx.addIssue({
        code: 'custom',
        message: 'Department is required for department head role',
        path: ['department'],
      });
    }
  });

/** @type {import('zod').ZodSchema} Change status schema. */
const changeStatusSchema = z
  .object({
    status: z.enum([PENDING, ACTIVE, SUSPENDED, BLACKLISTED, DELETED]),
    reason: z.string().optional(),
    suspensionUntil: z.coerce.date().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      (data.status === SUSPENDED || data.status === BLACKLISTED)
      && !data.reason
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'Reason is required for suspend or blacklist',
        path: ['reason'],
      });
    }

    if (data.status === SUSPENDED && !data.suspensionUntil) {
      ctx.addIssue({
        code: 'custom',
        message: 'Suspension end date is required when suspending',
        path: ['suspensionUntil'],
      });
    }
  });

/** @type {import('zod').ZodSchema} Bulk action schema. */
const bulkActionSchema = z.object({
  action: z.enum(['approve', 'suspend', 'notify', 'export']),
  memberIds: z.array(z.string()).min(1),
  reason: z.string().optional(),
});

module.exports = {
  updateMemberSchema,
  changeRoleSchema,
  changeStatusSchema,
  bulkActionSchema,
};
