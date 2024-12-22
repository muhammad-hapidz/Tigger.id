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
              <!-- <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">#</th> -->
              <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Menu </th>
              <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Category Name</th>
              <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Created By</th>
              <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Created At</th>
              <th class="px-5 py-3 text-xs font-semibold text-center text-gray-600 uppercase bg-gray-100 border-b-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(content, index) in paginatedCategory" :key="content.id">
              <!-- <td class="px-5 py-5 text-sm bg-white border-b">
  {{ (currentPage.value > 0 && !isNaN(currentPage.value) ? (currentPage.value - 1) * pageSize + (index + 1) : 'Invalid') }}
</td> -->

              <td class="px-5 py-5 text-sm bg-white border-b">{{ content.segment.segmentName }}</td>
              <td class="px-5 py-5 text-sm bg-white border-b">{{ content.category.categoryName }}</td>
              <td class="px-5 py-5 text-sm bg-white border-b">{{ content.createdBy || 'N/A' }}</td>
              <td class="px-5 py-5 text-sm bg-white border-b">{{ formatDate(content.createdDate) }}</td>
              <td class="px-5 py-5 text-sm bg-white border-b text-center flex flex-wrap justify-center gap-2">
                <RouterLink 
                :to="'/cms/category/' + content.id" class="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">View</RouterLink>
                <button class="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-600">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="totalPages > 1" class="flex justify-center items-center py-4">
          <button @click="goToPage(1)" :disabled="currentPage.value === 1" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed">«</button>
          <button @click="prevPage" :disabled="currentPage.value === 1" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed">‹</button>

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
import axios from 'axios';

// State untuk menyimpan data API dan filter
const category = ref([]); // Data dari API
const currentPage = ref(1); // Halaman saat ini, nilai default 1
const pageSize = 5; // Jumlah data per halaman
const searchQuery = ref(''); // Query pencarian
const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJBZG1pbmlzdHJhdG9yQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIyYjdhOTgzOS1jN2E4LTQ1YTUtOTMzNy0yNzgwZDQ5NWU2M2QiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbmlzdHJhdG9yIiwiZXhwIjoxNzM3NDY0MjExLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUxNDIvIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MTQyLyJ9.62vyBOeneTUhpBAs6HMct9HgGEZ0RVwczbvwaWhbUWc';

// Fungsi untuk mengambil data API
const fetchCategory = async () => {
  try {
    const response = await axios.get(
      'https://apitiggerid.tri3a.com/api/SegmentCategory/Getall/cms',
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    category.value = response.data || [];
  } catch (error) {
    console.error('Error fetching category:', error);
  }
};

// Panggil fungsi saat komponen dimuat
onMounted(fetchCategory);

// Filter data berdasarkan pencarian
const filteredCategory = computed(() => {
  if (!searchQuery.value) return category.value;
  return category.value.filter((item) =>
    item.category.categoryName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Paginasi data
const paginatedCategory = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return filteredCategory.value.slice(startIndex, endIndex);
});

// Total halaman
const totalPages = computed(() => Math.ceil(filteredCategory.value.length / pageSize));

// Navigasi halaman
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

// Fungsi untuk mengubah halaman
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Menentukan batas maksimal tombol halaman
const pageNumbers = computed(() => {
  const maxPagesToShow = 5;
  const total = totalPages.value;
  const pages = [];
  let start = Math.max(currentPage.value - 2, 1);
  let end = Math.min(start + maxPagesToShow - 1, total);

  if (end - start < maxPagesToShow - 1) {
    start = Math.max(end - maxPagesToShow + 1, 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

// Format tanggal
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date)) return 'Invalid Date';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
</script>
