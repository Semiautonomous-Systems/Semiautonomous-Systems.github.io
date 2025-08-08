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
        // Match global.css design tokens
        bg: '#0a0e14',
        'bg-elevated': '#0f1419',
        surface: '#0f1419',
        accent: '#b72115',         // Red - matches global.css
        'accent-hover': '#d42a1a',
        safe: '#2dd4bf',           // Teal - matches global.css
        text: '#e5e7eb',
        'text-muted': '#94a3b8',
        border: 'rgba(255, 255, 255, 0.06)'
      },
      fontFamily: {
        // Match global.css fonts
        sans: ['Red Hat Display', 'system-ui', 'sans-serif'],
        display: ['Red Hat Display', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        card: '0 4px 24px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.4)',
        glow: '0 0 24px rgba(183, 33, 21, 0.3)'
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px'
      }
    }
  },
  plugins: []
};
