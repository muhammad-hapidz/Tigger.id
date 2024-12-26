<template>
  <div class="mx-auto bg-gray-200 mt-16 text-white min-h-screen py-10">
    <!-- Jika sedang memuat data -->
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
      <p class="text-blue-500 text-2xl font-semibold animate-pulse">
        Memuat Berita...
      </p>
    </div>

    <!-- Jika data artikel ditemukan -->
    <div v-else-if="article" class="pb-10">
      <!-- Header Artikel -->
      <div class="bg-white text-accent1 py-4 px-5 rounded-r-sm lg:w-2/5 shadow-lg mb-10">
        <h1 class="text-3xl lg:text-3xl font-bold uppercase">
          {{ article.title }}
        </h1>
      </div>

      <!-- Konten Utama -->
      <div class="flex flex-col lg:flex-row lg:mx-10 rounded-sm gap-10 items-center lg:items-start bg-white shadow-lg p-6 lg:p-10">
        <!-- Gambar -->
        <div class="w-full lg:w-1/2">
          <img
            :src="article.image"
            alt="Article Image"
            class="w-full max-h-96 object-cover rounded shadow-md"
          />
          <div class="pt-4 text-sm text-gray-600 border-t-2 border-slate-950 mt-5">
            <span class="font-medium text-xl text-slate-950 uppercase">Category:</span>
            <span class="text- font-semibold text-xl uppercase ml-3">
              {{ article.category.categoryName }}
            </span>

            <div class="mt-2 text-lg">Created By : {{ article.createdBy }}</div>
            <div class="mt-2 text-md">{{ formatDate(article.createdDate) }}</div>
          </div>
        </div>

        <!-- Teks -->
        <div class="w-full lg:w-1/2 text-slate-800">
          <h2 class="text-2xl lg:text-3xl font-semibold mb-5 text-primary underline">
            Description
          </h2>
          <p class="description text-lg leading-relaxed mb-8" v-html="article.description">
          </p>
        </div>
      </div>
    </div>

    <!-- Jika data artikel tidak ditemukan -->
    <div v-else class="flex justify-center items-center h-screen">
      <p class="text-red-500 text-2xl font-semibold">
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
    formatDate(dateString) {
      if (!dateString) return "Unknown Date";
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    },
  },
};
</script>

<style scoped>
/* Transisi Gambar */
img {
  transition: transform 0.3s ease-in-out;
}

img:hover {
  transform: scale(1.05);
}

/* Flexbox Responsif */
@media (max-width: 1024px) {
  .flex {
    flex-direction: column !important;
  }
}

/* Animasikan teks loading */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 1.5s infinite;
}
</style>
