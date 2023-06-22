/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1024px",
      lg: "1280px",
    },
    extend: {},
  },
  plugins: [],
};
