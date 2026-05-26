/**
 * @fileoverview Hover tooltip wrapper component.
 */

import { useState } from 'react';
import clsx from 'clsx';

/** @type {Record<string, string>} Tooltip position classes. */
const POSITION_CLASSES = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
};

/**
 * @param {object} props Component props.
 * @param {string} props.content Tooltip text.
 * @param {React.ReactNode} props.children Wrapped element.
 * @param {'top'|'bottom'|'left'|'right'} [props.position='top']
 */
export default function Tooltip({ content, children, position = 'top' }) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && content && (
        <span
          role="tooltip"
          className={clsx(
            'pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-steel-700 px-2 py-1 text-xs text-gray-200 shadow-lg',
            POSITION_CLASSES[position],
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}
