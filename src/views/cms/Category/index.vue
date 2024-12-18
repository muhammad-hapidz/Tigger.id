<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// State untuk menyimpan data API dan filter
const category = ref([]) // Data yang diterima dari API
const currentPage = ref(1) // Halaman saat ini (Default 1)
const pageSize = 5 // Ukuran halaman (Selalu 10 data per halaman)
const searchQuery = ref('') // Query pencarian

// Fungsi untuk mengambil data API
const fetchcategory = async () => {
  try {
    const response = await axios.get('https://apitiggerid.tri3a.com/api/Category')
    category.value = response.data || []
  } catch (error) {
    console.error('Error fetching category:', error)
  }
}

// Panggil fungsi saat komponen dimuat
onMounted(fetchcategory)

// Filter data berdasarkan pencarian
const filteredcategory = computed(() => {
  if (!searchQuery.value) return category.value
  return category.value.filter((item) =>
    item.categoryName.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Paginasi data
const paginatedcategory = computed(() => {
  if (!filteredcategory.value.length || pageSize <= 0) return []
  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  return filteredcategory.value.slice(startIndex, endIndex)
})

// Total halaman
const totalPages = computed(() => {
  return Math.max(Math.ceil(filteredcategory.value.length / pageSize), 1)
})

// Navigasi halaman
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

// Fungsi untuk mengubah halaman berdasarkan nomor
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = parseInt(page) // Pastikan selalu integer
  }
}

// Menentukan batas maksimal tombol halaman yang ditampilkan
const pageNumbers = computed(() => {
  const maxPagesToShow = 5
  const total = totalPages.value
  const pages = []
  
  let start = Math.max(currentPage.value - 2, 1) // Menampilkan halaman sebelum halaman aktif
  let end = Math.min(start + maxPagesToShow - 1, total) // Menentukan akhir halaman berdasarkan maxPagesToShow
  
  if (end - start < maxPagesToShow - 1) {
    start = Math.max(end - maxPagesToShow + 1, 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Format tanggal
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}


</script>

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
              <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2">
                #
              </th>
              <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2">
                Category Name
              </th>
              <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2">
                Description
              </th>
              <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2">
                Created By
              </th>
              <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2">
                Created At
              </th>
              <th class="px-5 py-3 text-xs font-semibold tracking-wider text-center text-gray-600 uppercase bg-gray-100 border-b-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(content, index) in paginatedcategory" :key="content.id">
              <td class="px-5 py-5 text-sm bg-white border-b">
                <p class="text-gray-900">
                  {{ (currentPage.value + 1) * pageSize + index + 1 }}
                </p>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b">
                <p class="text-gray-900">{{ content.categoryName }}</p>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b">
                <p class="text-gray-900">{{ content.categoryDescription }}</p>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b">
                <p class="text-gray-900">{{ content.createdBy }}</p>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b">
                <p class="text-gray-900">{{ formatDate(content.createdDate) }}</p>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b text-center">
                <button class="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">View</button>
                <button class="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-600">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-center items-center py-4">
          <!-- Prev and Next buttons -->
          <button @click="goToPage(1)" :disabled="currentPage.value === 1" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400">«</button>
          <button @click="prevPage" :disabled="currentPage.value === 1" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400">‹</button>

          <!-- Numbered pages -->
          <button
            v-for="page in pageNumbers"
            :key="page"
            @click="goToPage(page)"
            :class="{'bg-blue-500 text-white': page === currentPage.value, 'text-gray-800': page !== currentPage.value}"
            class="px-4 py-2 text-sm font-semibold mx-1 rounded hover:bg-gray-300"
          >
            {{ page }}
          </button>

          <!-- Next and Last buttons -->
          <button @click="nextPage" :disabled="currentPage.value >= totalPages.value" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400">›</button>
          <button @click="goToPage(totalPages.value)" :disabled="currentPage.value === totalPages.value" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400">»</button>
        </div>
      </div>
    </div>
  </div>
</template>
