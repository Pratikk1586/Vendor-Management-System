/**
 * @fileoverview Bid scoring calculations for technical, commercial, and weighted totals.
 */

/**
 * Calculates technical score as a percentage from criteria scores.
 * @param {object} bid Bid document with technicalScores.
 * @param {object} tender Tender document with evaluationCriteria.
 * @returns {number}
 */
function calculateTechnicalScore(bid, tender) {
  if (!bid.technicalScores?.length) {
    return 0;
  }

  let weightedSum = 0;
  let totalWeight = 0;

  bid.technicalScores.forEach((entry) => {
    const criteria = tender.evaluationCriteria?.find(
      (c) => c.name === entry.criteriaName,
    );
    const weight = criteria?.weightage ?? 1;
    const maxScore = entry.maxScore || 100;
    const normalized = maxScore > 0 ? (entry.score / maxScore) * 100 : 0;

    weightedSum += normalized * weight;
    totalWeight += weight;
  });

  return totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 100) / 100 : 0;
}

/**
 * Calculates commercial score relative to quoted amount (lower is better).
 * @param {number} quotedAmount Bid quoted amount.
 * @param {number} [referenceAmount] Reference amount (e.g. estimated budget or lowest bid).
 * @returns {number}
 */
function calculateCommercialScore(quotedAmount, referenceAmount) {
  if (!quotedAmount || !referenceAmount || quotedAmount <= 0) {
    return 0;
  }

  const score = (referenceAmount / quotedAmount) * 100;
  return Math.min(100, Math.round(score * 100) / 100);
}

/**
 * Computes technical, commercial, and weighted total scores for a bid.
 * @param {object} bid Bid document.
 * @param {object} tender Tender document.
 * @param {number} [lowestBidAmount] Lowest bid amount on the tender for L1 scoring.
 * @returns {{ technicalScore: number, commercialScore: number, weightedTotalScore: number }}
 */
function calculateBidScores(bid, tender, lowestBidAmount) {
  const technicalScore = calculateTechnicalScore(bid, tender);
  const referenceAmount = lowestBidAmount || tender.estimatedBudget || bid.quotedAmount;
  const commercialScore = calculateCommercialScore(bid.quotedAmount, referenceAmount);

  const commercialWeight = tender.commercialWeightage ?? 40;
  const technicalWeight = 100 - commercialWeight;

  const weightedTotalScore = Math.round(
    (technicalScore * technicalWeight + commercialScore * commercialWeight) / 100 * 100,
  ) / 100;

  return {
    technicalScore,
    commercialScore,
    weightedTotalScore,
  };
}

module.exports = { calculateBidScores };
