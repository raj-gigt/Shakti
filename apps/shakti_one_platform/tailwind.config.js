/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        primary: colors.cyan,
      },
    },
  },
  plugins: [flowbite.plugin()],
  safelist: [
    "bg-cyan-600",
    "hover:bg-cyan-700",
    "focus:ring-cyan-300",
    "dark:bg-cyan-600",
    "dark:hover:bg-cyan-700",
    "dark:focus:ring-cyan-800",
  ],
};
