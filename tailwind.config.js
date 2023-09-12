/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'blue': '#0061bd',
      'darker-blue': '#00305d',
      'lighter-blue': '#EBFEFF',
      'pink': '#E096C3',
      'yellow': '#FFE957',
      'darker-yellow': '#D9C64A',
      'black': '#000000',
      'white': '#FFFFFF',
      'red': '#FC2634',
      'gray': '#EDEDED',
      'darker-gray': '#D9D9D9',
      'green': '#25B31B',
      'purple': '#9C1165',
      'darker-purple': '#6B0B45'
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
  plugins: [
    require('tailwind-scrollbar')
  ],
}