/**
 * @fileoverview Transactional email helpers for vendor portal events.
 */

const { sendMail } = require('../config/mailer');

const APP_NAME = process.env.VITE_APP_NAME || 'Tata Steel Colors Vendor Portal';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

/**
 * Sends vendor registration confirmation email.
 * @param {object} vendor Vendor document or profile object.
 * @returns {Promise<import('nodemailer').SentMessageInfo>}
 */
async function sendVendorRegistrationEmail(vendor) {
  const email = vendor.contacts?.find((c) => c.isPrimary)?.email
    || vendor.contacts?.[0]?.email;

  return sendMail({
    to: email,
    subject: `${APP_NAME} — Registration Received`,
    html: `<p>Thank you for registering <strong>${vendor.companyName}</strong>.</p>
      <p>Your application is under review. You will be notified once approved.</p>`,
  });
}

/**
 * Sends account approval email.
 * @param {object} user User document.
 * @returns {Promise<import('nodemailer').SentMessageInfo>}
 */
async function sendApprovalEmail(user) {
  return sendMail({
    to: user.email,
    subject: `${APP_NAME} — Account Approved`,
    html: `<p>Hello ${user.name},</p>
      <p>Your account has been approved. <a href="${CLIENT_URL}/login">Log in here</a>.</p>`,
  });
}

/**
 * Sends account rejection email.
 * @param {object} user User document.
 * @param {string} reason Rejection reason.
 * @returns {Promise<import('nodemailer').SentMessageInfo>}
 */
async function sendRejectionEmail(user, reason) {
  return sendMail({
    to: user.email,
    subject: `${APP_NAME} — Application Rejected`,
    html: `<p>Hello ${user.name},</p>
      <p>Your application was not approved.</p>
      <p><strong>Reason:</strong> ${reason || 'Not specified'}</p>`,
  });
}

/**
 * Sends tender published notification to vendors.
 * @param {object[]} vendors Vendor documents.
 * @param {object} tender Tender document.
 * @returns {Promise<void>}
 */
async function sendTenderPublishedEmail(vendors, tender) {
  const tasks = vendors.map(async (vendor) => {
    const email = vendor.contacts?.find((c) => c.isPrimary)?.email
      || vendor.contacts?.[0]?.email;

    if (!email) {
      return null;
    }

    return sendMail({
      to: email,
      subject: `${APP_NAME} — New Tender: ${tender.title}`,
      html: `<p>A new tender <strong>${tender.tenderId}</strong> has been published.</p>
        <p>Deadline: ${new Date(tender.submissionDeadline).toLocaleDateString()}</p>
        <p><a href="${CLIENT_URL}/vendor/tenders">View tenders</a></p>`,
    });
  });

  await Promise.allSettled(tasks);
}

/**
 * Sends bid result notification to a vendor.
 * @param {object} vendor Vendor document.
 * @param {object} bid Bid document.
 * @param {string} result Result label (e.g. shortlisted, awarded).
 * @returns {Promise<import('nodemailer').SentMessageInfo>}
 */
async function sendBidResultEmail(vendor, bid, result) {
  const email = vendor.contacts?.find((c) => c.isPrimary)?.email
    || vendor.contacts?.[0]?.email;

  return sendMail({
    to: email,
    subject: `${APP_NAME} — Bid Result: ${result}`,
    html: `<p>Your bid <strong>${bid.bidId}</strong> status: <strong>${result}</strong>.</p>
      <p><a href="${CLIENT_URL}/vendor/bids">View your bids</a></p>`,
  });
}

/**
 * Sends contract award notification.
 * @param {object} vendor Vendor document.
 * @param {object} contract Contract document.
 * @returns {Promise<import('nodemailer').SentMessageInfo>}
 */
async function sendContractAwardEmail(vendor, contract) {
  const email = vendor.contacts?.find((c) => c.isPrimary)?.email
    || vendor.contacts?.[0]?.email;

  return sendMail({
    to: email,
    subject: `${APP_NAME} — Contract Awarded: ${contract.contractId}`,
    html: `<p>Congratulations! Contract <strong>${contract.contractId}</strong> has been awarded.</p>
      <p>Value: ₹${contract.contractValue?.toLocaleString('en-IN')}</p>
      <p><a href="${CLIENT_URL}/vendor/contracts">View contract</a></p>`,
  });
}

/**
 * Sends document expiry warning email.
 * @param {object} vendor Vendor document.
 * @param {string} docType Document type label.
 * @returns {Promise<import('nodemailer').SentMessageInfo>}
 */
async function sendDocumentExpiryEmail(vendor, docType) {
  const email = vendor.contacts?.find((c) => c.isPrimary)?.email
    || vendor.contacts?.[0]?.email;

  return sendMail({
    to: email,
    subject: `${APP_NAME} — Document Expiring Soon`,
    html: `<p>Your <strong>${docType}</strong> document is expiring soon.</p>
      <p>Please upload an updated document in your profile.</p>
      <p><a href="${CLIENT_URL}/vendor/profile">Update documents</a></p>`,
  });
}

/**
 * Sends password reset link email.
 * @param {object} user User document.
 * @param {string} resetUrl Password reset URL.
 * @returns {Promise<import('nodemailer').SentMessageInfo>}
 */
async function sendPasswordResetEmail(user, resetUrl) {
  return sendMail({
    to: user.email,
    subject: `${APP_NAME} — Password Reset`,
    html: `<p>Hello ${user.name},</p>
      <p>Click the link below to reset your password (expires in 1 hour):</p>
      <p><a href="${resetUrl}">Reset Password</a></p>`,
  });
}

module.exports = {
  sendVendorRegistrationEmail,
  sendApprovalEmail,
  sendRejectionEmail,
  sendTenderPublishedEmail,
  sendBidResultEmail,
  sendContractAwardEmail,
  sendDocumentExpiryEmail,
  sendPasswordResetEmail,
};
