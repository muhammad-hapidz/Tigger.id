<template>
    <div class="container mx-auto lg:p-6">
      <!-- Form untuk menambahkan data -->
      <div class="bg-white shadow-md rounded-lg p-6 lg:w-3/4">
        <h1 class="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
          Edit Menu
        </h1>
        <form @submit.prevent="updateMenu">
          <div class="space-y-4">
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
});

// Fungsi untuk mengambil detail kategori berdasarkan ID
const fetchMenuDetail = async () => {
  try {
    const response = await api.get(`/Menu/cms/${route.params.id}`);
    formData.value = {
        menuName: response.data.menuName,
        caption: response.data.caption,
        menuUrl: response.data.menuUrl, 
        isActive: response.data.isActive
    };
  } catch (error) {
    console.error('Error fetching category:', error);
    toast.error('Failed to load category data. Please try again later.');
  }
};

const updateMenu = async () => {
  try {
    const updatedData = {
        menuName: formData.value.menuName,
        caption: formData.value.caption,
        menuUrl: formData.value.menuUrl,
        isActive: formData.value.isActive,

    };
    await api.put(`/Menu/cms/${route.params.id}`, updatedData);
    toast.success('Menu updated successfully!');
    router.push('/cms/menu');
  } catch (error) {
    console.error('Error updating menu:', error);
    toast.error('Failed to update menu, please complete the data. ');
  }
};

const goBack = () => {
  router.back();
};

onMounted(fetchMenuDetail);
</script>