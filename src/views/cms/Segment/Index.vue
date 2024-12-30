<template>
  <div class="mt-6 p-4 bg-white shadow rounded-lg">
    <h3 class="text-gray-700 text-3xl font-medium border-b pb-2">Segment</h3>

    <!-- Input Pencarian -->
    <div class="flex flex-col mt-3 sm:flex-row">
      <div class="relative block mt-2 sm:mt-0">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg viewBox="0 0 24 24" class="w-4 h-4 text-gray-500 fill-current">
            <path
              d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
            />
          </svg>
        </span>
        <input v-model="searchQuery" placeholder="Search By Segment Name"
          class="block w-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border border-b border-gray-400 rounded-l rounded-r appearance-none sm:rounded-l-r focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
      </div>
    </div>

    <!-- Table to display Segments -->
    <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8 mt-4">
      <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                No
              </th>
              <th
                class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                Segment Name
              </th>
              <th
                class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                Description
              </th>
              <th
                class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                Created By
              </th>
              <th
                class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                Created At
              </th>
              <th
                class="px-5 py-3 text-xs font-semibold text-center text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(content, index) in paginatedSegment" :key="content.id">
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                {{ index + 1 + (currentPage - 1) * itemsPerPage }}
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                {{ content.segmentName }}
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                {{ truncateText(content.description, 50) || '-' }}
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                {{ content.createdBy || 'N/A' }}
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                {{ formatDate(content.createdDate) }}
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200 text-center">
                <router-link
                  :to="'/cms/segment/' + content.id"
                  class="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
                  View
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between px-5 py-5 bg-white border-t">
        <span class="text-xs text-gray-900 xs:text-sm">
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
          {{ Math.min(currentPage * itemsPerPage, filteredSegment.length) }} of
          {{ filteredSegment.length }} Entries
        </span>
        <div class="inline-flex mt-2 xs:mt-0 gap-1">
          <button
            @click="prevPage"
            class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400"
            :disabled="currentPage === 1">
            Prev
          </button>
          <button
            @click="nextPage"
            class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400"
            :disabled="currentPage === totalPages">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '@/Services/api';

// State
const segment = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;

// Fetch data from API
const fetchSegment = async () => {
  try {
    const response = await api.get('/Segments/Getall/cms');
    segment.value = response.data || [];
  } catch (error) {
    console.error('Error fetching segments:', error);
  }
};

const filteredSegment = computed(() => {
  if (!searchQuery.value) return segment.value;
  return segment.value.filter((item) =>
    item.segmentName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedSegment = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredSegment.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredSegment.value.length / itemsPerPage));

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID');
};

const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

onMounted(fetchSegment);
</script>
