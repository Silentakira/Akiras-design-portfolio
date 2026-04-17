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
        bg: "#F5F2EC",
        ink: "#0D0D0D",
        lime: "#CAFF00",
        muted: "#888888",
        ghost: "#555555",
        black: "#0D0D0D",
      },
      fontFamily: {
        bebas: ["var(--font-bebas)"],
        dm: ["var(--font-dm-mono)"],
        playfair: ["var(--font-playfair)"],
      },
    },
  },
  plugins: [],
};

export default config;
