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
        customWhite: "#F1F8F2",
        customBlack: "#141414",
        customGrey: "#6D6D6D",
        customGreen: "#2ACB98",
        customLightGreen: "#8DFBD8",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        header1: "6rem",
        header2: "4rem",
        header3: "3rem",
        header4: "1.25rem",
        body: "1rem",
      },
    },
  },
  plugins: [],
};
export default config;
