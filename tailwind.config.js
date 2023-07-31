/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#222',
        foreground: '#A2A2',
        btn: {
          background: '#FFF',
          'background-hover': '#BBB',
        },
      },
    },
  },
  plugins: [],
}
