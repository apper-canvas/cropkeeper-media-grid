/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#228B22',
          light: '#32CD32',
          dark: '#006400'
        },
        secondary: {
          DEFAULT: '#8B4513',
          light: '#CD853F',
          dark: '#654321'
        },
        accent: '#FFD700',
        harvest: '#FFD700',
        growth: '#27AE60',
        warning: '#F39C12',
        error: '#E74C3C',
        surface: {
          50: '#FAFAF8',
          100: '#F5F5F3',
          200: '#EEEEEC',
          300: '#E0E0DE',
          400: '#C4C4C2',
          500: '#A8A8A6',
          600: '#8C8C8A',
          700: '#6F6F6D',
          800: '#4A4A48',
          900: '#2D3436'
        }
      },
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
        heading: ['Roboto', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'farm': '0 2px 8px rgba(0,0,0,0.1)',
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem'
      },
      backgroundImage: {
        'earth-gradient': 'linear-gradient(135deg, #228B22 0%, #27AE60 100%)',
        'field-pattern': 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23228B22" fill-opacity="0.03"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
      }
    }
  },
  plugins: [],
  darkMode: 'class',
}