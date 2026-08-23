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
        serif: ["'Playfair Display'", 'Playfair Display', 'Georgia', 'serif'],
        mono: ["'JetBrains Mono'", 'JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          gold: '#b8860b',
          'gold-light': '#d4af37',
        },
        dark: {
          50:  '#f0f0f5',
          100: '#e0e0eb',
          800: '#0f0f1a',
          850: '#0a0a14',
          900: '#080808',
          950: '#050505',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
