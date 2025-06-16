// tailwind.config.js
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
// tailwind.config.js
theme: {
  // tailwind.config.js
theme: {
  container: {
   
    center: true, // bu mx-auto ni avtomatik qo‘shadi
    padding: "1rem", // bu ichki padding
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1420px",
    },
  },
}

},


    extend: {
      fontFamily: {
        rubik: ['var(--font-rubik)', 'sans-serif'],
      },
    },
  },
  
  plugins: [],
};
