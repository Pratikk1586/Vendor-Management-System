/**
 * @fileoverview Page navigation controls for paginated lists.
 */

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Select from './Select.jsx';

const LIMIT_OPTIONS = [
  { value: '10', label: '10 per page' },
  { value: '25', label: '25 per page' },
  { value: '50', label: '50 per page' },
];

/**
 * @param {object} props Component props.
 * @param {number} props.page Current page.
 * @param {number} props.totalPages Total pages.
 * @param {function} props.onPageChange Page change handler.
 * @param {number} [props.limit] Items per page.
 * @param {function} [props.onLimitChange] Limit change handler.
 * @param {number} [props.total] Total item count.
 */
export default function Pagination({
  page,
  totalPages,
  onPageChange,
  limit,
  onLimitChange,
  total,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-steel-600 pt-4">
      {total !== undefined && (
        <p className="text-sm text-gray-400">
          {total} total result{total !== 1 ? 's' : ''}
        </p>
      )}
      <div className="flex items-center gap-3">
        {onLimitChange && limit && (
          <Select
            options={LIMIT_OPTIONS}
            value={String(limit)}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="w-36"
          />
        )}
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border border-steel-600 p-2 text-gray-300 hover:bg-steel-700 disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm text-gray-300">
          Page {page} of {totalPages || 1}
        </span>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg border border-steel-600 p-2 text-gray-300 hover:bg-steel-700 disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
