/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          900: '#0f0f1a',
          800: '#1a1a2e',
          700: '#1e293b',
          600: '#334155',
        },
        accent: {
          DEFAULT: '#f97316',
          light: '#fb923c',
          warm: '#fbbf24',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      }
    }
  },
  plugins: []
}
