/**
 * @fileoverview Styled checkbox with label.
 */

import clsx from 'clsx';

/**
 * @param {object} props Component props.
 * @param {string} [props.label]
 * @param {boolean} [props.checked]
 * @param {function} [props.onChange]
 */
export default function Checkbox({ label, className, id, ...rest }) {
  const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <label
      htmlFor={checkboxId}
      className={clsx('inline-flex cursor-pointer items-center gap-2', className)}
    >
      <input
        id={checkboxId}
        type="checkbox"
        className="h-4 w-4 rounded border-steel-600 bg-steel-800 text-tata-blue focus:ring-tata-light focus:ring-offset-steel-900"
        {...rest}
      />
      {label && <span className="text-sm text-gray-300">{label}</span>}
    </label>
  );
}
