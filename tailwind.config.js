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
      'darker-blue': '#4ECBD4',
      'pink': '#E096C3',
      'yellow': '#E0D069',
      'black': '#000000',
      'white': '#FFFFFF',
      'red': '#FC2634',
      'gray': '#EDEDED',
      'darker-gray': '#D9D9D9'
    },
    screens: {
      'xs': '410px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px'
    },
    extend: {
      backgroundImage: {
        'adoption-img': 'url("./public/adoption-img-1.jpg")'
      }
    },
  },
  plugins: [],
}