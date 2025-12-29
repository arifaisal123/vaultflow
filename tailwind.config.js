/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slideUp': 'slideUp 0.5s ease-out',
        'fadeIn': 'fadeIn 0.4s ease-out',
      },
    },
  },
  plugins: [],
}