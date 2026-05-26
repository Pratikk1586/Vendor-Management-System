/**
 * @fileoverview Browser file download helper via fetch.
 */

import { getToken } from './tokenUtils.js';

/**
 * Fetches a file URL and triggers a browser download.
 * @param {string} url File URL to download.
 * @param {string} filename Suggested download filename.
 * @returns {Promise<void>}
 */
export async function downloadFile(url, filename) {
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error('Failed to download file');
  }

  const blob = await response.blob();
  const objectUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(objectUrl);
}
