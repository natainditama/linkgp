/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
        '2xl': '5rem',
      },
    },
    fontSize: {
      ...defaultTheme.fontSize,
      'sm': ['1rem', '1.25rem'],
      'tiny': ['.875rem', '1.25rem'],
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ] 
}
