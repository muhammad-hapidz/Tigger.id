<template>
  <div class="flex flex-wrap gap-5 justify-evenly">
    <div
      v-for="news in newsAndEvents"
      :key="news.id"
      class="max-w-sm bg-white border border-slate-950 rounded-md shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
      <div class="relative min-w-96 w-full h-64">
        <img
          v-if="news.image"
          :src="news.image"
          alt="Card image"
          class="flex items-center justify-center min-w-96 w-full h-64 object-cover transition-transform hover:scale-110 duration-300"
        />
        <div
          v-else
          class="flex justify-center items-center bg-gray-200 text-gray-600 text-sm w-full h-full"
        >
          No image uploaded
        </div>
      </div>
      <!-- Konten Kartu -->
      <div class="p-5 flex-grow flex flex-col">
        <div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ news.title }}</h3>
          <p class="text-gray-600 text-sm" v-html="truncateText(news.description, 200)"></p>
        </div>
        <div class="mt-4 flex justify-between items-center">
          <p class="text-gray-500 text-sm">{{ formatDate(news.createdDate) }}</p>
          <RouterLink
            :to="'/news-and-event/' + news.id"
            @click="scrollToTop"
            class="bg-primary text-white hover:text-primary hover:bg-white border border-slate-900 text-sm font-medium py-2 px-4 rounded-lg hover:opacity-75 transition-colors duration-300"
          >
            Read More
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { RouterLink } from "vue-router";

export default {
  props: {
    newsAndEvents: {
      type: Array,
      required: true,
    },
  },
  methods: {
    // Fungsi untuk memotong teks
    truncateText(text, length) {
      if (!text) return "No description available";
      if (text.length > length) {
        return text.substring(0, length) + "..."; // Potong teks dan tambahkan elipsis
      }
      return text;
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
    // Scroll to top of the page
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  
  },
};
</script>

<style scoped>
/* Tambahkan styling tambahan jika diperlukan */
</style>
