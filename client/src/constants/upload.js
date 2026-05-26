/**
 * @fileoverview File upload size and MIME type constants for client-side validation.
 */

/** @type {number} Maximum upload size in megabytes. */
export const MAX_FILE_SIZE_MB = 5;

/** @type {number} Maximum upload size in bytes. */
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

/** @type {string[]} Allowed MIME types for document uploads. */
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
];
