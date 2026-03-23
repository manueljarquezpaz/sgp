import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        serif: ["var(--font-vidaloka)", "serif"],
      },
      animation: {
        // Adding the security monitor scanline
        scanline: "scanline 6s linear infinite",
        // Adding a subtle pulse for red alerts
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        scanline: {
          "0%": { top: "-10%" },
          "100%": { top: "110%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
