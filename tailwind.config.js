/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          250: '#D3F9D8',
          850: '#008644',
        },
        gray: {
          450: 'background: #343A40',
        }
      }
    },
  },
  plugins: [],
}

