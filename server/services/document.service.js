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
 * @param {string} userId Owner user ID.
 * @param {string} type Document type label.
 * @returns {Promise<{ type: string, url: string, uploadedAt: Date }>}
 */
async function saveDocument(file, userId, type) {
  const vendor = await Vendor.findOne({ where: { userId } });
  const docEntry = {
    type,
    url: buildDocUrl(file.filename),
    uploadedAt: new Date(),
    isVerified: false,
  };

  if (vendor) {
    const docs = vendor.documents || [];
    docs.push(docEntry);
    vendor.documents = docs;
    vendor.changed('documents', true);
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
 * @returns {Promise<Array<{ vendorId: string, userId: string, companyName: string, document: object }>>}
 */
async function getExpiringDocuments(daysAhead = 30) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() + daysAhead);
  const now = new Date();

  const vendors = await Vendor.findAll({
    attributes: ['id', 'userId', 'companyName', 'documents']
  });

  const results = [];

  vendors.forEach((vendor) => {
    const docs = vendor.documents || [];
    docs.forEach((doc) => {
      if (doc.expiryDate) {
        const expiry = new Date(doc.expiryDate);
        if (expiry <= cutoff && expiry >= now) {
          results.push({
            vendorId: vendor.id,
            userId: vendor.userId,
            companyName: vendor.companyName,
            document: doc,
          });
        }
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
