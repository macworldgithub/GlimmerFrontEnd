import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",  // ✅ include Next.js App Router
    "./src/**/*.{js,ts,jsx,tsx,mdx}",  // ✅ include components
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        popIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.8s ease-out forwards",
        slideInLeft: "slideInLeft 0.8s ease-out forwards",
        popIn: "popIn 0.6s ease-out forwards",
      },
    },
  },
  plugins: [daisyui, require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#ffc759",
          "primary-content": "#ebe9f7",
          secondary: "#73449d",
          "secondary-content": "#ebe9f7",
          accent: "#f87171",
          "accent-content": "#ebe9f7",
          neutral: "#0d0809",
          "neutral-content": "#c8c6c6",
          "base-100": "#ffffff",
          "base-200": "#F4F4F4",
          "base-300": "#e7e7e7",
          "base-content": "#141316",
          info: "#00ccff",
          success: "#49c55e",
          warning: "#d37600",
          error: "#d8112c",
        },
      },
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    logs: false,
    themeRoot: ":root",
  },
};

export default config;
