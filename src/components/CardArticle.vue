<template>
  <div class="flex flex-wrap gap-5 justify-evenly">
    <div
      v-for="article in articles"
      :key="article.id"
      class="max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div class="relative min-w-96 w-full h-48">
        <img
          v-if="article.image"
          :src="article.image"
          alt="Card image"
          class="object-cover w-full h-48"
        />
        <!-- Tampilkan teks jika image null -->
        <div
          v-else
          class="flex justify-center items-center bg-gray-200 text-gray-600 text-sm w-full h-full"
        >
          No image uploaded
        </div>
      </div>
      <div class="p-5">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ article.title }}</h3>
        <p class="text-gray-600 text-sm">{{ truncateText(article.description, 120) }}</p>
        <p class="text-gray-500 text-sm mt-4">{{ formatDate(article.createdDate) }}</p>
        <div class="flex justify-end">
          <RouterLink
            :to="'/article/' + article.id"
            class="mt-4 w-2/5 bg-primary text-white text-sm font-medium text-center py-2 px-4 rounded-lg hover:opacity-75 transition-colors duration-300"
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
    articles: {
      type: Array,
      required: true,
    },
  },
  methods: {
    truncateText(text, length) {
      if (text.length > length) {
        return text.substring(0, length) + "...";
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
  },
};
</script>

<style scoped>
/* Tambahkan gaya jika diperlukan */
</style>
