import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: "430px",
      md: "768px",
    },
    colors: {
      dark: "#000",
      black: "#1F1F1F",
      grey: "#2A2A2A",
      "dark-grey": "#333333",
      light: "#fff",
      accent: "#3A5AFF",
      "light-grey": "#7e7e7e",
      red: "#ff002f",
      yellow: "#FFD600",
      green: "#03ac00;",
    },
    keyframes: {
      slideIn: {
        "0%": { transform: "translateY(-10%)", opacity: "0" },
        "100%": { transform: "translateY(0%)", opacity: "100" },
      },
      slideOut: {
        "0%": { transform: "translateY(0%)", opacity: "1" },
        "100%": { transform: "translateY(-10%)", opacity: "0" },
      },
      background: {
        "0%": { opacity: "0" },
        "100%": { opacity: "0.7" },
      },
      backgroundClose: {
        "0%": { opacity: "0.7" },
        "100%": { opacity: "0" },
      },
      modal: {
        "0%": { transform: "scale(0.5)", opacity: "0" },
        "100%": { transform: "scale(1)", opacity: "1" },
      },
      modalClose: {
        "0%": { transform: "scale(1)", opacity: "1" },
        "100%": { transform: "scale(0.5)", opacity: "0" },
      },
      livetime: {
        "0%": { width: "100%" },
        "100%": { width: "0" },
      },
      pulse: {
        "0-100%": { opacity: "1" },
        "50%": { opacity: "0.5" },
      },
    },
    animation: {
      slideIn: "slideIn 0.3s ease forwards",
      slideOut: "slideOut 0.3s ease forwards",
      background: "background 0.3s forwards",
      backgroundClose: "backgroundClose 0.2s forwards",
      modal: "modal 0.3s ease forwards",
      modalClose: "modalClose 0.2s ease forwards",
      livetime: "livetime 3s ease forwards",
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
    extend: {
      boxShadow: {
        accent: "0 0 7px rgba(255, 87, 51, 0.2)",
        red: "0 0 7px rgba(255, 0, 47, 0.2)",
        green: "0 0 7px rgba(3, 172, 0, 0.2)",
        base: "0 0 20px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
