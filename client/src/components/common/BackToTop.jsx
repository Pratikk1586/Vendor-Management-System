/**
 * @fileoverview Floating back-to-top button shown after scrolling.
 */

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const SCROLL_THRESHOLD = 300;

/**
 * Floating button that scrolls the window back to top.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-tata-blue text-white shadow-lg transition-transform hover:scale-105 hover:bg-tata-light"
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
