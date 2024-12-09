import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        light: {
          primary: '#ffffff',
          secondary: '#f3f4f6',
          text: '#1f2937',
          accent: '#3b82f6',
        },
        // Dark theme colors
        dark: {
          primary: '#1f2937',
          secondary: '#374151',
          text: '#f3f4f6',
          accent: '#60a5fa',
        }
      }
    }
  },
  plugins: [],
};

export default config;