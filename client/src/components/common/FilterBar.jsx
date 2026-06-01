/**
 * @fileoverview Horizontal filter chips row with reset.
 */

import clsx from 'clsx';
import { RotateCcw } from 'lucide-react';
import Button from './Button.jsx';

/**
 * @param {object} props Component props.
 * @param {Array<{key: string, label: string, options: Array<{value: string, label: string}>}>} props.filters
 * @param {object} props.values Current filter values keyed by filter key.
 * @param {function} props.onChange Called with (key, value).
 * @param {function} [props.onReset] Resets all filters.
 */
export default function FilterBar({ filters, values = {}, onChange, onReset }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {filters.map((filter) => (
        <div key={filter.key} className="flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            {filter.label}
          </span>
          <div className="flex flex-wrap gap-1">
            {filter.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange(filter.key, opt.value)}
                className={clsx(
                  'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                  values[filter.key] === opt.value
                    ? 'bg-steel-700 text-gray-300 hover:text-white'
                    : 'bg-zinc-300 text-black hover:bg-steel-600 hover:text-white',
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ))}
      {onReset && (
        <Button className="bg-zinc-300 !text-black hover:bg-steel-600 hover:!text-white" variant="ghost" size="sm" icon={<RotateCcw size={14} />} onClick={onReset}>
          Reset
        </Button>
      )}
    </div>
  );
}
