<template>
  <h3 class="text-gray-700 text-3xl font-medium">Category</h3>

  <!-- Input Pencarian -->
  <div class="my-4">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search by category name..."
      class="px-4 py-2 border rounded-md lg:w-1/4"
    />
  </div>
  <div class="mt-3">
    <RouterLink
      to="/cms/category/create"
      class="bg-blue-500 hover:bg-blue-600 duration-300 px-3 py-2 text-white rounded-md"
    >
      + Create New
    </RouterLink>
  </div>

  <div v-if="isLoading" class="flex justify-center items-center py-4">
  <div class="loader border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
</div>

  <div class="mt-6">
    <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
      <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">No</th>
              <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Menu Name</th>
              <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Category Name</th>
              <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Description</th>
              <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Created By</th>
              <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Created At</th>
              <th class="px-5 py-3 text-xs font-semibold text-center text-gray-600 uppercase bg-gray-100 border-b-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(content, index) in paginatedCategory" :key="content.id">
              <td class="px-5 py-5 text-sm bg-white border-b">
                {{ index + 1 + ((currentPage || 1) - 1) * pageSize }}
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b">{{ content.segment.segmentName }}</td>
              <td class="px-5 py-5 text-sm bg-white border-b">{{ content.categoryName }}</td>
              <td class="px-5 py-5 text-sm bg-white border-b">{{ content.description }}</td>
              <td class="px-5 py-5 text-sm bg-white border-b">{{ content.createdBy || '-' }}</td>
              <!-- <td class="px-5 py-5 text-sm bg-white border-b">{{ content.updatedBy || '-' }}</td> -->
              <td class="px-5 py-5 text-sm bg-white border-b">{{ formatDate(content.createdDate) }}</td>
              <td class="px-5 py-5 text-sm bg-white border-b text-center flex flex-wrap justify-center gap-2">
                <RouterLink :to="'/cms/category/' + content.id" class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 duration-200"> 
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                      <path fill-rule="evenodd" d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd" />
                    </svg>
                </RouterLink>
                <RouterLink
                  :to="`/cms/category/${content.id}/edit`"
                  class="px-4 py-2 bg-green-500 hover:bg-green-600 duration-200 rounded-md"
                >
                <svg class="h-4 w-4 text-white"  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
                </RouterLink>
                <!-- <RouterLink 
                to=""
                @click.prevent="deleteCategory(content.id)"
                class="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 duration-200">
                  <svg class="h-4 w-4 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polyline points="3 6 5 6 21 6" />  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" /></svg>
                </RouterLink> -->
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

const category = ref([]);
const currentPage = ref(1); // Halaman saat ini, default adalah 1
const pageSize = 10; // Jumlah item per halaman
const searchQuery = ref('');
const isLoading = ref(true);

// Fungsi untuk mengambil data kategori
const fetchCategory = async () => {
  isLoading.value = true; // Mulai loading
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Token tidak ditemukan. Silakan login.');
      window.location.href = '/cms/login';
      return;
    }
    const response = await api.get('/Category/Getall/cms');
    category.value = response.data || [];
  } catch (error) {
    console.error('Error fetching category:', error);
    alert('Gagal mengambil data kategori. Silakan coba lagi.');
  } finally {
    isLoading.value = false; // Selesai loading
  }
};

const deleteCategory = async (id) => {
  if (!confirm('Are you sure want to delete this category?')) return;

  try {
    await api.delete(`/Category/cms/${id}`);
    alert('Category Deleted Successfully');
    fetchCategory();
  } catch (error) {
    console.error('Error Deleting Category:', error);
    alert('Gagal Menghapus Category. Silakan coba lagi.');
  }
};

onMounted(fetchCategory);

const filteredCategory = computed(() => {
  if (!searchQuery.value) return category.value;
  return category.value.filter((item) =>
    item.categoryName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedCategory = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredCategory.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredCategory.value.length / pageSize)
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
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date)) return 'Invalid Date';
  return date.toLocaleDateString('id-ID');
};
</script>

<style scoped>
.loader {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #1d4ed8; /* Tailwind blue-500 */
}
</style>
