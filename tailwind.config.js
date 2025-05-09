/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: "370px",
        xs: "480px",
      },
      colors: {
        background: "#2B2827",
        foreground: "#FFFFFF",
        primary: "#FF731D",
        "primary-foreground": "#FFFFFF",
        secondary: "#FEE09B",
        "secondary-foreground": "#2B2827",
        accent: "#FE4152",
        "accent-foreground": "#FFFFFF",
        muted: "#4A4441", // Or a derivative of #FEE09B
        "muted-foreground": "#FFFFFF", // Adjust if muted changes
        destructive: "#FE4152",
        "destructive-foreground": "#FFFFFF",
        border: "#3C3534",
        input: "#3C3534", // Or related to card/background
        ring: "#FE4152",
        // card and card-foreground will be handled by shadcn/ui CSS variables
      },
    },
  },
  plugins: [],
};
