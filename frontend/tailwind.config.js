/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Reddit: ["Reddit Mono", "Poppins"],
      },
    },
  },
  daisyui: {
    themes: [
      "light",
      "cupcake",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "forest",
      "coffee",
    ],
  },
  plugins: [require("daisyui")],
};
