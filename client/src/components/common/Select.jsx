/**
 * @fileoverview Styled select dropdown with label and error state.
 */

import clsx from 'clsx';

/**
 * @param {object} props Component props.
 * @param {string} [props.label]
 * @param {Array<{value: string, label: string}>} props.options
 * @param {string} [props.error]
 * @param {string} [props.placeholder]
 */
export default function Select({
  label,
  options = [],
  error,
  placeholder = 'Select an option',
  className,
  id,
  ...rest
}) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={clsx(
          'w-full rounded-lg border bg-steel-800 px-3 py-2 text-gray-100',
          'focus:border-tata-blue focus:outline-none focus:ring-1 focus:ring-tata-blue',
          error ? 'border-red-500' : 'border-steel-600',
          className,
        )}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}
