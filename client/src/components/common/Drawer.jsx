/**
 * @fileoverview Right-side slide-in panel drawer.
 */

import { useEffect } from 'react';
import clsx from 'clsx';
import { X } from 'lucide-react';

/**
 * @param {object} props Component props.
 * @param {boolean} props.isOpen Whether drawer is visible.
 * @param {function} props.onClose Close handler.
 * @param {string} [props.title]
 * @param {React.ReactNode} props.children Drawer content.
 * @param {string} [props.width='24rem']
 */
export default function Drawer({ isOpen, onClose, title, children, width = '24rem' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-black/60 transition-opacity',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={clsx(
          'fixed right-0 top-0 z-50 flex h-full flex-col border-l border-steel-600 bg-steel-800 shadow-xl transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        style={{ width }}
      >
        <div className="flex items-center justify-between border-b border-steel-600 px-6 py-4">
          {title && <h2 className="font-display text-xl text-white">{title}</h2>}
          <button
            type="button"
            onClick={onClose}
            className="ml-auto rounded-lg p-1 text-gray-400 hover:bg-steel-700 hover:text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
      </div>
    </>
  );
}
