/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(220, 98%, 61%)",
        GradientFrom: "hsl(192, 100%, 67%)",
        GradientTo: "hsl(280, 87%, 65%)",
        //light theme
        Gray1: "hsl(0, 0%, 98%)",
        Gray2: "hsl(236, 33%, 92%)",
        Gray3: "hsl(233, 11%, 84%)",
        Gray4: "hsl(236, 9%, 61%)",
        Gray5: "hsl(235, 19%, 35%)",

        //darktheme

        DGray1: "hsl(236, 33%, 92%)", //(hover)
        DGray2: "hsl(234, 39%, 85%)",
        DGray3: "hsl(234, 11%, 52%)",
        DGray4: "hsl(233, 14%, 35%)",
        DGray5: "hsl(237, 14%, 26%)",
        DGray6: "hsl(235, 24%, 19%)",
        DGray7: "hsl(235, 21%, 11%)",
      },

      fontFamily: {
        JosefinSans: "Josefin Sans, sans-serif",
      },
    },
  },
  plugins: [],
};
