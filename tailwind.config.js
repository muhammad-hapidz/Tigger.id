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
        primary: '#1F2937', // Warna solid utama (gelap, netral)
        secondary: '#111827', // Warna yang lebih gelap dari primary untuk elemen pendukung
        accent1: '#0EA5E9', // Biru terang untuk elemen aksen utama (CTA, link, dll.)
        accent2: '#6366F1', // Ungu lembut untuk aksen tambahan
        accent3: '#FACC15', // Kuning cerah sebagai warna aksen opsional
        text: '#E5E7EB', // Warna teks utama (kontras dengan primary dan secondary)
        muted: '#9CA3AF', // Warna teks untuk elemen kurang penting
        danger: '#EF4444', // Merah terang untuk elemen peringatan atau error
        success: '#10B981', // Hijau terang untuk elemen status sukses
        tertier: '#374151', // Warna abu-abu gelap tambahan untuk latar belakang
        cardbg: '#1E293B',
      },
      backgroundImage: {
        gradasi: 'linear-gradient( 179.8deg,  rgba(255,255,255,1) 24.7%, rgba(230,229,229,1) 94.4% )', // Gradasi khusus
      },
    },
  },
  plugins: [],
};
