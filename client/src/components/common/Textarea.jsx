/**
 * @fileoverview Styled textarea with label and error state.
 */

import clsx from 'clsx';

/**
 * @param {object} props Component props.
 * @param {string} [props.label]
 * @param {string} [props.error]
 * @param {string} [props.helper]
 */
export default function Textarea({
  label,
  error,
  helper,
  className,
  id,
  rows = 4,
  ...rest
}) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="mb-1.5 block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={clsx(
          'w-full resize-y rounded-lg border bg-steel-800 px-3 py-2 text-gray-100 placeholder-gray-500',
          'focus:border-tata-blue focus:outline-none focus:ring-1 focus:ring-tata-blue',
          error ? 'border-red-500' : 'border-steel-600',
          className,
        )}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
      {helper && !error && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
    </div>
  );
}
