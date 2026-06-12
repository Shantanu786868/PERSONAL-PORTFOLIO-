/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { 400: '#60a5fa', 500: '#3B82F6', 600: '#2563eb' },
        secondary: { 400: '#c084fc', 500: '#8B5CF6', 600: '#9333ea' },
        accent: { 400: '#22d3ee', 500: '#06B6D4', 600: '#0891b2' },
        dark: { 700: '#334155', 800: '#1e293b', 900: '#0F172A' }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        glow: { '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }, '100%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.8)' } },
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(59, 130, 246, 0.3)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.7)',
      },
    },
  },
  plugins: [],
}
