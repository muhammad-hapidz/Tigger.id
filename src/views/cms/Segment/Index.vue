<template>
    <h3 class="text-gray-700 text-3xl font-medium mb-5">Segment / Menu</h3>
  
    <!-- Input Pencarian -->
    <div class="my-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by segment name..."
        class="px-4 py-2 border rounded-md lg:w-1/4"
      />
    </div>
    <div class="mt-3">
      <RouterLink
        to="/cms/segment/create"
        class="bg-blue-500 hover:bg-blue-600 duration-300 px-3 py-2 text-white rounded-md"
      >
        + Create New
      </RouterLink>
    </div>
  
    <div class="mt-6">
      <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">No</th>
                <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Segment Name</th>
                <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Description</th>
                <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Created By</th>
                <!-- <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Updated By</th> -->
                <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Created At</th>
                <th class="px-5 py-3 text-xs font-semibold text-center text-gray-600 uppercase bg-gray-100 border-b-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(content, index) in paginatedSegment" :key="content.id">
                <td class="px-5 py-5 text-sm bg-white border-b">
                  {{ index + 1 + ((currentPage || 1) - 1) * pageSize }}
                </td>
                <td class="px-5 py-5 text-sm bg-white border-b">{{ content.segmentName }}</td>
                <td class="px-5 py-5 text-sm bg-white border-b">{{ content.description || '-'}}</td>
                <td class="px-5 py-5 text-sm bg-white border-b">{{ content.createdBy || 'N/A' }}</td>
                <!-- <td class="px-5 py-5 text-sm bg-white border-b">{{ content.updatedBy || 'N/A' }}</td> -->
                <td class="px-5 py-5 text-sm bg-white border-b">{{ formatDate(content.createdDate) }}</td>
                <td class="px-5 py-5 text-sm bg-white border-b text-center flex flex-wrap justify-center gap-2">
                  <RouterLink :to="'/cms/segment/' + content.id" class="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">View</RouterLink>
                  <RouterLink
                    :to="`/cms/segment/${content.id}/edit`"
                    class="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-600"
                  >
                    Edit
                  </RouterLink>
                </td>
              </tr>
            </tbody>
          </table>
  
          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center items-center py-4">
            <button @click="goToPage(1)" :disabled="currentPage.value === 1" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed">«</button>
            <button @click="prevPage" :disabled="currentPage.value === 1" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed">‹</button>
  
            <!-- Page Numbers -->
            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              :class="{'bg-blue-500 text-white': page === currentPage.value, 'text-gray-800': page !== currentPage.value}"
              class="px-4 py-2 text-sm font-semibold mx-1 rounded hover:bg-gray-300"
            >
              {{ page }}
            </button>
  
            <button @click="nextPage" :disabled="currentPage.value >= totalPages.value" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed">›</button>
            <button
              @click="goToPage(totalPages.value)"
              :disabled="currentPage.value >= totalPages.value"
              class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '@/Services/api';

const segment = ref([]);
const currentPage = ref(1); // Halaman saat ini, default adalah 1
const pageSize = 10; // Jumlah item per halaman
const searchQuery = ref('');

// Fungsi untuk mengambil data kategori
const fetchSegment = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Token tidak ditemukan. Silakan login.');
      window.location.href = '/cms/login';
      return;
    }
    const response = await api.get('/Segments/Getall/cms');
    segment.value = response.data || [];
  } catch (error) {
    console.error('Error fetching segment:', error);
    alert('Gagal mengambil data kategori. Silakan coba lagi.');
  }
};

onMounted(fetchSegment);

const filteredSegment = computed(() => {
  if (!searchQuery.value) return segment.value;
  return segment.value.filter((item) =>
    item.segmentName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedSegment = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredSegment.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredSegment.value.length / pageSize)
);

// Navigasi halaman sebelumnya
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

// Navigasi halaman berikutnya
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

// Navigasi ke halaman tertentu
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

