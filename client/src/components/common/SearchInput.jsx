/**
 * @fileoverview Debounced search input with clear button.
 */

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce.js';
import clsx from 'clsx';

/**
 * @param {object} props Component props.
 * @param {function} props.onSearch Called with debounced search string.
 * @param {string} [props.placeholder='Search...']
 * @param {number} [props.debounceMs=300]
 */
export default function SearchInput({
  onSearch,
  placeholder = 'Search...',
  debounceMs = 300,
  className,
}) {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, debounceMs);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className={clsx('relative', className)}>
      <Search
        size={18}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-steel-600 bg-steel-800 py-2 pl-10 pr-10 text-sm text-gray-100 placeholder-gray-500 focus:border-tata-blue focus:outline-none focus:ring-1 focus:ring-tata-blue"
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
