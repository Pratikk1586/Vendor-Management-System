/**
 * @fileoverview Centered overlay modal dialog.
 */

import { useEffect } from 'react';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { MODAL_SIZES } from '../../constants/ui.js';

/**
 * @param {object} props Component props.
 * @param {boolean} props.isOpen Whether modal is visible.
 * @param {function} props.onClose Close handler.
 * @param {string} [props.title]
 * @param {React.ReactNode} props.children Modal body.
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md']
 * @param {React.ReactNode} [props.footer] Optional footer slot.
 */
export default function Modal({ isOpen, onClose, title, children, size = 'md', footer }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        className={clsx(
          'relative z-10 w-full rounded-xl border border-steel-600 bg-steel-800 shadow-xl',
          MODAL_SIZES[size],
        )}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-steel-600 px-6 py-4">
            <h2 className="font-display text-xl tracking-wide text-white">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1 text-gray-400 hover:bg-steel-700 hover:text-white"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
        {footer && (
          <div className="flex justify-end gap-3 border-t border-steel-600 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
