/**
 * @fileoverview Vendor tier evaluation based on overall performance score.
 */

/**
 * Evaluates vendor tier from overall performance score.
 * @param {{ overall?: number }} performanceScore Performance score object.
 * @returns {'silver'|'gold'|'platinum'}
 */
function evaluateTier(performanceScore = {}) {
  const overall = performanceScore.overall ?? 0;

  if (overall >= 71) {
    return 'platinum';
  }

  if (overall >= 41) {
    return 'gold';
  }

  return 'silver';
}

module.exports = { evaluateTier };
