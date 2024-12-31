<template>
  <div class="container mx-auto lg:p-6">
    <!-- Form untuk mengedit data -->
    <div class="bg-white shadow-md rounded-lg p-6 lg:w-3/4">
      <h1 class="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        Edit Menu
      </h1>
      <form @submit.prevent="updateMenu">
        <div class="space-y-4">
          <div>
            <label for="no" class="block text-gray-600 font-semibold mb-2">
              Nomor Urut Menu
            </label>
            <input
              type="number"
              id="no"
              v-model="formData.no"
             
              class="w-full lg:w-1/2 px-4 py-2 border rounded-md"
              required
            />
          </div>
          
          <div>
            <label for="menuName" class="block text-gray-600 font-semibold mb-2">
              Menu Name
            </label>
            <input
              type="text"
              id="menuName"
              v-model="formData.menuName"
              placeholder="Enter Menu Name"
              class="w-full lg:w-1/2 px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label for="caption" class="block text-gray-600 font-semibold mb-2">
              Description
            </label>
            <textarea
              id="caption"
              v-model="formData.caption"
              placeholder="Enter caption"
              class="w-full lg:w-1/2 px-4 py-2 border rounded-md"
              rows="6"
            ></textarea>
          </div>
          <div>
            <label for="menuUrl" class="block text-gray-600 font-semibold mb-2">
              Menu URL
            </label>
            <input
              type="text"
              id="menuUrl"
              v-model="formData.menuUrl"
              placeholder="Enter Menu URL name"
              class="w-full lg:w-1/2 px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label for="dropdownisActive" class="block text-gray-600 font-semibold mb-2">
              Status
            </label>
            <select v-model="formData.isActive" class="w-full lg:w-3/4 px-3 py-2 border rounded-lg mt-2">
              <option value="true">Active</option>
              <option value="false">Nonactive</option>
            </select>
          </div>

          <!-- Icon Selection Dropdown -->
          <div>
            <label for="icon" class="block text-gray-600 font-semibold mb-2">
              Icon
            </label>
            <select
  id="icon"
  v-model="formData.icon"
  class="w-full lg:w-1/2 px-4 py-2 border rounded-md"
>
  <option value="" disabled>Select an Icon</option>
  <option
    v-for="icon in icons"
    :key="icon.id"
    :value="icon.id" 
  >
    {{ icon.iconName }}
  </option>
</select>

          </div>

          <!-- Show the selected icon -->
          <div v-if="formData.icon">
            <label class="block text-gray-600 font-semibold mb-2">Selected Icon</label>
            <span v-html="formData.icon" class="h-6 w-6"></span>
          </div>
        </div>

        <div class="pt-16 flex justify-end gap-2">
          <button 
            type="button" 
            @click="goBack" 
            class="px-4 py-2 border border-slate-800 rounded-md hover:bg-slate-800 hover:text-white duration-200"
          >
            Back
          </button>
          <button 
            type="submit" 
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:opacity-80"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '@/Services/api'; // Import instance API
import { useToast } from 'vue-toastification'; // Import useToast from Vue Toast

const router = useRouter();
const route = useRoute();
const toast = useToast(); // Initialize toast

const formData = ref({
  menuName: '',
  caption: '',
  menuUrl: '', // Untuk menyimpan id segment
  isActive: '', // Default value set to "Active"
  icon: '', // Untuk menyimpan SVG icon yang dipilih
});

const icons = ref([]); // Untuk menyimpan daftar ikon yang tersedia

// Fungsi untuk mengambil daftar ikon dari API
const fetchIcons = async () => {
  try {
    const response = await api.get('/Icon/GetAll/cms');
    icons.value = response.data; // Menyimpan daftar ikon dari API
  } catch (error) {
    console.error('Error fetching icons:', error);
    toast.error('Failed to load icons. Please try again later.');
  }
};

// Fungsi untuk mengambil detail menu berdasarkan ID
const fetchMenuDetail = async () => {
  try {
    const response = await api.get(`/Menu/cms/${route.params.id}`);
    formData.value = {
      no: response.data.no || '',
      menuName: response.data.menuName,
      caption: response.data.caption,
      menuUrl: response.data.menuUrl,
      isActive: response.data.isActive.toString(), // Konversi ke string untuk dropdown
      icon: icons.value.find(icon => icon.id === response.data.idIcon)?.id || '', // Ambil ID dari ikon yang sesuai

    };
  } catch (error) {
    console.error('Error fetching menu:', error);
    toast.error('Failed to load menu data. Please try again later.');
  }
};



// Fungsi untuk mengupdate data menu
// Fungsi untuk mengupdate data menu
const updateMenu = async () => {
  try {
    const updatedData = {
      no: formData.value.no,
      menuName: formData.value.menuName,
      idIcon: formData.value.icon, // Pastikan ini adalah UUID dari ikon
      caption: formData.value.caption,
      menuUrl: formData.value.menuUrl,
      isActive: formData.value.isActive === 'true', // Konversi ke boolean
    };

    await api.put(`/Menu/cms/${route.params.id}`, updatedData); // Gunakan updatedData
    console.log('data', updatedData)
    toast.success('Menu updated successfully!');
    router.push('/cms/menu');
  } catch (error) {
    console.error('Error updating menu:', error);
    toast.error('Failed to update menu, please complete the data.');
  }
};



// Fungsi untuk kembali ke halaman sebelumnya
const goBack = () => {
  router.back();
};

// Panggil fungsi pada saat halaman dimuat
onMounted(() => {
  fetchIcons();
  fetchMenuDetail();
});
</script>