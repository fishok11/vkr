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
          from: { left: -256, opacity: 0 },
          to: { left: 0, opacity: 1 },
        },
        hideSideBar: {
          from: { left: 0, opacity: 1 },
          to: { left: -256, opacity: 0 },
        },
      },
      animation: {
        showSideBar: 'showSideBar 0.2s ease-in-out',
        hideSideBar: 'hideSideBar 0.2s ease-in-out',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
