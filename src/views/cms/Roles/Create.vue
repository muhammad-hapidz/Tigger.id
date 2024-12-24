<template>
    <div class="container mx-auto lg:p-6">
      <!-- Form untuk menambahkan data -->
      <div class="bg-white shadow-md rounded-lg p-6 lg:w-3/4">
        <h1 class="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
          Tambah Role
        </h1>
        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div>
              <label for="roleName" class="block text-gray-600 font-semibold mb-2">
                Role Name
              </label>
              <input
                type="text"
                id="roleName"
                v-model="formData.roleName"
                placeholder="Enter role name"
                class="w-full lg:w-1/2 px-4 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label for="description" class="block text-gray-600 font-semibold mb-2">
                Description
              </label>
              <textarea
                id="description"
                v-model="formData.description"
                placeholder="Enter description"
                class="w-full lg:w-1/2 px-4 py-2 border rounded-md"
                rows="6"
              ></textarea>
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
  import { reactive } from 'vue';
  import api from '@/Services/api';
  import { useToast } from 'vue-toastification';
  
  const toast = useToast();
  
  const formData = reactive({
    roleName: '',
    description: '',
  });
  
  const handleSubmit = async () => {
    try {
      // Kirim data ke API
      const response = await api.post('/Roles/POST/cms', {
        roleName: formData.roleName,
        description: formData.description,
      });
      console.log('Data berhasil ditambahkan:', response.data);
  
      // Tampilkan toast sukses
      toast.success('Data berhasil ditambahkan!');
  
      // Reset form
      formData.roleName = '';
      formData.description = '';
  
      // Kembali ke halaman sebelumnya
      setTimeout(() => {
        window.history.back();
      }, 1500); // Memberi waktu untuk toast tampil
    } catch (error) {
      console.error('Error saat menambahkan data:', error);
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    }
  };
  
  const goBack = () => {
    window.history.back();
  };
  </script>
  
