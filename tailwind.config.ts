import { type Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // By default, Tailwind includes grid-template-column utilities for creating basic grids with up to 12 equal width columns
      // You can customize these values by editing theme.gridTemplateColumns or
      // theme.extend.gridTemplateColumns in your tailwind.config.js file
      gridTemplateColumns: {
        skeleton: "repeat(auto-fit, minmax(240px, 1fr))",
      },
    },
  },
  plugins: [
    // ...
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
} satisfies Config;
