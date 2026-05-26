/**
 * @fileoverview Error state display with retry action.
 */

import { AlertCircle } from 'lucide-react';
import Button from './Button.jsx';

/**
 * @param {object} props Component props.
 * @param {string} [props.message='Something went wrong']
 * @param {function} [props.onRetry]
 */
export default function ErrorState({
  message = 'Something went wrong',
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <AlertCircle size={48} className="mb-4 text-red-400" strokeWidth={1.5} />
      <h3 className="font-display text-xl text-white">Error</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-400">{message}</p>
      {onRetry && (
        <Button variant="outline" className="mt-6" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
