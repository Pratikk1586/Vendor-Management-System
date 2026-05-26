/**
 * @fileoverview Dismissible top announcement banner for system messages.
 */

import { useState } from 'react';
import clsx from 'clsx';
import { X, Info, AlertTriangle, AlertCircle } from 'lucide-react';
import { BANNER_TYPES } from '../../constants/ui.js';

/** @type {Record<string, React.ComponentType>} Banner type icons. */
const BANNER_ICONS = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
};

/**
 * @param {object} props Component props.
 * @param {string} props.message Banner message text.
 * @param {'info'|'warning'|'error'} [props.type='info']
 */
export default function AnnouncementBanner({ message, type = 'info' }) {
  const [dismissed, setDismissed] = useState(false);
  const Icon = BANNER_ICONS[type] || Info;

  if (dismissed) return null;

  return (
    <div
      className={clsx(
        'flex items-center justify-between gap-4 border-b px-4 py-3',
        BANNER_TYPES[type],
      )}
      role="alert"
    >
      <div className="flex items-center gap-2 text-sm">
        <Icon size={18} className="shrink-0" />
        <span>{message}</span>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="shrink-0 rounded p-1 opacity-70 hover:opacity-100"
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
    </div>
  );
}
