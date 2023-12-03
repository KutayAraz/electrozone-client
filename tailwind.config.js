/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1024px",
      lg: "1280px",
      xl: "1452px",
    },
    extend: {
      colors: {
        "theme-blue": "#13193F",
        "theme-orange": "#febd69",
        "theme-purple": "#A34393",
      },
      spacing: {
        1: "1px",
      },
      borderWidth: {
        1: "1px",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
