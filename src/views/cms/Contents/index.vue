<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// State
const contents = ref([])
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJBZG1pbmlzdHJhdG9yQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIyYjdhOTgzOS1jN2E4LTQ1YTUtOTMzNy0yNzgwZDQ5NWU2M2QiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbmlzdHJhdG9yIiwiZXhwIjoxNzM3MjU1NTE0LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUxNDIvIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MTQyLyJ9.JCMrWU4sT12wrKip98wWKVr1L8AQGKKng-KeINV5eQ8';

// Fungsi untuk mengambil data API
const fetchContents = async () => {
  try {
    const response = await axios.get(
      'https://apitiggerid.tri3a.com/api/Segments/Getall/cms',
    {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    
    contents.value = response.data
  } catch (error) {
    console.error('Error fetching contents:', error)
  }
}

// Fungsi untuk memotong teks
const truncateText = (text, maxLength) => {
  if (!text) return '' // Cegah error jika teks null atau undefined
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

// Filtered contents
const filteredContents = computed(() => {
  if (!searchQuery.value) return contents.value

  const query = searchQuery.value.toLowerCase()

  return contents.value.filter(content => {
    const titleMatch = content.title?.toLowerCase().includes(query)
    const segmentMatch = content.segments?.segmentName?.toLowerCase().includes(query)
    const categoryMatch = content.category?.categoryName?.toLowerCase().includes(query)

    return titleMatch || segmentMatch || categoryMatch
  })
})

// Paginasi data
const paginatedContents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredContents.value.slice(start, end)
})

// Total halaman
const totalPages = computed(() => 
  Math.ceil(filteredContents.value.length / itemsPerPage)
)

// Navigasi halaman
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

// Format tanggal
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

onMounted(fetchContents)
</script>

<template>
  <h3 class="text-gray-700 text-3xl font-medium">Contents</h3>

  <div class="mt-6">
    <router-link to="/cms/Contents/create">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            + Create New
        </button>
    </router-link>

    <div class="flex flex-col mt-3 sm:flex-row">
      <div class="relative block mt-2 sm:mt-0">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg viewBox="0 0 24 24" class="w-4 h-4 text-gray-500 fill-current">
            <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"/>
          </svg>
        </span>
        <input v-model="searchQuery" placeholder="Search" 
          class="block w-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border border-b border-gray-400 rounded-l rounded-r appearance-none sm:rounded-l-none focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
      </div>
    </div>

    <!-- Table to display Contents -->
    <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
      <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">No</th>
              <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Title</th>
              <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Description</th>
              <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Segment</th>
              <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Category</th>
              <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Created By</th>
              <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Created At</th>
              <th class="px-5 py-3 text-xs font-semibold text-center text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200 ">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(content, index) in paginatedContents" :key="content.id">
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ content.title }}</td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200"> <p class="text-gray-900 whitespace-nowrap">
                    {{ truncateText(content.description, 300) }}</p></td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ content.segments?.segmentName }}</td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ content.category?.categoryName }}</td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ content.createdBy }}</td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ formatDate(content.createdDate) }}</td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200 text-center">
                <button class="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                      <path fill-rule="evenodd" d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </button>
                <span class="text-center"> | </span>
                <button class="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-600">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                      <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
                      <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
                    </svg>
                </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination controls -->
        <div class="flex items-center justify-between px-5 py-5 bg-white border-t">
          <span class="text-xs text-gray-900 xs:text-sm">Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredContents.length) }} of {{ filteredContents.length }} Entries</span>
          <div class="inline-flex mt-2 xs:mt-0">
            <button @click="prevPage" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400" :disabled="currentPage === 1">Prev</button>
            <button @click="nextPage" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400" :disabled="currentPage === totalPages">Next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
