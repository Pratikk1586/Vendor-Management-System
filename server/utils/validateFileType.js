/**
 * @fileoverview MIME type validation for uploaded files.
 */

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
];

/**
 * Returns whether the MIME type is allowed for upload.
 * @param {string} mimetype File MIME type.
 * @returns {boolean}
 */
function isAllowedFileType(mimetype) {
  return ALLOWED_MIME_TYPES.includes(mimetype);
}

module.exports = { isAllowedFileType, ALLOWED_MIME_TYPES };
