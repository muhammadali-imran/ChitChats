/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#f7d86e",
        "primary-light": "#fffef5",
        "primary-lighter": "#fef8e7",
        "primary-dark": "#e8c540",
        "primary-darker": "#d9b32d",
        "primary-darkest": "#b8950c",
        "primary-text": "#7a6d34",
        "primary-text-dark": "#3d372a",
      },
    },
  },
  plugins: [],
};
