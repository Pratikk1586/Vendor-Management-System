/**
 * @fileoverview Tag input for multiple text values.
 */

import { useState } from 'react';
import clsx from 'clsx';
import { X } from 'lucide-react';

/**
 * @param {object} props Component props.
 * @param {string[]} props.values Current tag values.
 * @param {function} props.onChange Called with updated values array.
 * @param {string} [props.placeholder='Add tag...']
 * @param {number} [props.maxTags=10]
 */
export default function Tag({ values = [], onChange, placeholder = 'Add tag...', maxTags = 10 }) {
  const [input, setInput] = useState('');

  const addTag = (raw) => {
    const tag = raw.trim();
    if (!tag || values.includes(tag) || values.length >= maxTags) return;
    onChange([...values, tag]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && values.length) {
      onChange(values.slice(0, -1));
    }
  };

  const removeTag = (tag) => {
    onChange(values.filter((v) => v !== tag));
  };

  return (
    <div
      className={clsx(
        'flex min-h-[42px] flex-wrap gap-2 rounded-lg border border-steel-600 bg-steel-800 px-3 py-2',
        'focus-within:border-tata-blue focus-within:ring-1 focus-within:ring-tata-blue',
      )}
    >
      {values.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-md bg-tata-blue/20 px-2 py-0.5 text-sm text-tata-light"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="hover:text-white"
            aria-label={`Remove ${tag}`}
          >
            <X size={12} />
          </button>
        </span>
      ))}
      {values.length < maxTags && (
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(input)}
          placeholder={placeholder}
          className="min-w-[120px] flex-1 bg-transparent text-sm text-gray-100 placeholder-gray-500 outline-none"
        />
      )}
    </div>
  );
}
