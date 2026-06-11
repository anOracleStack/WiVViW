/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glass: "0 0 0 1px rgba(255,255,255,0.08), 0 8px 30px rgba(0,0,0,0.45)",
      },
      backdropBlur: { glass: "18px" }
    },
  },
  plugins: [],
}
