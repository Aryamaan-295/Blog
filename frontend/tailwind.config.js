/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,tsx,jsx}",
  ],
  safelist: [
    'w-6',
    'w-8',
    'w-10',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}