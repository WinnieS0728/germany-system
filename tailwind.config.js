/** @type {import('tailwindcss').Config} */

import flagger from "tailwind-flagger";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [flagger],
};
