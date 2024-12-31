<template>
    <div class="container mx-auto p-6">
      <!-- Loader when data is loading -->
      <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
        <p class="text-center text-blue-500 text-xl font-semibold animate-pulse">
          Memuat Data ....
        </p>
      </div>
  
      <!-- Category detail when data is successfully loaded -->
      <div v-else-if="detailSegment && Object.keys(detailSegment).length > 0" class="bg-white shadow-md rounded-lg p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
          Detail Kategori
        </h1>
        <ul class="space-y-4">
          <li class="flex">
            <span class="font-semibold text-gray-600 w-40 lg:w-52">Menu / Segment Name :</span>
            <span class="text-gray-800">{{ detailSegment.segmentName }}</span>
          </li>
          <li class="flex">
            <span class="font-semibold text-gray-600 w-40 lg:w-52">Description :</span>
            <span class="text-gray-800">{{ detailSegment.description || '-'}}</span>
          </li>
          <li class="flex">
            <span class="font-semibold text-gray-600 w-40 lg:w-52">Created By:</span>
            <span class="text-gray-800">{{ detailSegment.createdBy || '-' }}</span>
          </li>
          <li class="flex">
            <span class="font-semibold text-gray-600 w-40 lg:w-52">Created Date:</span>
            <span class="text-gray-800">{{ formatDate(detailSegment.createdDate) }}</span>
          </li>
        </ul>
        <div class="pt-16 flex justify-end gap-2">
          <button
            type="button"
            @click="goBack"
            class="px-4 py-2 border border-slate-800 rounded-md hover:bg-slate-800 hover:text-white duration-200"
          >
            Back
          </button>
          <!-- <RouterLink
            :to="`/cms/segment/${detailSegment.id}/edit`"
            class="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-600"
          >
            Edit
          </RouterLink> -->
        </div>
      </div>
  
      <!-- Message if failed to fetch data -->
      <div v-else class="flex justify-center items-center min-h-screen">
        <p class="text-center text-red-500 text-xl font-semibold">
          Gagal memuat data. Silakan coba lagi nanti.
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import api from '@/Services/api'; // Import instance API
  
  // Get ID parameter from route
  const route = useRoute();
  const id = route.params.id;
  
  // State
  const detailSegment = ref(null);
  const isLoading = ref(true);
  
  // Function to fetch segment detail
  const fetchDetailSegment = async () => {
    try {
      const response = await api.get(`/Segments/cms/${id}`);
      if (response && response.data) {
        detailSegment.value = response.data;
      } else {
        throw new Error("Data not found");
      }
    } catch (error) {
      console.error('Error Fetching Data Detail Segment:', error);
      detailSegment.value = null; // Set to null in case of error
    } finally {
      isLoading.value = false;
    }
  };
  
  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown Date';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  
  // Function to go back to the previous page
  const goBack = () => {
    window.history.back();
  };
  
  // Fetch data on component mount
  onMounted(fetchDetailSegment);
  </script>
  