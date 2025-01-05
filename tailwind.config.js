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
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        'card-foreground': 'rgb(var(--card-foreground) / <alpha-value>)',
        popover: 'rgb(var(--popover) / <alpha-value>)',
        'popover-foreground': 'rgb(var(--popover-foreground) / <alpha-value>)',
        primary: 'rgb(var(--primary) / <alpha-value>)',
        'primary-foreground': 'rgb(var(--primary-foreground) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        'secondary-foreground': 'rgb(var(--secondary-foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--muted-foreground) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Chakra Petch', 'Space Grotesk', 'sans-serif'],
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
      }
    },
  },
  plugins: [],
}