const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
    },
  },

  daisyui: {
    themes: [
      {
        dicko: {
          primary: "#e7dbd4",
          secondary: "#5b5f6b",
          accent: "#1fb2A6",
          neutral: "#251e23",
          "base-100": "#f5f6f8",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
        dicky: {
          primary: "#251e23",
          secondary: "#5b5f6b",
          accent: "#1fb2A6",
          neutral: "#e7dbd4",
          "base-100": "#f5f6f8",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};
