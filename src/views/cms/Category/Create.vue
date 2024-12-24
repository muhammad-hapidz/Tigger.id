<template>
  <div class="container mx-auto lg:p-6">
    <!-- Form untuk menambahkan data -->
    <div class="bg-white shadow-md rounded-lg p-6 lg:w-3/4">
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
              placeholder="Enter Category name"
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
          <div>
            <label for="dropdownSegment" class="block text-gray-600 font-semibold mb-2">
              Segment
            </label>
            <select v-model="formData.segment" class="w-full  lg:w-3/4 px-3 py-2 border rounded-lg mt-2">
  <option value="" disabled>Select a segment</option>
  <!-- Menampilkan segmentName dan menggunakan Id sebagai value -->
  <option v-for="segment in segments" :key="segment.id" :value="segment.id">
    {{ segment.segmentName }}
  </option>
</select>




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
import { reactive, ref, onMounted } from 'vue';
import api from '@/Services/api';
import { useToast } from 'vue-toastification';

const formData = reactive({
  categoryName: '',
  description: '',
  segment: null, // Untuk menyimpan objek segment
});

const segments = ref([]);
const selectedSegmentId = ref('');

const toast = useToast();

const fetchSegments = async () => {
  try {
    const response = await api.get('/Segments/Getall/cms');
    segments.value = response.data;
  } catch (error) {
    console.error('Error fetching segments:', error);
    toast.error('Failed to load segments.');
  }
};

const handleSubmit = async () => {
  // Pastikan formData.segment memiliki nilai yang valid
  if (!formData.segment) {
    toast.error('Please select a segment');
    return;
  }

  // FormData sudah langsung menggunakan segmentId yang sesuai (Id)
  formData.segmentId = formData.segment; // Menambahkan segmentId

  // Cek data yang akan dikirim
  console.log('Data to be sent:', formData);

  try {
    // Kirim data ke API
    const response = await api.post('/Category/Post/cms', {
      categoryName: formData.categoryName,
      description: formData.description,
      segmentId: formData.segmentId, // Mengirimkan segmentId
    });
    console.log('Data berhasil ditambahkan:', response.data);

    // Reset form
    formData.categoryName = '';
    formData.description = '';
    formData.segment = ''; // Reset segment yang dipilih

    // Tampilkan toast sukses
    toast.success('Data berhasil ditambahkan!');
  } catch (error) {
    console.error('Error saat menambahkan data:', error);
    toast.error('Terjadi kesalahan. Silakan coba lagi.');
  }
};


const goBack = () => {
  window.history.back();
};

onMounted(fetchSegments);
</script>
