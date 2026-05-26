/**
 * @fileoverview Zod request validation middleware factory.
 */

const { error } = require('../utils/responseEnvelope');
const { BAD_REQUEST } = require('../constants/httpCodes');

/**
 * Returns middleware that validates req[target] against a Zod schema.
 * @param {import('zod').ZodSchema} zodSchema Zod schema to validate against.
 * @param {'body'|'query'|'params'} [target='body'] Request property to validate.
 * @returns {function(import('express').Request, import('express').Response, import('express').NextFunction): void}
 */
function validateRequest(zodSchema, target = 'body') {
  return (req, res, next) => {
    const result = zodSchema.safeParse(req[target]);

    if (!result.success) {
      const errors = result.error.flatten();
      return error(res, 'Validation failed', BAD_REQUEST, errors);
    }

    req[target] = result.data;
    return next();
  };
}

module.exports = validateRequest;
