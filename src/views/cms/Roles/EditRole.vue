<template>
    <div class="container mx-auto p-6 bg-white rounded-md">
      <h3 class="text-gray-700 text-3xl font-medium mb-4">Edit Role</h3>
      <form @submit.prevent="updateRole">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Role Name</label>
          <input
            v-model="formData.roleName"
            type="text"
            class="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter Role name"
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
import { useToast } from 'vue-toastification'; // Import useToast from Vue Toast

const router = useRouter();
const route = useRoute();
const toast = useToast(); // Initialize toast

const formData = ref({
  roleName: '',
  description: '',
});


// Fungsi untuk mengambil detail kategori berdasarkan ID
const fetchRoleDetail = async () => {
  try {
    const response = await api.get(`/Roles/cms/${route.params.id}`);
    formData.value = {
      roleName: response.data.roleName,
      description: response.data.description
    };
    // Mengambil daftar segment untuk dropdown
  } catch (error) {
    console.error('Error fetching role:', error);
    toast.error('Failed to load role data. Please try again later.');
  }
};


const updateRole = async () => {
  try {

    const updatedData = {
      roleName: formData.value.roleName,
      description: formData.value.description,
    };
    await api.put(`/Roles/cms/${route.params.id}`, updatedData);
    toast.success('Role updated successfully!');
    router.push('/cms/roles');
  } catch (error) {
    console.error('Error updating role:', error);
    toast.error('Failed to update role, please complete the data. ');
  }
};

const goBack = () => {
  router.back();
};

onMounted(fetchRoleDetail);
</script>
