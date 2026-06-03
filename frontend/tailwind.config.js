/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // map Tailwind color names to runtime CSS variables (set by theme.js)
        "primary": "var(--brand-pr, #f7d86e)",
        "primary-light": "var(--color-surface, #fffef5)",
        "primary-lighter": "var(--color-background, #fef8e7)",
        "primary-dark": "var(--color-accent, #e8c540)",
        "primary-darker": "var(--color-accent, #d9b32d)",
        "primary-darkest": "var(--color-accent, #b8950c)",
        "primary-text": "var(--color-text-secondary, #7a6d34)",
        "primary-text-dark": "var(--color-text-primary, #3d372a)",
      },
    },
  },
  plugins: [],
};
