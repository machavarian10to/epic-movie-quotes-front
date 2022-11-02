/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        golden: "#DDCCAA",
        "light-gray": "#D9D9D9",
        "button-basic": "#E31221",
        "button-hover": "#CC0E10",
        "button-active": "#B80D0F",
        "modal-bg": "#222030",
        "modal-text": "#6C757D",
        "modal-link": "#0D6EFD",
        "input-bg": "#CED4DA",
        "black-rgba": "rgba(0, 0, 0, 0.54)",
      },
      fontFamily: {
        helvetica: ["Helvetica", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "test-image": "url('@/assets/test.jpg')",
      },
    },
  },
  plugins: [],
};
