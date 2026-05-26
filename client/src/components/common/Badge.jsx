/**
 * @fileoverview Status badge chip with auto-colored status styling.
 */

import clsx from 'clsx';
import { getStatusColor } from '../../utils/getStatusColor.js';

/**
 * @param {object} props Component props.
 * @param {string} props.status Status key for color mapping.
 * @param {string} [props.label] Optional display label override.
 */
export default function Badge({ status, label, className }) {
  const displayLabel = label || status?.replace(/_/g, ' ');

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
        getStatusColor(status),
        className,
      )}
    >
      {displayLabel}
    </span>
  );
}
