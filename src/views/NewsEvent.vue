<template>
  <div class="mt-32">
    <!-- Input Pencarian dan Dropdown Filter Category -->
    <div class="flex flex-wrap justify-between mx-20 mb-5 p-5 items-center">
      <!-- Input Pencarian -->
      <div class="mb-5">
        <input
          v-model="searchQuery"
          @input="applyFilter"
          type="text"
          placeholder="Search News and Events..."
          class="w-full lg:w-80 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Dropdown Filter Category -->
      <div class="mb-5">
        <select
          v-model="selectedCategory"
          @change="applyFilter"
          class="w-full px-4 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Category</option>
          <option v-for="category in uniqueCategories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
    </div>

    <!-- Tampilkan Loading -->
    <div v-if="loading" class="flex justify-center items-center py-10">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
    </div>

    <!-- Tampilkan Card NewsEvent setelah data dimuat -->
    <CardNewsEvent v-else :newsAndEvents="paginatedNewsAndEvents" />

    <!-- Tampilkan Pagination -->
    <div v-if="filteredNewsAndEvents.length > 0" class="flex justify-end mt-10 mb-5 mx-10">
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

    <!-- Tampilkan pesan jika tidak ada hasil -->
    <div v-else class="text-center py-5 text-gray-600">
      <p>No News and Events found.</p>
    </div>

    <div class="my-8 border-t border-gray-300"></div>

    <!-- Tampilkan Video YouTube -->
    <div class="m-32 flex flex-wrap justify-center gap-5">
      <iframe
        width="560"
        class="rounded-md"
        height="315"
        src="https://www.youtube.com/embed/heZ_f6_9FV0?si=CVDe05g0tGr20HK3"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <iframe
        width="560"
        class="rounded-md"
        height="315"
        src="https://www.youtube.com/embed/mZj37lmOhZQ?si=AKhni1IIMvfV9EzE"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>

      <iframe
        width="560"
        class="rounded-md"
        height="315"
        src="https://www.youtube.com/embed/Cq9IRCKqPnA?si=YDT-u22PXhXZ90Hw"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
import CardNewsEvent from '@/components/CardNewsEvent.vue';
import axios from 'axios';

export default {
  components: {
    CardNewsEvent,
  },
  data() {
    return {
      newsAndEvents: [],
      searchQuery: "",
      selectedCategory: "",
      currentPage: 1,
      newsPerPage: 5,
      loading: true, // Menambahkan status loading
    };
  },
  computed: {
    filteredNewsAndEvents() {
      let filtered = this.newsAndEvents;
      if (this.searchQuery) {
        filtered = filtered.filter((item) =>
          item.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      if (this.selectedCategory) {
        filtered = filtered.filter(
          (item) => item.category.categoryName === this.selectedCategory
        );
      }
      return filtered;
    },
    totalPages() {
      return Math.ceil(this.filteredNewsAndEvents.length / this.newsPerPage);
    },
    paginatedNewsAndEvents() {
      const start = (this.currentPage - 1) * this.newsPerPage;
      const end = start + this.newsPerPage;
      return this.filteredNewsAndEvents.slice(start, end);
    },
    uniqueCategories() {
      const categories = this.newsAndEvents.map((item) => item.category.categoryName);
      return [...new Set(categories)].filter(Boolean);
    },
  },
  methods: {
    async fetchNewsAndEvents() {
      this.loading = true; // Set loading true sebelum mengambil data
      try {
        const response = await axios.get(
          'https://apitiggerid.tri3a.com/api/Contents/BySegmentNewsAndEvent'
        );
        this.newsAndEvents = response.data;
      } catch (error) {
        console.error('Error fetching news and events:', error);
      } finally {
        this.loading = false; // Set loading false setelah proses selesai
      }
    },
    applyFilter() {
      this.currentPage = 1;
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  mounted() {
    this.fetchNewsAndEvents();
  },
};
</script>
