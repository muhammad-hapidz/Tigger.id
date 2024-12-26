<template>
  <div class="container bg-white p-6 rounded-md">
    <h3 class="text-gray-700 text-2xl font-medium mb-4">Edit Segment/Menu</h3>
    <form @submit.prevent="updateSegment">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-semibold">Segment Name</label>
        <input
          v-model="formData.segmentName"
          type="text"
          class="w-full px-3 py-2 border rounded-md"
          placeholder="Enter Segment Name"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-semibold">Description</label>
        <textarea
          v-model="formData.description"
          class="w-full px-3 py-2 border rounded-md"
          placeholder="Enter Description"
          required
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
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import api from '@/Services/api'; // Instance axios

// Router instance
const route = useRoute();
const router = useRouter();

// Instance Toast
const toast = useToast();

// State untuk data form
const formData = ref({
  segmentName: '',
  description: '',
});

// Ambil ID dari parameter route
const segmentId = route.params.id;

// Fungsi untuk mengambil detail segment
const fetchSegmentDetail = async () => {
  try {
    const response = await api.get(`/Segments/cms/${segmentId}`);
    formData.value = response.data;
    console.log('Detail segment fetched:', response.data);
    // toast.success('Segment details fetched successfully!');
  } catch (error) {
    console.error('Error fetching segment detail:', error);
    toast.error('Failed to fetch segment details.');
    goBack();
  }
};

// Fungsi untuk mengirim data edit ke server
const updateSegment = async () => {
  try {
    console.log('Data sebelum dikirim:', formData.value); // Debug log
    const response = await api.put(`/Segments/cms/${segmentId}`, formData.value);

    // Pastikan respons sukses
    if (response.status === 200 || response.status === 204) {
      console.log('Segment updated:', response.data);
      toast.success('Segment updated successfully!');
      goBack();
    } else {
      console.warn('Unexpected response:', response);
      toast.warning('Update failed. Unexpected response from server.');
    }
  } catch (error) {
    console.error('Error updating segment:', error);
    toast.error('Failed to update segment. Please try again.');
  }
};

// Fungsi untuk kembali ke halaman sebelumnya
const goBack = () => {
  router.push('/cms/segment');
};

// Panggil data detail saat komponen dimount
onMounted(fetchSegmentDetail);
</script>

