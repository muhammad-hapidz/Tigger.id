<template>
  <div class="bg-primary ">
    <div class="bg-cover mt-14 lg:mt-16">
      <img src="../assets/img/wcwl.webp" class="bg-cover w-full" alt="" />
    </div>
    
    <div class="pt-5">
      <h1 class="text-3xl text-primary bg-white pb-2 mx-2 lg:mx-20 rounded-full text-center p-2">ARTICLE</h1>
    </div>
    <div class="bg-white pb-5 mx-4 mt-8 rounded">

    <!-- Input Pencarian dan filter category -->
    <div class="pb-5 flex flex-wrap lg:justify-between justify-end mx-8 lg:mx-20 mb-5 lg:p-5 items-center">
      <div class="mb-5">
        <input
          v-model="searchQuery"
          @input="applyFilter"
          type="text"
          placeholder="Search Articles..."
          class="w-full lg:w-80 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div class="mb-5">
        <select
          v-model="selectedCategory"
          @change="applyFilter"
          class="w-full px-4 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" class="rounded-lg">Select Category</option>
          <option v-for="category in uniqueCategories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
    </div>

    <!-- Tampilkan loading -->
    <div v-if="loading" class="flex justify-center items-center py-10">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
    </div>

    <!-- Tampilkan artikel setelah data dimuat -->
    <div v-else class="mx-8">
      <CardArticle :articles="paginatedArticles" />
    </div>

    <!-- Tampilkan pagination -->
    <div v-if="filteredArticles.length > 0" class="flex justify-end mt-10 mb-5 mx-10">
      <button
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
        class="px-4 py-2 bg-slate-400 text-white rounded-l-md hover:bg-slate-600"
      >
        Prev
      </button>
      <span class="mx-4 text-lg">{{ currentPage }}</span>
      <button
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
        class="px-4 py-2 bg-slate-400 text-white rounded-r-md hover:bg-slate-600"
      >
        Next
      </button>
    </div>

    <!-- Tampilkan pesan error jika pengambilan data gagal -->
    <div v-if="error" class="text-red-600 text-center py-5">
      <p>{{ error }}</p>
    </div>
  </div>
</div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import CardArticle from "@/components/CardArticle.vue";

export default defineComponent({
  components: {
    CardArticle,
  },
  data() {
    return {
      articles: [],
      searchQuery: "",
      currentPage: 1,
      articlesPerPage: 5,
      error: null,
      loading: true,
      selectedCategory: "", // Menyimpan kategori yang dipilih
      refreshInterval: null, // Interval untuk auto-refresh
    };
  },
  computed: {
    // Filter artikel berdasarkan query pencarian dan kategori yang dipilih
    filteredArticles() {
      let filtered = this.articles;
      if (this.searchQuery) {
        filtered = filtered.filter((article) =>
          article.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          article.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      if (this.selectedCategory) {
        filtered = filtered.filter(
          (article) => article.category?.categoryName === this.selectedCategory
        );
      }
      return filtered;
    },
    totalPages() {
      return Math.ceil(this.filteredArticles.length / this.articlesPerPage);
    },
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.articlesPerPage;
      const end = start + this.articlesPerPage;
      return this.filteredArticles.slice(start, end);
    },
    // Ambil kategori unik dari artikel
    uniqueCategories() {
      const categories = this.articles.map((article) => article.category?.categoryName);
      return [...new Set(categories)].filter(Boolean);
    },
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await axios.get("https://apitiggerid.tri3a.com/api/Contents/BySegmentArticle");
        this.articles = response.data;
        this.loading = false;
      } catch (error) {
        console.error("Error fetching articles:", error);
        this.error = "Failed to load articles. Please try again later.";
        this.loading = false;
      }
    },
    applyFilter() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.currentPage = 1; // Reset ke halaman pertama setelah filter diterapkan
      }, 500); // Simulasi waktu pemrosesan
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    startAutoRefresh(interval = 30000) {
      // Default interval 30 detik
      this.refreshInterval = setInterval(() => {
        this.fetchArticles();
      }, interval);
    },
    stopAutoRefresh() {
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval);
        this.refreshInterval = null;
      }
    },
  },
  mounted() {
    this.fetchArticles();
    this.startAutoRefresh(); // Mulai auto-refresh saat komponen di-mount
  },
  beforeUnmount() {
    this.stopAutoRefresh(); // Hentikan auto-refresh saat komponen di-unmount
  },
});
</script>

<style scoped>
/* Tambahkan gaya jika diperlukan */
</style>
