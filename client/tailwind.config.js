module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        light: "var(--color-light)",
        primary: "var(--color-primary)",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
