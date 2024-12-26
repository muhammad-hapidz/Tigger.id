<template>
    <div class="container mx-auto lg:p-6">
      <!-- Form untuk menambahkan data -->
      <div class="bg-white shadow-md rounded-lg p-6 lg:w-3/4">
        <h1 class="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
          Tambah Segment/Menu
        </h1>
        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div>
              <label for="segmentName" class="block text-gray-600 font-semibold mb-2">
                Segment Name
              </label>
              <input
                type="text"
                id="segmentName"
                v-model="formData.segmentName"
                placeholder="Enter Segment name"
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
  import { useRouter } from 'vue-router';
  import api from '@/Services/api';
  import { useToast } from 'vue-toastification';
  
  const router = useRouter();
  // Form data reactive state
  const formData = reactive({
    segmentName: '',
    description: '',
  });
  
  // Toast notification instance
  const toast = useToast();
  
  // Function to handle form submission
  const handleSubmit = async () => {
    // Validate input
    if (!formData.segmentName) {
      toast.error('Segment name and description are required');
      return;
    }
  
    try {
      // Send POST request to API
      const response = await api.post('/Segments/POST/cms', {
        segmentName: formData.segmentName,
        description: formData.description,
      });
  
      console.log('Segment berhasil ditambahkan:', response.data);
  
      // Reset form data
      formData.segmentName = '';
      formData.description = '';
  
      // Show success toast
      router.push('/cms/segment');

      toast.success('Segment berhasil ditambahkan!');
    } catch (error) {
      console.error('Error saat menambahkan segment:', error);
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    }
  };
  
  // Function to navigate back
  const goBack = () => {
    window.history.back();
  };
  </script>
  