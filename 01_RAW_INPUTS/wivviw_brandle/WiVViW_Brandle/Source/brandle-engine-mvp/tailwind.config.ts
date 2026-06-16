import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        genesis: "radial-gradient(circle at 50% 10%, rgba(255,255,255,0.95), rgba(255,247,238,0.75) 35%, rgba(244,241,255,0.75) 70%, rgba(235,235,245,0.95))",
      },
    },
  },
  plugins: [],
} satisfies Config;
