/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "accent": "rgb(var(--accent))",
        "accent-light": "rgb(var(--accent-light))",
        "accent-dark": "rgb(var(--accent-dark))",
      },
      fontFamily: {
        "dm": ["DM Sans", "sans-serif"],
        "noto": ["Noto Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}

