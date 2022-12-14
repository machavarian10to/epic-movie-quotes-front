/** @type {import('tailwindcss').Config}ced */
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
        "user-header": "#24222f",
        "border-color": "rgba(239, 239, 239, 0.3)",
        "quote-color": "#11101A",
        "movie-name": "#DDCCAA",
        "mobile-search": "#12101A",
        "file-input": "rgba(151, 71, 255, 0.4)",
        "verified-email": "rgba(25, 135, 84, 0.2)",
        "verified-border": "#198754",
        "notverified-email": "rgba(236, 149, 36, 0.2);",
        "notverified-border": "#EC9524",
        "notification-border": "rgba(108, 117, 125, 0.5)",
      },
      fontFamily: {
        helvetica: ["Helvetica", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "first-image": "url('@/assets/first.png')",
        "second-image": "url('@/assets/second.png')",
        "third-image": "url('@/assets/third.png')",
        gandalf: "url('@/assets/gandalf.png')",
      },
    },
  },
  plugins: [],
};
