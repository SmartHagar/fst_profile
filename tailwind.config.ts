/** @format */

import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "sky-blue": "#87CEEB",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        merriweather: ["Merriweather", "sans-serif"],
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          // Warna Primary (biru tua)
          primary: "#061cc4",
          "primary-focus": "#0516a3",
          "primary-content": "#ffffff",

          // Warna Secondary (biru muda kontras)
          secondary: "#4fa8da",
          "secondary-focus": "#3d96c7",
          "secondary-content": "#ffffff",

          // Warna Accent (emas/kuning)
          accent: "#f59e0b",
          "accent-focus": "#d97706",
          "accent-content": "#ffffff",

          // Warna Neutral
          neutral: "#2a323c",
          "neutral-focus": "#242b33",
          "neutral-content": "#ffffff",

          // Warna Base/Background
          "base-100": "#ffffff",
          "base-200": "#f2f7ff",
          "base-300": "#e5f0ff",
          "base-content": "#1f2937",

          // Warna Semantik
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
          info: "#3b82f6",

          // Rounded corners
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",

          // Animation duration
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",

          // Border width
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
      },
      "light",
      "dark",
    ],
  },
};
export default config;
