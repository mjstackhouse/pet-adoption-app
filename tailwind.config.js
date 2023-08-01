/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'blue': '#80DAE0',
      'pink': '#E096C3',
      'yellow': '#E0D069',
      'black': '#000000',
      'white': '#FFFFFF',
      'red': '#FC2634',
      'gray': '#EDEDED'
    },
    screens: {
      'xs': '410px'
    },
    extend: {
    },
  },
  plugins: [],
}