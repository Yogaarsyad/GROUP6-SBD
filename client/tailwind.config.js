/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          'background': '#121212',
          'primary': '#E0E0E0',
          'secondary': '#B0B0B0',
          'div': '#444444',
          'accent': '#888888'
        }
      },
      fontFamily: {
        spectral: ['Spectral', 'serif'],
        inter: ['Inter', 'sans-serif'],
        opensans: ['OpenSans', 'sans-serif']

      },
    },
    plugins: [],
  }
}
