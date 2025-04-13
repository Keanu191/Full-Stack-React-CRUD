/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#1D4ED8', // Blue
        secondary: '#9333EA', // Purple
        accent: '#F59E0B', // Amber
      },
    },
  },
  plugins: [],
}