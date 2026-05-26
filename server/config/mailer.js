/**
 * @fileoverview Nodemailer SMTP transporter and mail-sending helper for transactional email.
 */

const nodemailer = require('nodemailer');
const { logger } = require('./logger');

/**
 * Nodemailer transporter configured from SMTP environment variables.
 * @type {import('nodemailer').Transporter}
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Sends an email using the configured transporter.
 * @param {object} options Mail options (to, subject, text, html, attachments, etc.).
 * @param {string} options.to Recipient email address.
 * @param {string} options.subject Email subject line.
 * @param {string} [options.text] Plain-text body.
 * @param {string} [options.html] HTML body.
 * @returns {Promise<import('nodemailer').SentMessageInfo>}
 */
async function sendMail({ to, subject, text, html, attachments }) {
  const from = process.env.MAIL_FROM;

  if (!from) {
    throw new Error('MAIL_FROM is not defined in environment variables');
  }

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
    attachments,
  });

  logger.info(`Email sent to ${to}: ${info.messageId}`);
  return info;
}

module.exports = { transporter, sendMail };
