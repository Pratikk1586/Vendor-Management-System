/**
 * @fileoverview HTTP status code constants for consistent API responses.
 */

/** @type {200} Request succeeded. */
const OK = 200;

/** @type {201} Resource created. */
const CREATED = 201;

/** @type {400} Invalid request. */
const BAD_REQUEST = 400;

/** @type {401} Authentication required or failed. */
const UNAUTHORIZED = 401;

/** @type {403} Authenticated but not permitted. */
const FORBIDDEN = 403;

/** @type {404} Resource not found. */
const NOT_FOUND = 404;

/** @type {409} Conflict with current state. */
const CONFLICT = 409;

/** @type {500} Internal server error. */
const SERVER_ERROR = 500;

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  SERVER_ERROR,
};
