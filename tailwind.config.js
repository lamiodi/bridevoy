/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        body: ['Raleway', 'sans-serif'],
      },
      colors: {
        'brand-accent': '#f9ffd6',
        'primary-black': '#171717',
        'primary-white': '#FCFCFC',
      },
    },
  },
  plugins: [],
}
