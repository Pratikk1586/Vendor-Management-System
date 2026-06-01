/**
 * @fileoverview Sortable data table with loading and empty states.
 */

import clsx from 'clsx';
import { ChevronUp, ChevronDown } from 'lucide-react';
import SkeletonLoader from './SkeletonLoader.jsx';
import EmptyState from './EmptyState.jsx';

/**
 * @param {object} props Component props.
 * @param {Array<{key: string, label: string, sortable?: boolean, render?: function}>} props.columns
 * @param {Array<object>} props.data Row data.
 * @param {boolean} [props.loading=false]
 * @param {function} [props.onSort] Sort handler (key).
 * @param {string} [props.sortKey] Active sort column key.
 * @param {'asc'|'desc'} [props.sortDir] Sort direction.
 * @param {string} [props.emptyMessage='No data found']
 */
export default function DataTable({
  columns,
  data,
  loading = false,
  onSort,
  sortKey,
  sortDir,
  emptyMessage = 'No data found',
}) {
  if (loading) {
    return <SkeletonLoader type="table" count={5} />;
  }

  if (!data?.length) {
    return <EmptyState title={emptyMessage} description="Try adjusting your filters." />;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-steel-600">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-steel-600 bg-steel-800">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={clsx(
                  'px-4 py-3 font-medium text-slate-800',
                  col.sortable && 'cursor-pointer select-none hover:text-white',
                )}
                onClick={() => col.sortable && onSort?.(col.key)}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {col.sortable && sortKey === col.key && (
                    sortDir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-steel-600">
          {data.map((row, rowIndex) => (
            <tr key={row._id || row.id || rowIndex} className="hover:bg-steel-800/50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-gray-800">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
