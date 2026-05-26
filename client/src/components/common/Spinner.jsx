/**
 * @fileoverview Tata Blue loading spinner.
 */

import clsx from 'clsx';
import { SPINNER_SIZES } from '../../constants/ui.js';

/**
 * @param {object} props Component props.
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.fullPage=false]
 */
export default function Spinner({ size = 'md', fullPage = false }) {
  const spinner = (
    <div
      role="status"
      aria-label="Loading"
      className={clsx(
        'animate-spin rounded-full border-2 border-steel-600 border-t-tata-blue',
        SPINNER_SIZES[size],
      )}
    />
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-steel-900/80">
        {spinner}
      </div>
    );
  }

  return spinner;
}
