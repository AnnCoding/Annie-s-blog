import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          deep: "#1e3a5f",
          medium: "#3b6b9a",
          light: "#e8f4f8",
        },
        sakura: {
          pink: "#f8b3c6",
          light: "#fff0f5",
          coral: "#ff7a93",
        },
        text: {
          primary: "#2d3748",
          secondary: "#718096",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
