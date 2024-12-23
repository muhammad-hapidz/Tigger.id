<template>
    <div class="container mx-auto lg:p-6">
      <!-- Form untuk menambahkan data -->
      <div class="bg-white shadow-md rounded-lg p-6 w-3/4">
        <h1 class="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
          Tambah Kategori
        </h1>
        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div>
              <label for="categoryName" class="block text-gray-600 font-semibold mb-2">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                v-model="formData.categoryName"
                placeholder="Masukkan nama menu"
                class="w-full lg:w-1/2 px-4 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label for="description" class="block text-gray-600 font-semibold mb-2">
                Description Category
              </label>
              <!-- Mengubah input menjadi textarea -->
              <textarea
                id="description"
                v-model="formData.description"
                placeholder="Masukkan deskripsi kategori"
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
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue';
  import api from '@/Services/api'; // Import instance API
  import { useToast } from 'vue-toastification'; // Import useToast
  
  // State untuk form data
  const formData = reactive({
    categoryName: '',
    description: '',
  });
  
  // Inisialisasi Toast
  const toast = useToast();
  
  // Fungsi untuk submit form
  const handleSubmit = async () => {
    try {
      // Kirim data ke API
      const response = await api.post('/Category/Post/cms', formData);
      console.log('Data berhasil ditambahkan:', response.data);
  
      // Reset form
      formData.categoryName = '';
      formData.description = ''; // Reset description setelah submit
  
      // Tampilkan pesan sukses menggunakan Toast
      toast.success('Data berhasil ditambahkan!');
    } catch (error) {
      console.error('Error saat menambahkan data:', error);
  
      // Tampilkan pesan error menggunakan Toast
      toast.error('Terjadi kesalahan saat menambahkan data. Silakan coba lagi.');
    }
  };
  
  // Fungsi untuk kembali ke halaman sebelumnya
  const goBack = () => {
    window.history.back();
  };
  </script>
  