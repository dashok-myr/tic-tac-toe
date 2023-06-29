/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-green": "#1a2a33",
        "light-green": "#1f3641",
        "bright-blue": "#31c3bd",
        "bright-blue2": "#65e9e4",
        "bright-yellow": "#f2b137",
        "bright-yellow2": "#ffc860",
        silver: "#a8bfc9",
        "light-silver": "#dbe8ed",
      },
    },
  },
  plugins: [],
};
