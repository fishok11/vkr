/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      height: {
        '5/100': '5vh',
        '95/100': '95vh',
      },
      keyframes: {
        showSideBar: {
          from: { left: -256 },
          to: { left: 0 },
        },
        hideSideBar: {
          from: { left: 0 },
          to: { left: -256 },
        },
      },
      animation: {
        showSideBar: 'showSideBar 0.2s linear',
        hideSideBar: 'hideSideBar 0.2s linear',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

