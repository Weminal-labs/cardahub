import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          // Background colors
          bg: {
            primary: '#0f172a',    // slate-900
            secondary: '#1e293b',  // slate-800
            tertiary: '#334155',   // slate-700
          },
          // Text colors
          text: {
            primary: '#e2e8f0',    // slate-200
            secondary: '#cbd5e1',  // slate-300
            tertiary: '#94a3b8',   // slate-400
            muted: '#64748b',      // slate-500
          },
          // Border colors
          border: {
            DEFAULT: '#475569',    // slate-600
            light: '#334155',      // slate-700
          },
          // Accent colors
          accent: {
            cyan: {
              light: '#22d3ee',    // cyan-400
              DEFAULT: '#06b6d4',  // cyan-500
              dark: '#0891b2',     // cyan-600
            },
            indigo: {
              light: '#818cf8',    // indigo-400
              DEFAULT: '#6366f1',  // indigo-500
              dark: '#4f46e5',     // indigo-600
            }
          },
        }
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))',
        'cyber-gradient-hover': 'linear-gradient(to bottom right, var(--tw-gradient-from-hover), var(--tw-gradient-to-hover))',
      },
    },
  },
  plugins: [],
};

export default config;