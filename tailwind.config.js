/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grey: {
          100: "#F5F5F7",
          200: "#EBEEFC",
          300: "#F1F1F3",
          400: "#FDFDFD",
          500: "#E8E8E8",
          600: "#EDF1FD",
          700: "#979797",
          800: "#B1B1B8",
        },
        "custom-blue": "rgba(46, 91, 255, 0.08)",
        "custom-black": "rgba(29, 29, 31, 1)",
        black: {
          default: "#28293D",
          100: "#1D1D1F",
          200: "#7A7A9D",
          300: "#2E384D",
          400: "#B2B7C1",
        },
        blue: {
          100: "#E0E7FF",
          200: "#2E5BFF",
          300: "#3366FF",
          400: "#85A3FF",
          500: "#3365FC",
        },
        green: {
          100: "#00AE69",
        },
        pink: {
          100: "#DDE3FB",
        },
      },
      lineHeight: {
        3.5: "14px",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};
