/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        merriweather: ['Poppins', 'serif'], // Add Merriweather as a font family
      },
      colors: {
        // primary: '#181C14', // Warna solid
          // primary: '#000000',
          primary: '#1F2937',
          secondary: '#1F2937',
          accent1: '#0EA5E9',
          accent2: '#A78BFA',
          text: '#D1D5DB',
          muted: '#9CA3AF',
          danger: '#F97316',
          success: '#10B981',
        tertier: '#3C3D37',
        // cardbg: '#1F2937',
      },
      backgroundImage: {
        gradasi: 'linear-gradient( 179.8deg,  rgba(255,255,255,1) 24.7%, rgba(230,229,229,1) 94.4% )', // Gradasi khusus
      },
    },
  },
  plugins: [],
};
