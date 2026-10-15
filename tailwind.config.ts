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
        navy: {
          DEFAULT: "#001C71",
          deep: "#000F3D",
          dark: "#050B22",
          surface: "#0B1533",
          light: "#0E2A88",
          subtle: "#16265A",
        },
        orange: {
          DEFAULT: "#F36607",
          hover: "#D95500",
          light: "#FFF0E6",
          dark: "#B84800",
        },
        lime: {
          DEFAULT: "#4BB500",
          hover: "#409A00",
          light: "#EDF8E5",
          dark: "#2F7300",
        },
        cyan: {
          DEFAULT: "#008AD8",
          hover: "#0076B8",
          light: "#E1F2FC",
          glow: "rgba(0, 138, 216, 0.4)",
        },
        ink: {
          DEFAULT: "#0B1533",
          muted: "#48587C",
          faint: "#71809F",
          border: "#D9E0EF",
        }
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
        arabic: ["var(--font-noto-kufi)", "sans-serif"],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 138, 216, 0.35)',
        'glow-orange': '0 0 25px rgba(243, 102, 7, 0.4)',
        'glow-lime': '0 0 25px rgba(75, 181, 0, 0.35)',
        'card': '0 4px 20px -2px rgba(0, 28, 113, 0.08), 0 2px 6px -1px rgba(0, 28, 113, 0.04)',
        'card-hover': '0 12px 32px -4px rgba(0, 28, 113, 0.16), 0 4px 12px -2px rgba(0, 28, 113, 0.08)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
