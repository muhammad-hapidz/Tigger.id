<template>
    <div class="container mx-auto p-6">
      <!-- Loader ketika data sedang dimuat -->
      <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
        <p class="text-center text-blue-500 text-xl font-semibold animate-pulse">
          Memuat Data ....
        </p>
      </div>
  
      <!-- Detail kategori ketika data berhasil dimuat -->
      <div v-else-if="detailMenu" class="bg-white shadow-md rounded-lg p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
          Detail Kategori
        </h1>
        <ul class="space-y-4">
          <li class="flex">
            <span class="font-semibold text-gray-600 w-40">Menu Name :</span>
            <span class="text-gray-800">{{ detailMenu.menuName }}</span>
          </li>
          <li class="flex">
            <span class="font-semibold text-gray-600 w-40">Description :</span>
            <span class="text-gray-800">{{ detailMenu.caption }}</span>
          </li>
          <li class="flex">
            <span class="font-semibold text-gray-600 w-40">Menu URL</span>
            <span class="text-gray-800">{{ detailMenu.menuUrl}}</span>
          </li>
          <li class="flex">
            <span class="font-semibold text-gray-600 w-40">Status</span>
            <span class="text-gray-800">{{ detailMenu.isActive}}</span>
          </li>
          <li class="flex">
          <span class="font-semibold text-gray-600 w-40">Created By:</span>
          <span class="text-gray-800">{{ detailMenu.createdBy || '-' }}</span>
        </li>
        <li class="flex">
          <span class="font-semibold text-gray-600 w-40">Created Date:</span>
          <span class="text-gray-800">{{ formatDate(detailMenu.createdDate) }}</span>
        </li>
        <li class="flex">
            <span class="font-semibold text-gray-600 w-40">Update BY : </span>
            <span class="text-gray-800">{{ detailMenu.updatedBy || '-'}}</span>
          </li>
          <li class="flex">
          <span class="font-semibold text-gray-600 w-40">Update Date :</span>
          <span class="text-gray-800">{{ detailMenu.updatedDate || '-' }}</span>
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
                    :to="`/cms/menu/${detailMenu.id}/edit`"
                    class="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-600"
                  >
                    Edit
                  </RouterLink> -->
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
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import api from '@/Services/api'; // Import instance API
  
  // Ambil parameter ID dari route
  const route = useRoute();
  const id = route.params.id;
  
  // State
  const detailMenu = ref(null);
  const isLoading = ref(true);
  
  // Fungsi untuk mengambil detail kategori
  const fetchDetailMenu = async () => {
    try {
      const response = await api.get(`/menu/cms/${id}`);
      detailMenu.value = response.data;
    } catch (error) {
      console.error('Error Fetching Data Detail Menu :', error);
      detailMenu.value = null;
    } finally {
      isLoading.value = false;
    }
  };
  
  // Fungsi untuk memformat tanggal
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown Date';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  
  // Fungsi untuk kembali ke halaman sebelumnya
  const goBack = () => {
    window.history.back();
  };
  
  // Ambil data saat komponen di-mount
  onMounted(fetchDetailMenu);
  </script>
  