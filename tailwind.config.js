/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slime: {
          primary: '#50fa7b',
          secondary: '#45E066',
        }
      },
      animation: {
        'drip-1': 'drip 3s ease-in-out infinite',
        'drip-2': 'drip 4s ease-in-out infinite 1s',
        'drip-3': 'drip 5s ease-in-out infinite 2s',
      },
      keyframes: {
        drip: {
          '0%': { transform: 'translateY(-100%) scale(1)', opacity: 0 },
          '50%': { transform: 'translateY(50%) scale(1.1)', opacity: 1 },
          '100%': { transform: 'translateY(200%) scale(1)', opacity: 0 },
        }
      },
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    },
  },
  plugins: [],
}