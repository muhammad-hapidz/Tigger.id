<template>
  <div class="flex flex-wrap gap-5 justify-evenly">
    <div
      v-for="article in articles"
      :key="article.id"
      class="max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <img
        :src="article.image"
        alt="Card image"
        class="min-w-96 w-full h-48 object-cover"
      />
      <div class="p-5">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ article.title }}</h3>
        <p class="text-gray-600 text-sm">{{ truncateText(article.description, 120) }}</p>
        <p class="text-gray-500 text-sm mt-4">{{ formatDate (article.createdDate) }}</p>
        <div class="flex justify-end">
          <RouterLink :to="'/article/' + article.id" 
            class="mt-4 w-2/5 bg-primary text-white text-sm font-medium py-2 px-4 rounded-lg hover:opacity-75 transition-colors duration-300"
          >
            Read More
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  props: {
    articles: {
      type: Array,
      required: true,
    }
  },
  methods: {
    // Fungsi untuk memotong teks
    truncateText(text, length) {
      if (text.length > length) {
        return text.substring(0, length) + '...'; // Potong teks dan tambahkan elipsis
      }
      return text;
    },
    formatDate(dateString){
      if(!dateString) return "Unknown Date"
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("en-US",{
        year : "numeric",
        month: "long",
        day : "numeric"
      }).format(date);
    }
  }
};
</script>

<style scoped>
/* Tambahkan styling tambahan jika diperlukan */
</style>
