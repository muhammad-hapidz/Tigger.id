<template>
    <button
      v-if="showToTopButton"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 p-1 rounded-lg shadow-lg bg-slate-200 transition-all duration-300 text-white hover:scale-110"
    >
    <svg class="h-8 w-8 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="10" />  <polyline points="16 12 12 8 8 12" />  <line x1="12" y1="16" x2="12" y2="8" /></svg>
    </button>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showToTopButton: false, // Mengontrol tampilan tombol
      };
    },
    methods: {
      scrollToTop() {
        // Scroll ke atas dengan efek halus
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      },
      handleScroll() {
        // Tampilkan tombol hanya jika pengguna telah scroll ke bawah
        this.showToTopButton = window.scrollY > 200;
      },
    },
    mounted() {
      // Tambahkan event listener untuk mendeteksi scroll
      window.addEventListener("scroll", this.handleScroll);
    },
    beforeUnmount() {
      // Hapus event listener saat komponen di-unmount
      window.removeEventListener("scroll", this.handleScroll);
    },
  };
  </script>
  
  <style scoped>
  /* Tambahkan styling tambahan jika diperlukan */
  </style>
  