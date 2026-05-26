/**
 * @fileoverview Vendor performance tier definitions based on composite score ranges.
 */

/** @type {'silver'} Entry vendor tier (score 0–40). */
export const SILVER = 'silver';

/** @type {'gold'} Mid vendor tier (score 41–70). */
export const GOLD = 'gold';

/** @type {'platinum'} Top vendor tier (score 71–100). */
export const PLATINUM = 'platinum';

/**
 * Full tier configuration including score bounds, styling, and benefits.
 * @type {Record<string, { key: string, label: string, color: string, minScore: number, maxScore: number, benefits: string[] }>}
 */
export const VENDOR_TIERS = {
  [SILVER]: {
    key: SILVER,
    label: 'Silver',
    color: '#94A3B8',
    minScore: 0,
    maxScore: 40,
    benefits: [
      'Access to open tenders in your category',
      'Standard bid submission window',
      'Email support during business hours',
    ],
  },
  [GOLD]: {
    key: GOLD,
    label: 'Gold',
    color: '#C8960C',
    minScore: 41,
    maxScore: 70,
    benefits: [
      'Priority visibility on matching tenders',
      'Extended bid clarification window',
      'Dedicated relationship manager',
      'Quarterly performance review',
    ],
  },
  [PLATINUM]: {
    key: PLATINUM,
    label: 'Platinum',
    color: '#003087',
    minScore: 71,
    maxScore: 100,
    benefits: [
      'Early access to pre-qualified tenders',
      'Fast-track approval on repeat categories',
      'Executive sponsor assignment',
      'Annual strategic vendor review',
      'Invited participation in pilot programs',
    ],
  },
};

/**
 * Ordered list of tiers from lowest to highest score band.
 * @type {Array<typeof VENDOR_TIERS[string]>}
 */
export const VENDOR_TIER_LIST = [
  VENDOR_TIERS[SILVER],
  VENDOR_TIERS[GOLD],
  VENDOR_TIERS[PLATINUM],
];
