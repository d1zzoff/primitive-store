import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      black: "#1F1F1F",
      grey: "#2A2A2A",
      "dark-grey": "#333333",
      light: "#fff",
      accent: "#3A5AFF",
      light_grey: "#7E7E7E",
      "light-grey": "#7E7E7E",
      red: "#ff002f",
      yellow: "#ffc700",
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
        "100%": { opacity: "0.6" },
      },
      modal: {
        "0%": { transform: "scale(0.5)", opacity: "0" },
        "100%": { transform: "scale(1)", opacity: "1" },
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
      modal: "modal 0.3s ease forwards",
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
