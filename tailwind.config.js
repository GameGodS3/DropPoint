/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./static/*.html",
    "./renderer/*.js",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("preline/plugin")],
  darkMode: "class",
};
