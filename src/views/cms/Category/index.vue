<template>
  <h3 class="text-gray-700 text-3xl font-medium">Category</h3>

  <!-- Input Pencarian -->
  <div class="my-4">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search by category name..."
      class="px-4 py-2 border rounded-md w-full"
    />
  </div>

  <div class="mt-6">
    <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
      <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Menu </th>
              <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Category Name</th>
              <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Created By</th>
              <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Created At</th>
              <th class="px-5 py-3 text-xs font-semibold text-center text-gray-600 uppercase bg-gray-100 border-b-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(content, index) in paginatedCategory" :key="content.id">
              <td class="px-5 py-5 text-sm bg-white border-b">{{ content.segment.segmentName }}</td>
              <td class="px-5 py-5 text-sm bg-white border-b">{{ content.category.categoryName }}</td>
              <td class="px-5 py-5 text-sm bg-white border-b">{{ content.createdBy || 'N/A' }}</td>
              <td class="px-5 py-5 text-sm bg-white border-b">{{ formatDate(content.createdDate) }}</td>
              <td class="px-5 py-5 text-sm bg-white border-b text-center flex flex-wrap justify-center gap-2">
                <RouterLink :to="'/cms/category/' + content.id" class="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">View</RouterLink>
                <button class="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-600">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="totalPages > 1" class="flex justify-center items-center py-4">
          <button @click="goToPage(1)" :disabled="currentPage.value === 1" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed">«</button>
          <button @click="prevPage" :disabled="currentPage.value === 1" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed">‹</button>

          <!-- Page Numbers -->
          <button
            v-for="page in pageNumbers"
            :key="page"
            @click="goToPage(page)"
            :class="{'bg-blue-500 text-white': page === currentPage.value, 'text-gray-800': page !== currentPage.value}"
            class="px-4 py-2 text-sm font-semibold mx-1 rounded hover:bg-gray-300"
          >
            {{ page }}
          </button>

          <button @click="nextPage" :disabled="currentPage.value >= totalPages.value" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed">›</button>
          <button @click="goToPage(totalPages.value)" :disabled="currentPage.value === totalPages.value" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed">»</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '@/Services/api'; // Import instance API

const category = ref([]);
const currentPage = ref(1);
const pageSize = 5;
const searchQuery = ref('');

// Fungsi untuk mengambil data kategori
const fetchCategory = async () => {
  try {
    const token = localStorage.getItem('authToken');

    if (!token) {
      alert('Token tidak ditemukan. Silakan login.');
      window.location.href = '/cms/login';
      return;
    }

    const response = await api.get('/SegmentCategory/Getall/cms');
    category.value = response.data || [];
  } catch (error) {
    console.error('Error fetching category:', error);
    alert('Gagal mengambil data kategori. Silakan coba lagi.');
  }
};

onMounted(fetchCategory);

const filteredCategory = computed(() => {
  if (!searchQuery.value) return category.value;
  return category.value.filter((item) =>
    item.category.categoryName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedCategory = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  return filteredCategory.value.slice(startIndex, startIndex + pageSize);
});

const totalPages = computed(() => Math.ceil(filteredCategory.value.length / pageSize));

const pageNumbers = computed(() => {
  const pages = [];
  for (let i = 1; i <= totalPages.value; i++) {
    pages.push(i);
  }
  return pages;
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date)) return 'Invalid Date';
  return date.toLocaleDateString('id-ID');
};
</script>
