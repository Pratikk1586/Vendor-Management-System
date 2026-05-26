/**
 * @fileoverview Animated shimmer skeleton placeholders.
 */

import clsx from 'clsx';

/** @type {Record<string, string>} Skeleton type layout classes. */
const SKELETON_TYPES = {
  card: 'h-32 rounded-xl',
  table: 'h-10 w-full rounded',
  text: 'h-4 w-full rounded',
  avatar: 'h-10 w-10 rounded-full',
};

/**
 * @param {object} props Component props.
 * @param {'card'|'table'|'text'|'avatar'} [props.type='text']
 * @param {number} [props.count=1]
 */
export default function SkeletonLoader({ type = 'text', count = 1 }) {
  return (
    <div className="space-y-2" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            'animate-pulse bg-gradient-to-r from-steel-700 via-steel-600 to-steel-700 bg-[length:200%_100%]',
            SKELETON_TYPES[type],
          )}
          style={{ animation: 'shimmer 1.5s ease-in-out infinite' }}
        />
      ))}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
