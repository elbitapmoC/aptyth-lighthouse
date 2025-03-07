import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-light": "#ffffff",
        "foreground-light": "#171717",
        "background-dark": "#0a0a0a",
        "foreground-dark": "#ededed",
        "primary-color": "#1e3a8a",
        "secondary-color": "#64748b",
        "accent-color": "#f59e0b",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-mono)", "'Courier New'", "Courier", "monospace"],
      },
      fontSize: {
        heading: "1.5rem",
        body: "1rem",
        small: "0.875rem",
      },
      lineHeight: {
        heading: "1.25",
        body: "1.5",
      },
    },
  },
  plugins: [],
} satisfies Config;
