/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['system-ui', 'sans-serif'],
        body: ['system-ui', 'sans-serif'],
      },
      colors: {
        background: '#020617', // slate-950-ish
        surface: '#020617',
        accent: '#22c55e', // green-500
      },
    },
  },
  plugins: [],
}

