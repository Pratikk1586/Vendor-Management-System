/**
 * @fileoverview Shared status type constants (mirrors client constants).
 */

/** @type {'pending'} Awaiting action or approval. */
const PENDING = 'pending';

/** @type {'active'} Approved and in good standing. */
const ACTIVE = 'active';

/** @type {'suspended'} Temporarily disabled. */
const SUSPENDED = 'suspended';

/** @type {'blacklisted'} Blocked from participation. */
const BLACKLISTED = 'blacklisted';

/** @type {'deleted'} Soft-deleted record. */
const DELETED = 'deleted';

/** @type {'draft'} Tender not yet published. */
const DRAFT = 'draft';

/** @type {'published'} Tender open for bidding. */
const PUBLISHED = 'published';

/** @type {'under_evaluation'} Tender bids under review. */
const UNDER_EVALUATION = 'under_evaluation';

/** @type {'awarded'} Tender awarded to a vendor. */
const AWARDED = 'awarded';

/** @type {'cancelled'} Tender cancelled. */
const CANCELLED = 'cancelled';

/** @type {'submitted'} Bid submitted by vendor. */
const SUBMITTED = 'submitted';

/** @type {'shortlisted'} Bid shortlisted for evaluation. */
const SHORTLISTED = 'shortlisted';

/** @type {'not_selected'} Bid not selected. */
const NOT_SELECTED = 'not_selected';

/** @type {'rejected'} Bid or request rejected. */
const REJECTED = 'rejected';

module.exports = {
  PENDING,
  ACTIVE,
  SUSPENDED,
  BLACKLISTED,
  DELETED,
  DRAFT,
  PUBLISHED,
  UNDER_EVALUATION,
  AWARDED,
  CANCELLED,
  SUBMITTED,
  SHORTLISTED,
  NOT_SELECTED,
  REJECTED,
};
