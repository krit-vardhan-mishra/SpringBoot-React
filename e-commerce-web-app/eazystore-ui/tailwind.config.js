/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Josefin Sans", "sans-serif"]
      },
      colors: {
        primary: '#5B21B6',
        dark: '#4C1D95',
        lighter: '#F5F3FF',
        light: '#DDD6FE',
        normalbg: '#F0F3F2',
        darkbg: '#0E1520',
      }
    },
  },
  plugins: [require("tailwind-react-glow")],
}