<template>
  <div class="mt-6 p-4 bg-white shadow rounded-lg">
    <h3 class="text-gray-700 text-3xl font-medium mb-5 border-b-2 pb-2">Segment / Menu</h3>
    <div class="mt-3">
      <!-- <RouterLink
        to="/cms/segment/create"
        class="bg-blue-500 hover:bg-blue-600 duration-300 px-3 py-2 text-white rounded-md"
      >
        + Create New
      </RouterLink> -->
    </div>
    <!-- Input Pencarian -->
    <div class="flex flex-col mt-3 sm:flex-row">
      <div class="relative block mt-2 sm:mt-0">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg viewBox="0 0 24 24" class="w-4 h-4 text-gray-500 fill-current">
            <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"/>
          </svg>
        </span>
        <input v-model="searchQuery" placeholder="Search By Segment Name" 
          class="block w-full py-2 pl-8 pr-6 mr-4 text-sm text-gray-700 placeholder-gray-400 bg-white border border-b border-gray-400 rounded-l rounded-r  appearance-none sm:rounded-l-r focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
      </div>
    </div>
    

    <!-- Loading Spinner -->
    <div v-if="isLoading" class="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
      <div class="spinner border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
    </div>

    <!-- Tabel Data -->
    <div v-else class="mt-6">
      <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">No</th>
                <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Segment Name</th>
                <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Description</th>
                <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Created By</th>
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
                <td class="px-5 py-5 text-sm bg-white border-b">{{ formatDate(content.createdDate) }}</td>
                <td class="px-5 py-5 text-sm bg-white border-b text-center flex flex-wrap justify-center gap-2">
                  <RouterLink :to="'/cms/segment/' + content.id" class="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">View</RouterLink>
                  <!-- <RouterLink
                    :to="`/cms/segment/${content.id}/edit`"
                    class="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-600"
                  >
                    Edit
                  </RouterLink> -->
                </td>
              </tr>
            </tbody>
          </table>

          
        </div>
        <!-- Pagination -->
        <div class="flex items-center justify-between px-5 py-5 bg-white border-t">
          <span class="text-xs text-gray-900 xs:text-sm">Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, filteredSegment.length) }} of {{ filteredSegment.length }} Entries</span>
          <div class="inline-flex mt-2 xs:mt-0 gap-1">
            <button @click="prevPage" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400" :disabled="currentPage === 1">Prev</button>
            <button @click="nextPage" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400" :disabled="currentPage === totalPages">Next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '@/Services/api';
import { useToast } from 'vue-toastification';

const segment = ref([]);
const currentPage = ref(1); // Halaman saat ini, default adalah 1
const pageSize = 10; // Jumlah item per halaman
const searchQuery = ref('');
const isLoading = ref(true); // State untuk loading

// Fungsi untuk mengambil data kategori
const fetchSegment = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('Token tidak ditemukan. Silakan login.');
      window.location.href = '/cms/login';
      return;
    }
    const response = await api.get('/Segments/Getall/cms');
    segment.value = response.data || [];
  } catch (error) {
    console.error('Error fetching segment:', error);
  } finally {
    isLoading.value = false; // Set loading selesai
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
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredSegment.value.slice(start, end)
})

// Total halaman
const totalPages = computed(() => 
  Math.ceil(filteredSegment.value.length / pageSize)
)

// Navigasi halaman
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date)) return 'Invalid Date';
  return date.toLocaleDateString('id-ID');
};
</script>

<style>
.spinner {
  border-width: 4px;
  border-color: rgba(0, 0, 0, 0.2);
  border-top-color: #3b82f6;
}
</style>
