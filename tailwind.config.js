/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2dd4bf', // Warna solid
      },
      backgroundImage: {
        gradasi: 'linear-gradient( 179.8deg,  rgba(255,255,255,1) 24.7%, rgba(230,229,229,1) 94.4% )', // Gradasi khusus
      },
    },
  },
  plugins: [],
};
