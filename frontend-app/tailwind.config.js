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
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=retro]'],
          // Customize light theme here
          primary: '#C3C130',
          'primary-content': '#443616',
          'base-300': '#F9F3D9',
          'neutral-content': '#FCFAED'
        }
      }
    ]
  }
};
