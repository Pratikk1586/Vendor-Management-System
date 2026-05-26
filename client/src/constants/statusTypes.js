/**
 * @fileoverview Shared status type constants for users, tenders, bids, and contracts.
 */

/** @type {'pending'} Awaiting action or approval. */
export const PENDING = 'pending';

/** @type {'active'} Approved and in good standing. */
export const ACTIVE = 'active';

/** @type {'suspended'} Temporarily disabled. */
export const SUSPENDED = 'suspended';

/** @type {'blacklisted'} Blocked from participation. */
export const BLACKLISTED = 'blacklisted';

/** @type {'deleted'} Soft-deleted record. */
export const DELETED = 'deleted';

/** @type {'draft'} Tender not yet published. */
export const DRAFT = 'draft';

/** @type {'published'} Tender open for bidding. */
export const PUBLISHED = 'published';

/** @type {'under_evaluation'} Tender bids under review. */
export const UNDER_EVALUATION = 'under_evaluation';

/** @type {'awarded'} Tender awarded to a vendor. */
export const AWARDED = 'awarded';

/** @type {'cancelled'} Tender cancelled. */
export const CANCELLED = 'cancelled';

/** @type {'submitted'} Bid submitted by vendor. */
export const SUBMITTED = 'submitted';

/** @type {'shortlisted'} Bid shortlisted for evaluation. */
export const SHORTLISTED = 'shortlisted';

/** @type {'not_selected'} Bid not selected. */
export const NOT_SELECTED = 'not_selected';

/** @type {'rejected'} Bid or request rejected. */
export const REJECTED = 'rejected';
