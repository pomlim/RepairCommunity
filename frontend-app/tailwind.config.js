const { green } = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        md: '0px 0px 8px rgba(159, 134, 25, 0.2)'
      },
      fontFamily: {
        kanit: ['Kanit', 'sans-serif']
      }
    },
    colors: {
      brick: '#C16A29',
      sky: '#68A0D6',
      white: '#FFFFFF',
      brown: {
        default: '#443616',
        mid: '#835020',
        light: '#A29B8B'
      },
      green: {
        default: '#C3C130',
        disabled: '#CCCCB7',
        pressed: '#939125'
      },
      butter: {
        default: '#F9F3D9',
        light: '#FCFAED',
        pressed: '#F0E7A8',
        field: '#E4DDC6',
        dark: '#E9D372'
      }
    }
  }
  // plugins: [require('daisyui')],
  // daisyui: {
  //   themes: [
  //     {
  //       light: {
  //         ...require('daisyui/src/colors/themes')['[data-theme=retro]'],
  //         // Customize light theme here
  //         primary: '#C3C130',
  //         'primary-content': '#443616',
  //         'secondary-content': '#835020',
  //         'base-300': '#F9F3D9',
  //         'neutral-content': '#FCFAED'
  //       }
  //     }
  //   ]
  // }
};
