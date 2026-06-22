/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Brand gradient stops
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        // Dark theme surfaces
        dark: {
          50:  '#f0f0f5',
          100: '#e0e0eb',
          800: '#0f0f1a',
          850: '#0a0a14',
          900: '#06060e',
          950: '#030308',
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #22d3ee 100%)',
        'gradient-brand-subtle': 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.15) 50%, rgba(34,211,238,0.15) 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'grid-dark': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgba(139,92,246,0.06)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
        'grid-light': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgba(99,102,241,0.07)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow': {
          '0%': { 'box-shadow': '0 0 20px rgba(139,92,246,0.3)' },
          '100%': { 'box-shadow': '0 0 40px rgba(34,211,238,0.3), 0 0 80px rgba(139,92,246,0.2)' },
        },
      },
      boxShadow: {
        'glow-violet': '0 0 30px rgba(139,92,246,0.3)',
        'glow-cyan': '0 0 30px rgba(34,211,238,0.3)',
        'glow-brand': '0 0 40px rgba(139,92,246,0.2), 0 0 80px rgba(34,211,238,0.1)',
        'glass': '0 8px 32px 0 rgba(0,0,0,0.37)',
        'glass-light': '0 8px 32px 0 rgba(0,0,0,0.1)',
        'card-dark': '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset',
        'card-light': '0 4px 24px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.8) inset',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
