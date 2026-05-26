/**
 * @fileoverview UI component variant and size class constants for the design system.
 */

/** @type {Record<string, string>} Button variant Tailwind classes. */
export const BUTTON_VARIANTS = {
  primary: 'bg-tata-blue hover:bg-tata-light text-white border-transparent',
  secondary: 'bg-steel-700 hover:bg-steel-600 text-white border-transparent',
  danger: 'bg-red-600 hover:bg-red-700 text-white border-transparent',
  ghost: 'bg-transparent hover:bg-steel-700 text-gray-200 border-transparent',
  outline: 'bg-transparent border-tata-blue text-tata-light hover:bg-tata-blue/10',
};

/** @type {Record<string, string>} Button size Tailwind classes. */
export const BUTTON_SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

/** @type {Record<string, string>} Modal size classes. */
export const MODAL_SIZES = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

/** @type {Record<string, string>} Spinner size classes. */
export const SPINNER_SIZES = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

/** @type {Record<string, string>} Avatar size classes. */
export const AVATAR_SIZES = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
};

/** @type {Record<string, string>} Announcement banner type classes. */
export const BANNER_TYPES = {
  info: 'bg-tata-blue/20 border-tata-blue text-tata-light',
  warning: 'bg-tata-amber/20 border-tata-amber text-tata-amber',
  error: 'bg-red-900/30 border-red-500 text-red-300',
};
