/** @type {import('tailwindcss').Config} */
export default module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",

    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  safelist: [
    "border-red-500",
    "bg-red-500",
    "border-yellow-500",
    "bg-yellow-500",
    "border-blue-500",
    "bg-blue-500",
    "border-palletPurple-400",
    "bg-palletPurple-400",
    // Add more classes as needed
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        darkPrimary: "#242933",
        darkSecondary: "#333a48",
        whitePrimary: "#f5f4f4",
        cancelRed: "#ed4343",
        palletGray: {
          100: "#D5DBED",
          200: "#ADB5CE",
          250: "#ACB5CE",
          300: "#737B95",
        },
        palletYellow: {
          200: "#E9D5AF",
          400: "#F4C05B",
          500: "#F1AD27",
          700: "#B8821B",
        },
        palletGreen: {
          200: "#92EBAB",
          300: "#67E289",
          600: "#23B24B",
          700: "#0E6F29",
          800: "#084D1B",
        },
        palletRed: {
          400: "#DA4F4F",
          500: "#DB3B3B",
          600: "#BC1D1D",
        },
        palletPurple: {
          200: "#B7B6EB",
          300: "#7B78EB",
          400: "#5955ED",
          500: "#3E3ADB",
          600: "#1D19B9",
          800: "#070475",
          900: "#02003D",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
