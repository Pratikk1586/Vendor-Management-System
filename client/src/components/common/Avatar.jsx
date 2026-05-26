/**
 * @fileoverview Circle avatar with image or initials fallback.
 */

import clsx from 'clsx';
import { AVATAR_SIZES } from '../../constants/ui.js';

/**
 * Derives initials from a full name.
 * @param {string} name Full name.
 * @returns {string}
 */
function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * @param {object} props Component props.
 * @param {string} [props.name]
 * @param {string} [props.src]
 * @param {'sm'|'md'|'lg'} [props.size='md']
 */
export default function Avatar({ name, src, size = 'md', className }) {
  return (
    <div
      className={clsx(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-tata-blue font-semibold text-white',
        AVATAR_SIZES[size],
        className,
      )}
      title={name}
    >
      {src ? (
        <img src={src} alt={name || 'Avatar'} className="h-full w-full object-cover" />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}
