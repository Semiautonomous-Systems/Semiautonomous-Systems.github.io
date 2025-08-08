/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.astro',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        bg: '#0b0f14',
        surface: '#0d131b',
        accent: '#7c3aed',
        accent2: '#22d3ee',
        neon: '#22c55e'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glass: '0 1px 2px rgba(0,0,0,0.3), 0 6px 20px rgba(0,0,0,0.25)'
      }
    }
  },
  plugins: []
};
