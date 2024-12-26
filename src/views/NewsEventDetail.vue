<template>
    <div class="mx-auto lg:mt-[68px] lg:px-20 bg-primary">
      <!-- Jika sedang memuat data -->
      <div v-if="isLoading">
        <p class="text-center text-blue-500 text-xl font-semibold">
          Memuat Berita...
        </p>
      </div>
  
      <!-- Jika data artikel ditemukan -->
      <div v-else-if="newsAndEvents" class="mb-5">
      <div class="bg-white">
        <h1 class="text-4xl font-bold text-primary bg-white mb-5 text-center pt-10">{{ newsAndEvents.title }}</h1>
      </div>
      <img
      :src="newsAndEvents.image"
      alt="newsAndEvents Image"
      class="w-3/4 object-cover mb-5 mx-auto"
      />
      <div class="mx-5">
        <div class="bg-white mt-1">
        <h1 class="text-slate-950 text-3xl underline mb-3 mt-8">Description</h1>
        <p class="text-lg" v-html="newsAndEvents.description"></p>
        <p class="text-lg text-slate-800">{{ newsAndEvents.category.categoryName }}</p>
      </div>
    </div>
  </div>
      <!-- Jika data artikel tidak ditemukan -->
      <div v-else>
        <p class="text-center text-red-600 text-xl font-semibold">
          Berita tidak ditemukan.
        </p>
      </div>
    </div>
    
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        newsAndEvents: null, // Untuk menyimpan data artikel
        isLoading: true, // Untuk status pemuatan data
      };
    },
    mounted() {
      this.fetchnewsAndEvents(); // Panggil fungsi untuk mendapatkan data artikel
    },
    methods: {
      async fetchnewsAndEvents() {
        try {
          const response = await axios.get(`https://apitiggerid.tri3a.com/api/Contents/${this.id}`);
          this.newsAndEvents = response.data; // Simpan data artikel dari API
        } catch (error) {
          console.error("Error fetching newsAndEvents:", error);
          this.newsAndEvents = null; // Set null jika terjadi error
        } finally {
          this.isLoading = false; // Set status pemuatan selesai
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Tambahkan styling tambahan jika diperlukan */
  .container {
    max-width: 800px;
  }
  </style>
  