/**
 * @fileoverview Pagination state hook for list views.
 */

import { useState, useCallback, useMemo } from 'react';

/**
 * Manages page and limit state for paginated API requests.
 * @param {number} [initialPage=1] Starting page number.
 * @param {number} [initialLimit=10] Items per page.
 * @returns {object} Pagination state and helpers.
 */
export function usePagination(initialPage = 1, initialLimit = 10) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  /**
   * Resets pagination to initial values.
   */
  const resetPagination = useCallback(() => {
    setPage(initialPage);
    setLimit(initialLimit);
  }, [initialPage, initialLimit]);

  const paginationProps = useMemo(
    () => ({ page, limit }),
    [page, limit],
  );

  return {
    page,
    limit,
    setPage,
    setLimit,
    resetPagination,
    paginationProps,
  };
}
