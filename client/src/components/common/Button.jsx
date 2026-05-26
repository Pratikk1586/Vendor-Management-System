/**
 * @fileoverview Primary action button with variant and loading states.
 */

import clsx from 'clsx';
import { BUTTON_VARIANTS, BUTTON_SIZES } from '../../constants/ui.js';
import Spinner from './Spinner.jsx';

/**
 * @param {object} props Component props.
 * @param {'primary'|'secondary'|'danger'|'ghost'|'outline'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.loading=false]
 * @param {boolean} [props.disabled=false]
 * @param {function} [props.onClick]
 * @param {'button'|'submit'|'reset'} [props.type='button']
 * @param {boolean} [props.fullWidth=false]
 * @param {React.ReactNode} [props.icon]
 * @param {React.ReactNode} props.children Button label.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  fullWidth = false,
  icon,
  children,
  className,
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg border font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-tata-light focus:ring-offset-2 focus:ring-offset-steel-900',
        'disabled:cursor-not-allowed disabled:opacity-50',
        BUTTON_VARIANTS[variant],
        BUTTON_SIZES[size],
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {loading ? <Spinner size="sm" /> : icon}
      {children}
    </button>
  );
}
