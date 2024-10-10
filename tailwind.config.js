/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundColor: {
        themeBg: '#FF5200'
      },
      colors: {
        themeColor: '#FF5200'
      }
    },
  },
  plugins: [],
}

