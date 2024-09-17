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
    'w-20',
    'text-15',
    'text-20',
    'text-25',
    'text-50',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}