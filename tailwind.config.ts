import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f7ff",
          100: "#e6efff",
          200: "#c2d7ff",
          300: "#9bbdff",
          400: "#6f9dff",
          500: "#3e74ff",
          600: "#2556d6",
          700: "#1c43a6",
          800: "#173983",
          900: "#132f68",
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
