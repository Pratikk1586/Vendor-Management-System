/**
 * @fileoverview Empty state placeholder with optional call-to-action.
 */

import { Inbox } from 'lucide-react';
import Button from './Button.jsx';

/**
 * @param {object} props Component props.
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {React.ReactNode} [props.icon]
 * @param {string} [props.actionLabel]
 * @param {function} [props.onAction]
 */
export default function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 text-steel-600">
        {icon || <Inbox size={48} strokeWidth={1.5} />}
      </div>
      <h3 className="font-display text-xl tracking-wide text-white">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-gray-400">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button variant="primary" className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
