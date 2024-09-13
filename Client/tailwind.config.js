/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "gradient-text": "gradient-text 3s ease infinite",
        bounce: "bounce 1s infinite",
      },
      keyframes: {
        "gradient-text": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(-10%)" },
          "50%": { transform: "translateY(0)" },
        },
      },
      colors: {
        "custom-yellow": "#FBBF24",
        "custom-red": "#EF4444",
        "custom-pink": "#EC4899",
      },
    },
  },
  plugins: [],
};
