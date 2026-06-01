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
          900: '#082f49', // sky-950 viewport background
          800: '#ffffff', // white panel card containers
          700: '#031b2e', // sky-1000 dark sidebar background
          600: '#0c4a6e', // sky-900 hover state
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
