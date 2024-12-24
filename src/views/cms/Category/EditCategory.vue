<template>
  <div class="container mx-auto p-6 bg-white rounded-md">
    <h3 class="text-gray-700 text-3xl font-medium mb-4">Edit Category</h3>
    <form @submit.prevent="updateCategory">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Category Name</label>
        <input
          v-model="formData.categoryName"
          type="text"
          class="w-full px-3 py-2 border rounded-lg"
          placeholder="Enter category name"
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Description</label>
        <textarea
          v-model="formData.description"
          class="w-full px-3 py-2 border rounded-lg"
          placeholder="Enter description"
        ></textarea>
      </div>

      <!-- Dropdown for selecting Segment -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Segment</label>
        <select v-model="formData.segmentId" class="w-full px-3 py-2 border rounded-lg">
          <option value="" disabled>Select a segment</option>
          <option v-for="segment in segments" :key="segment.id" :value="segment.id">
            {{ segment.segmentName }}
          </option>
        </select>
      </div>

      <div class="flex justify-end gap-4">
        <button
          type="button"
          @click="goBack"
          class="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </form>
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
  categoryName: '',
  description: '',
  segmentId: '', // Untuk menyimpan id segment
});

const segments = ref([]); // Menyimpan data segment yang tersedia

// Fungsi untuk mengambil detail kategori berdasarkan ID
const fetchCategoryDetail = async () => {
  try {
    const response = await api.get(`/Category/cms/${route.params.id}`);
    formData.value = {
      categoryName: response.data.categoryName,
      description: response.data.description,
      segmentId: response.data.segmentId || '', // Mengambil segmentId jika ada
    };
    // Mengambil daftar segment untuk dropdown
    await fetchSegments();
  } catch (error) {
    console.error('Error fetching category:', error);
    toast.error('Failed to load category data. Please try again later.');
  }
};

// Fungsi untuk mengambil daftar segment
const fetchSegments = async () => {
  try {
    const response = await api.get('/Segments/Getall/cms');
    segments.value = response.data;
  } catch (error) {
    console.error('Error fetching segments:', error);
    toast.error('Failed to load segments data. Please try again later.');
  }
};

const updateCategory = async () => {
  try {
    if (!formData.value.segmentId) {
      toast.error('Please select a segment/Menu.');
      return;
    }

    const updatedData = {
      categoryName: formData.value.categoryName,
      description: formData.value.description,
      segmentId: formData.value.segmentId, // Pastikan segmentId dikirim
    };
    await api.put(`/Category/cms/${route.params.id}`, updatedData);
    toast.success('Category updated successfully!');
    router.push('/cms/category');
  } catch (error) {
    console.error('Error updating category:', error);
    toast.error('Failed to update category, please complete the data. ');
  }
};

const goBack = () => {
  router.back();
};

onMounted(fetchCategoryDetail);
</script>
