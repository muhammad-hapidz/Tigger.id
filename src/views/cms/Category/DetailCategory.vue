<template>
  <div class="container mx-auto p-6">
    <!-- Loader ketika data sedang dimuat -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
      <p class="text-center text-blue-500 text-xl font-semibold animate-pulse">
        Memuat Data ....
      </p>
    </div>

    <!-- Detail kategori ketika data berhasil dimuat -->
    <div v-else-if="detailCategory" class="bg-white shadow-md rounded-lg p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        Detail Kategori
      </h1>
      <ul class="space-y-4">
        <li class="flex">
          <span class="font-semibold text-gray-600 w-40">Menu:</span>
          <span class="text-gray-800">{{ detailCategory.segment.segmentName }}</span>
        </li>
        <li class="flex">
          <span class="font-semibold text-gray-600 w-40">Category Name:</span>
          <span class="text-gray-800">{{ detailCategory.category.categoryName }}</span>
        </li>
        <li class="flex">
          <span class="font-semibold text-gray-600 w-40">Created By:</span>
          <span class="text-gray-800">{{ detailCategory.createdBy || 'N/A' }}</span>
        </li>
        <li class="flex">
          <span class="font-semibold text-gray-600 w-40">Created Date:</span>
          <span class="text-gray-800">{{ formatDate(detailCategory.createdDate) }}</span>
        </li>
      </ul>
      <div class="pt-16 flex justify-end">
        <RouterLink to="" class="px-3 py-2 bg-blue-500 rounded-md text-white hover:opacity-80">
          Edit
        </RouterLink>
      </div>
    </div>

    <!-- Pesan jika gagal mengambil data -->
    <div v-else class="flex justify-center items-center min-h-screen">
      <p class="text-center text-red-500 text-xl font-semibold">
        Gagal memuat data. Silakan coba lagi nanti.
      </p>
    </div>
  </div>
</template>


<script>
import api from '@/Services/api'; // Import instance API

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      detailCategory: null,
      isLoading: true,
    };
  },
  mounted() {
    this.fetchdetailCategory();
  },
  methods: {
    // Fungsi untuk mengambil detail kategori
    async fetchdetailCategory() {
      try {
        // Mengambil data kategori menggunakan instance API
        const response = await api.get(`/SegmentCategory/cms/${this.id}`);
        this.detailCategory = response.data;
        // console.log('Detail Category:', this.detailCategory);
      } catch (error) {
        console.error('Error Fetching Data Detail Category:', error);
        this.detailCategory = null;
      } finally {
        this.isLoading = false;
      }
    },
    // Fungsi untuk memformat tanggal
    formatDate(dateString) {
      if (!dateString) return 'Unknown Date';
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
    },
  },
};
</script>
