module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: "#FF0000",
        secondary: "#00FF00",
      },
      fontFamily: {
        poppin: ["var(--font-Poppins)", "sans-serif"], // Custom font family (ensure CSS var is defined)
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
