/**
 * @fileoverview CORS configuration restricted to the client application origin.
 */

const cors = require('cors');

/**
 * Returns CORS middleware allowing only CLIENT_URL with credentials and standard headers.
 * @returns {import('cors').CorsOptions}
 */
function getCorsOptions() {
  const clientUrl = process.env.CLIENT_URL;

  if (!clientUrl) {
    throw new Error('CLIENT_URL is not defined in environment variables');
  }

  return {
    origin: clientUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
    ],
    exposedHeaders: ['Content-Disposition'],
    optionsSuccessStatus: 204,
  };
}

/**
 * Express CORS middleware instance. Requires dotenv to be loaded before import.
 * @type {import('cors').CorsRequestHandler}
 */
const corsMiddleware = cors(getCorsOptions());

module.exports = { corsMiddleware, getCorsOptions };
