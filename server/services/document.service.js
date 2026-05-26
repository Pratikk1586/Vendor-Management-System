/**
 * @fileoverview Document upload persistence, deletion, and expiry tracking.
 */

const fs = require('fs');
const path = require('path');
const Vendor = require('../models/Vendor.model');

/**
 * Builds a public URL path for a saved upload.
 * @param {string} filename Stored filename.
 * @returns {string}
 */
function buildDocUrl(filename) {
  const uploadPath = process.env.UPLOAD_PATH || './uploads';
  return path.join(uploadPath, filename).replace(/\\/g, '/');
}

/**
 * Saves document metadata after multer upload.
 * @param {Express.Multer.File} file Uploaded file from multer.
 * @param {import('mongoose').Types.ObjectId} userId Owner user ID.
 * @param {string} type Document type label.
 * @returns {Promise<{ type: string, url: string, uploadedAt: Date }>}
 */
async function saveDocument(file, userId, type) {
  const vendor = await Vendor.findOne({ userId });
  const docEntry = {
    type,
    url: buildDocUrl(file.filename),
    uploadedAt: new Date(),
    isVerified: false,
  };

  if (vendor) {
    vendor.documents.push(docEntry);
    await vendor.save();
  }

  return docEntry;
}

/**
 * Deletes a document file from disk if it exists locally.
 * @param {string} docUrl Document URL or path.
 * @returns {Promise<boolean>}
 */
async function deleteDocument(docUrl) {
  if (!docUrl) {
    return false;
  }

  const resolved = path.isAbsolute(docUrl)
    ? docUrl
    : path.resolve(docUrl);

  if (fs.existsSync(resolved)) {
    fs.unlinkSync(resolved);
    return true;
  }

  return false;
}

/**
 * Returns vendor documents expiring within the given number of days.
 * @param {number} [daysAhead=30] Days ahead to check for expiry.
 * @returns {Promise<Array<{ vendorId: import('mongoose').Types.ObjectId, userId: import('mongoose').Types.ObjectId, companyName: string, document: object }>>}
 */
async function getExpiringDocuments(daysAhead = 30) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() + daysAhead);

  const vendors = await Vendor.find({
    'documents.expiryDate': { $lte: cutoff, $gte: new Date() },
  }).select('userId companyName documents');

  const results = [];

  vendors.forEach((vendor) => {
    vendor.documents.forEach((doc) => {
      if (doc.expiryDate && doc.expiryDate <= cutoff && doc.expiryDate >= new Date()) {
        results.push({
          vendorId: vendor._id,
          userId: vendor.userId,
          companyName: vendor.companyName,
          document: doc,
        });
      }
    });
  });

  return results;
}

module.exports = {
  saveDocument,
  deleteDocument,
  getExpiringDocuments,
};
