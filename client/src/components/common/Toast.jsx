/**
 * @fileoverview Global toast notification provider with steel theme styling.
 */

import { Toaster } from 'react-hot-toast';

/**
 * Renders the react-hot-toast Toaster with Tata Steel Colors theme.
 */
export default function Toast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1A2635',
          color: '#F3F4F6',
          border: '1px solid #2E4057',
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '14px',
        },
        success: {
          iconTheme: { primary: '#0050C8', secondary: '#F3F4F6' },
        },
        error: {
          iconTheme: { primary: '#EF4444', secondary: '#F3F4F6' },
        },
      }}
    />
  );
}
