/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        grey: {
          light: "#BDBDBD",
          DEFAULT: "#8E8E8E",
          dark: "#444444",
        },
      },
      spacing: {
        68 : "17rem",
        76 : "19rem",
        88 : "22rem",
        100 : "25rem",
        104 : "26rem",
        116 : "29rem",
        124 : "31rem",
        128: "32rem",
        132 : "33rem",
        136 : "34rem",
        140 : "35rem",
        144: "36rem",
        164: "41rem",
        184: "46rem",
        180: "45rem",
        200: "50rem",
        "3/10" : "30%",
        "4/10" : "40%",
        "6/10" : "60%",
        "7/10" : "70%",
        "45vh" : "45vh",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      fontSize:{
        "7.5xl": "5.5rem"
      },

      // zIndex: {
      //     "-1": "-1",
      //     "-2": "-2",
      //     "-3": "-3",
      //     "-0": "0",
      //     1: "1",
      //     2: "2",
      //     3: "3",
      // },
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1920px",
    },
    container: {
      center: true,
      padding: "1rem",
    },
  },
  plugins: [],
}

