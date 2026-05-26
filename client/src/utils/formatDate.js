/**
 * @fileoverview Date formatting and comparison utilities using date-fns.
 */

import {
  format,
  formatDistanceToNow,
  isPast,
  differenceInDays,
  parseISO,
} from 'date-fns';

/**
 * Parses a date value into a Date object.
 * @param {string|Date} date Input date.
 * @returns {Date}
 */
function toDate(date) {
  if (!date) {
    return new Date();
  }
  return date instanceof Date ? date : parseISO(date);
}

/**
 * Formats a date as dd MMM yyyy.
 * @param {string|Date} date Input date.
 * @returns {string}
 */
export function formatDate(date) {
  return format(toDate(date), 'dd MMM yyyy');
}

/**
 * Formats a date with time as dd MMM yyyy, hh:mm a.
 * @param {string|Date} date Input date.
 * @returns {string}
 */
export function formatDateTime(date) {
  return format(toDate(date), 'dd MMM yyyy, hh:mm a');
}

/**
 * Returns a human-readable relative time string (e.g. "3 days ago").
 * @param {string|Date} date Input date.
 * @returns {string}
 */
export function formatRelative(date) {
  return formatDistanceToNow(toDate(date), { addSuffix: true });
}

/**
 * Returns whether a date is in the past.
 * @param {string|Date} date Input date.
 * @returns {boolean}
 */
export function isExpired(date) {
  return isPast(toDate(date));
}

/**
 * Returns the number of days until a future date (negative if past).
 * @param {string|Date} date Target date.
 * @returns {number}
 */
export function daysUntil(date) {
  return differenceInDays(toDate(date), new Date());
}
