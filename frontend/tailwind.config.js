/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        16: "repeat(auto-fill, minmax(240px, 1fr))",
      },
      boxShadow: {
        "3xl": "0px 0px 10px #00000015",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in forwards",
        slideUp: "slideUp 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
