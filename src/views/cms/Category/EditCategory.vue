<template>
    <div class="container mx-auto p-6">
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
  
  const router = useRouter();
  const route = useRoute();
  
  const formData = ref({
    categoryName: '',
    description: '',
  });
  
  const fetchCategoryDetail = async () => {
    try {
      const response = await api.get(`/Category/cms/${route.params.id}`);
      formData.value = {
        categoryName: response.data.categoryName,
        description: response.data.description,
      };
    } catch (error) {
      console.error('Error fetching category:', error);
      alert('Failed to load category data. Please try again later.');
    }
  };
  
  const updateCategory = async () => {
    try {
      await api.put(`/Category/cms/${route.params.id}`, formData.value);
      alert('Category updated successfully!');
      router.push('/cms/category');
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Failed to update category. Please try again.');
    }
  };
  
  const goBack = () => {
    router.back();
  };
  
  onMounted(fetchCategoryDetail);
  </script>
  