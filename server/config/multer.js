/**
 * @fileoverview Multer disk storage and file upload validation for document attachments.
 */

const fs = require('fs');
const path = require('path');
const multer = require('multer');

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
];

/**
 * Ensures the upload directory exists on disk.
 * @returns {string} Resolved upload directory path.
 */
function ensureUploadDir() {
  const uploadPath = process.env.UPLOAD_PATH || './uploads';
  const resolvedPath = path.resolve(uploadPath);

  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true });
  }

  return resolvedPath;
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    try {
      const dir = ensureUploadDir();
      cb(null, dir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, '-');
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  },
});

/**
 * Rejects files that are not PDF, JPG, JPEG, or PNG.
 * @param {Express.Request} _req
 * @param {Express.Multer.File} file
 * @param {multer.FileFilterCallback} cb
 */
function fileFilter(_req, file, cb) {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
    return;
  }

  cb(new Error('Only PDF, JPG, JPEG, and PNG files are allowed'));
}

const maxFileSizeMb = parseInt(process.env.MAX_FILE_SIZE_MB, 10) || 5;

/**
 * Multer middleware for single-file uploads with type and size limits.
 * @type {multer.Multer}
 */
const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: maxFileSizeMb * 1024 * 1024,
  },
});

module.exports = { uploadMiddleware, ALLOWED_MIME_TYPES };
