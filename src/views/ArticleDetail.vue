<template>
    <div class="mx-auto mt-36 px-52">
      <!-- Jika sedang memuat data -->
      <div v-if="isLoading">
        <p class="text-center text-blue-500 text-xl font-semibold">
          Memuat Berita...
        </p>
      </div>
  
      <!-- Jika data artikel ditemukan -->
      <div v-else-if="article" class="mb-5">

        <h1 class="text-4xl font-bold text-gray-800 mb-5 text-center">{{ article.title }}</h1>
        <img
          :src="article.image"
          alt="Article Image"
          class="w-full h-80 object-cover rounded-lg mb-5"
        />
        <h1 class="text-slate-950 text-3xl underline mb-3 mt-8">Description</h1>
        <p class="text-lg">{{ article.description }}</p>
        <p class="text-lg text-slate-800">{{ article.category.categoryName }}</p>
      </div>
  
      <!-- Jika data artikel tidak ditemukan -->
      <div v-else>
        <p class="text-center text-red-600 text-xl font-semibold">
          Article tidak ditemukan.
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
        article: null, // Untuk menyimpan data artikel
        isLoading: true, // Untuk status pemuatan data
      };
    },
    mounted() {
      this.fetchArticle(); // Panggil fungsi untuk mendapatkan data artikel
    },
    methods: {
      async fetchArticle() {
        try {
          const response = await axios.get(`https://apitiggerid.tri3a.com/api/Contents/${this.id}`);
          this.article = response.data; // Simpan data artikel dari API
        } catch (error) {
          console.error("Error fetching article:", error);
          this.article = null; // Set null jika terjadi error
        } finally {
          this.isLoading = false; // Set status pemuatan selesai
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  </style>
  