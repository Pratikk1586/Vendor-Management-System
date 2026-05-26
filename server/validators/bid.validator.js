/**
 * @fileoverview Zod schemas for bid submission and scoring.
 */

const { z } = require('zod');

/** @type {import('zod').ZodSchema} Submit bid schema. */
const submitBidSchema = z.object({
  quotedAmount: z.coerce.number().positive('Quoted amount must be positive'),
  deliveryDays: z.coerce.number().int().positive('Delivery days must be a positive integer'),
  bidValidityDays: z.coerce
    .number()
    .int()
    .min(30, 'Bid validity must be at least 30 days'),
});

/** @type {import('zod').ZodSchema} Score bid schema. */
const scoreBidSchema = z.object({
  technicalScores: z.array(
    z.object({
      criteriaName: z.string().min(1),
      score: z.coerce.number().min(0),
      maxScore: z.coerce.number().positive().default(100),
    }),
  ).min(1),
  evaluatorComments: z.string().optional(),
});

module.exports = { submitBidSchema, scoreBidSchema };
