/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-outfit)', 'Outfit', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', "'JetBrains Mono'", 'JetBrains Mono', 'monospace'],
        outfit: ['var(--font-outfit)', 'Outfit', 'sans-serif'],
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
