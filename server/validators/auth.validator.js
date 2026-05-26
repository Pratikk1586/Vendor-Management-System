/**
 * @fileoverview Zod schemas for authentication and registration requests.
 */

const { z } = require('zod');
const { VENDOR, DEPT_HEAD, HR_ADMIN } = require('../constants/roles');

const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;
const TATA_EMAIL_SUFFIX = '@tatasteel.com';

const passwordField = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(
    PASSWORD_REGEX,
    'Password must contain uppercase, number, and special character',
  );

/**
 * Validates password confirmation matches password field.
 * @param {object} data Form data with password fields.
 * @param {import('zod').RefinementCtx} ctx Zod refinement context.
 */
function validatePasswordMatch(data, ctx) {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: 'custom',
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });
  }
}

/** @type {import('zod').ZodSchema} Vendor registration schema. */
const vendorRegisterSchema = z
  .object({
    companyName: z.string().min(1, 'Company name is required'),
    gstNumber: z.string().regex(GST_REGEX, 'Invalid GST number format'),
    panNumber: z.string().regex(PAN_REGEX, 'Invalid PAN number format'),
    yearEstablished: z.coerce.number().int().positive().optional(),
    companyType: z.string().min(1, 'Company type is required'),
    departments: z.array(z.string()).min(1, 'Select at least one department'),
    contactName: z.string().min(1, 'Contact name is required'),
    email: z.string().email('Invalid email address'),
    mobile: z.string().min(10, 'Invalid mobile number'),
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    pin: z.string().min(6, 'Invalid PIN code'),
    password: passwordField,
    confirmPassword: z.string(),
  })
  .superRefine(validatePasswordMatch);

const tataEmail = z
  .string()
  .email('Invalid email address')
  .refine((val) => val.toLowerCase().endsWith(TATA_EMAIL_SUFFIX), {
    message: 'Email must be a @tatasteel.com address',
  });

/** @type {import('zod').ZodSchema} Department head registration schema. */
const deptHeadRegisterSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    employeeId: z.string().min(1, 'Employee ID is required'),
    email: tataEmail,
    mobile: z.string().min(10, 'Invalid mobile number'),
    designation: z.string().min(1, 'Designation is required'),
    yearsAtCompany: z.coerce.number().int().nonnegative().optional(),
    department: z.string().min(1, 'Department is required'),
    password: passwordField,
    confirmPassword: z.string(),
  })
  .superRefine(validatePasswordMatch);

/** @type {import('zod').ZodSchema} Admin registration schema. */
const adminRegisterSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    employeeId: z.string().min(1, 'Employee ID is required'),
    email: tataEmail,
    mobile: z.string().min(10, 'Invalid mobile number'),
    designation: z.string().min(1, 'Designation is required'),
    authCode: z.string().min(1, 'Authorization code is required'),
    password: passwordField,
    confirmPassword: z.string(),
  })
  .superRefine(validatePasswordMatch);

/** @type {import('zod').ZodSchema} Login schema. */
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  role: z.enum([VENDOR, DEPT_HEAD, HR_ADMIN]),
});

/** @type {import('zod').ZodSchema} Refresh token schema. */
const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

/** @type {import('zod').ZodSchema} Forgot password schema. */
const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

/** @type {import('zod').ZodSchema} Reset password schema. */
const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
    password: passwordField,
    confirmPassword: z.string(),
  })
  .superRefine(validatePasswordMatch);

/** @type {import('zod').ZodSchema} Auth code validation schema. */
const validateAuthCodeSchema = z.object({
  authCode: z.string().min(1, 'Authorization code is required'),
});

module.exports = {
  vendorRegisterSchema,
  deptHeadRegisterSchema,
  adminRegisterSchema,
  loginSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  validateAuthCodeSchema,
};
