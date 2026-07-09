import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1600px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        wine: "#7A0024",
        wineDark: "#4B0017",
        orange: "#F36A21",
        peach: "#FFF0E8",
        cream: "#FFF9F4"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(122, 0, 36, 0.12)",
        glow: "0 20px 70px rgba(243, 106, 33, 0.18)"
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at 20% 20%, rgba(243,106,33,.22), transparent 34%), radial-gradient(circle at 80% 10%, rgba(122,0,36,.18), transparent 32%), linear-gradient(135deg, #fffaf6 0%, #fff0e8 50%, #ffffff 100%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        },
        shine: {
          "0%": { transform: "translateX(120%)" },
          "100%": { transform: "translateX(-120%)" }
        }
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        shine: "shine 3s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
