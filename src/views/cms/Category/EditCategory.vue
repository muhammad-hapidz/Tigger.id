<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import api from '@/Services/api'; // Import API instance
import { useToast } from 'vue-toastification';

const router = useRouter();
const route = useRoute();
const toast = useToast();

// State untuk form data
const formData = ref({
  categoryName: '',
  description: '',
  segment: null, // Menyimpan segment yang dipilih
});

// Data untuk dropdown segment
const segments = ref([]);

// Fungsi untuk mengambil detail kategori
const fetchCategoryDetail = async () => {
  try {
    const response = await api.get(`/Category/cms/${route.params.id}`);
    const categoryData = response.data;

    // Cari segment berdasarkan ID
    const selectedSegment = segments.value.find(segment => segment.id === categoryData.segment.segmentId) || null;
  
    formData.value = {
      categoryName: categoryData.categoryName,
      description: categoryData.description,
      segment: selectedSegment, // Set segment ke data yang sesuai
    };
  } catch (error) {
    console.error('Error fetching category:', error);
    toast.error('Failed to load category details. Please try again.');
  }
};


const fetchSegments = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    toast.error('Auth token tidak ditemukan. Harap login terlebih dahulu.');
    return;
  }

  try {
    const response = await api.get('/Segments/Getall/cms', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    segments.value = response.data.map(segment => ({
      id: segment.id,
      name: segment.segmentName, 
    }));

  } catch (error) {
    console.error('Error fetching segments:', error);
    toast.error('Gagal mengambil data segments.');
  }
};

// Fungsi untuk mengupdate kategori
const updateCategory = async () => {
  try {
    if (!formData.value.segment) {
      toast.error('Please select a segment.');
      return;
    }

    const payload = {
      categoryName: formData.value.categoryName,
      description: formData.value.description,
      segmentId: formData.value.segment.id, // Kirim ID segment
    };

    await api.put(`/Category/cms/${route.params.id}`, payload);
    toast.success('Category updated successfully!');
    router.push('/cms/category');
  } catch (error) {
    console.error('Error updating category:', error);
    toast.error('Failed to update category. Please complete all fields.');
  }
};

onMounted(async () => {
  await fetchSegments();
  await fetchCategoryDetail();
});
</script>

<template>
  <div class="mt-6 p-4 bg-white shadow rounded-lg">
    <h3 class="text-3xl font-semibold text-gray-700 text-center border-b pb-2">Edit Category</h3>

    <form @submit.prevent="updateCategory">
      <div class="p-6 bg-white rounded-md shadow-md">
        <div class="grid grid-cols-1 gap-6">
          <!-- Category Name -->
          <div>
            <label for="categoryName" class="text-gray-700">Category Name</label>
            <input
              v-model="formData.categoryName"
              id="categoryName"
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter category name"
              required
            />
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="text-gray-700">Description</label>
            <textarea
              v-model="formData.description"
              id="description"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter description"
              rows="3"
              required
            ></textarea>
          </div>

          <!-- Segment Dropdown -->
          <div>
            <label for="segment" class="text-gray-700">Segment</label>
            <Multiselect
              v-model="formData.segment"
              :options="segments"
              label="name"
              track-by="id"
              placeholder="Select a segment"
              class="w-full"
            />
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end mt-4">
          <router-link to="/cms/category" class="px-4 py-2 bg-red-500 text-white rounded">Back</router-link>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded ml-2">Update</button>
        </div>
      </div>
    </form>
  </div>
</template>