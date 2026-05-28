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
          900: '#f8fafc', // slate-50 background
          800: '#ffffff', // white panels
          700: '#082f49', // sky-950 sidebar background
          600: '#0c4a6e', // sky-900 sidebar hovers & borders
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
