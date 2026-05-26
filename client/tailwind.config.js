/**
 * @fileoverview Tailwind CSS configuration with Tata Steel Colors brand theme extensions.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        steel: {
          900: '#0F1923',
          800: '#1A2635',
          700: '#243447',
          600: '#2E4057',
        },
        tata: {
          blue: '#003087',
          light: '#0050C8',
          gold: '#C8960C',
          amber: '#F59E0B',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
