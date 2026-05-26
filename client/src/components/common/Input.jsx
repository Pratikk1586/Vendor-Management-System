/**
 * @fileoverview Controlled text input with label, error, and helper text.
 */

import clsx from 'clsx';

/**
 * @param {object} props Component props.
 * @param {string} [props.label]
 * @param {string} [props.error]
 * @param {string} [props.helper]
 * @param {React.ReactNode} [props.icon]
 */
export default function Input({
  label,
  error,
  helper,
  icon,
  className,
  id,
  ...rest
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={clsx(
            'w-full rounded-lg border bg-steel-800 px-3 py-2 text-gray-100 placeholder-gray-500',
            'focus:border-tata-blue focus:outline-none focus:ring-1 focus:ring-tata-blue',
            error ? 'border-red-500' : 'border-steel-600',
            icon && 'pl-10',
            className,
          )}
          {...rest}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
      {helper && !error && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
    </div>
  );
}
