/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'hove-gray': '#D2D2D2',
        'hove-gold': '#C5911F',
        'hove-gold-light': '#E0AD38',
        'hove-brown': '#2B2418',
        'hove-brown-light': '#4A3B2A',
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif'],
      },
    },
  },
  plugins: [],
};
