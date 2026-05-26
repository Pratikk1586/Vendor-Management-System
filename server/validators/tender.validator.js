/**
 * @fileoverview Zod schemas for tender creation and updates.
 */

const { z } = require('zod');

const evaluationCriterionSchema = z.object({
  name: z.string().min(1, 'Criterion name is required'),
  weightage: z.coerce.number().min(0).max(100),
});

/** @type {import('zod').ZodSchema} Create tender schema. */
const createTenderSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    scopeOfWork: z.string().optional(),
    type: z.enum(['rate_contract', 'one_time', 'amc', 'works_contract']),
    estimatedBudget: z.coerce.number().positive().optional(),
    isBudgetHidden: z.boolean().optional().default(true),
    submissionDeadline: z.coerce.date().refine((d) => d > new Date(), {
      message: 'Submission deadline must be in the future',
    }),
    bidOpeningDate: z.coerce.date().optional(),
    evaluationCriteria: z.array(evaluationCriterionSchema).min(1),
    commercialWeightage: z.coerce.number().min(0).max(100).default(40),
  })
  .superRefine((data, ctx) => {
    const commercial = data.commercialWeightage ?? 40;
    const technicalSum = (data.evaluationCriteria || []).reduce(
      (sum, c) => sum + (c.weightage || 0),
      0,
    );

    if (technicalSum + commercial !== 100) {
      ctx.addIssue({
        code: 'custom',
        message: `Technical weightages (${technicalSum}) and commercial weightage (${commercial}) must sum to 100`,
        path: ['evaluationCriteria'],
      });
    }
  });

/** @type {import('zod').ZodSchema} Update tender schema (all fields optional). */
const updateTenderSchema = z
  .object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    scopeOfWork: z.string().optional(),
    type: z.enum(['rate_contract', 'one_time', 'amc', 'works_contract']).optional(),
    estimatedBudget: z.coerce.number().positive().optional(),
    isBudgetHidden: z.boolean().optional(),
    submissionDeadline: z.coerce.date().optional(),
    bidOpeningDate: z.coerce.date().optional(),
    evaluationCriteria: z.array(evaluationCriterionSchema).optional(),
    commercialWeightage: z.coerce.number().min(0).max(100).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.evaluationCriteria && data.commercialWeightage === undefined) {
      return;
    }
    const commercial = data.commercialWeightage ?? 40;
    const technicalSum = (data.evaluationCriteria || []).reduce(
      (sum, c) => sum + (c.weightage || 0),
      0,
    );
    if (data.evaluationCriteria?.length && technicalSum + commercial !== 100) {
      ctx.addIssue({
        code: 'custom',
        message: 'Technical and commercial weightages must sum to 100',
        path: ['evaluationCriteria'],
      });
    }
  });

module.exports = { createTenderSchema, updateTenderSchema };
