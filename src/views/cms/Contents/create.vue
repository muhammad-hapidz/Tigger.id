<template>
  <div>
    <!-- Judul Halaman -->
    <h3 class="text-3xl font-semibold text-gray-700">Create Content</h3>

    <!-- Section untuk form -->
    <div class="mt-8">
      <h4 class="text-gray-600">Forms</h4>

      <!-- Form Section -->
      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
          <h2 class="text-lg font-semibold text-gray-700 capitalize">
            Content Settings
          </h2>

          <form @submit.prevent="create">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <!-- Input Segment -->
              <div class="sm:col-span-2 mt-4">
                <label class="text-gray-700" for="segmentcategories">Menu</label>
                <select
                  v-model="content.segementcategory"
                  id="segmentcategories"
                  class="p-2 w-full mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                >
                  <option value="" disabled>Select Segment</option>
                  <option
                    v-for="segment in uniqueSegments"
                    :key="segment"
                    :value="segment"
                  >
                    {{ segment }}
                  </option>
                </select>
              </div>

              <!-- Input Category -->
              <div class="sm:col-span-2 mt-4">
                <label class="text-gray-700" for="categories">Category</label>
                <select
                  v-model="content.category"
                  id="categories"
                  class="p-2 w-full mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                >
                  <option value="" disabled>Select Category</option>
                  <option
                    v-for="category in filteredCategories"
                    :key="category"
                    :value="category"
                  >
                    {{ category }}
                  </option>
                </select>
              </div>

              <!-- Input Title -->
              <div class="sm:col-span-2">
                <label class="text-gray-700" for="title">Title</label>
                <input
                  v-model="content.title"
                  id="title"
                  class="p-2 w-full mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="text"
                  placeholder="Enter title"
                />
              </div>

              <!-- Input Description -->
              <div class="sm:col-span-2 mt-4">
                <label class="text-gray-700" for="description">Description</label>
                <textarea
                  v-model="content.description"
                  id="description"
                  rows="4"
                  class="p-2 w-full mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  placeholder="Enter description"
                ></textarea>
              </div>
              
              <!--  -->
              <div class="">
              <input type="file" name="" id="" placeholder="">
              <!--  -->
            </div>

              <!-- Tombol Submit -->
              <div class="flex justify-end mt-4">
                <button
                  type="submit"
                  class="px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                >
                  Submit
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// State untuk data segment categories
const segmentcategories = ref([]); // Data segment categories dari API
const content = ref({
  title: '',
  segementcategory: '',
  category: '',
  description: '',
});

// Ambil data segment unique
const uniqueSegments = computed(() =>
  Array.from(new Set(segmentcategories.value.map((item) => item.segment.segmentName)))
);

// Ambil data kategori berdasarkan segment yang dipilih
const filteredCategories = computed(() => {
  if (!content.value.segementcategory) return [];
  return segmentcategories.value
    .filter((item) => item.segment.segmentName === content.value.segementcategory)
    .map((item) => item.category.categoryName);
});

// Fungsi untuk fetch segment categories
const fetchSegmentCategories = async () => {
  try {
    const response = await axios.get('https://apitiggerid.tri3a.com/api/SegmentCategory');
    segmentcategories.value = response.data;
  } catch (error) {
    console.error('Error fetching segment categories:', error);
  }
};

// Fungsi submit form untuk mengirim data ke API
const create = async () => {
  // Validasi form
  if (!content.value.title || !content.value.segementcategory || !content.value.category) {
    alert('Please fill in all required fields!');
    return;
  }

  // Data yang akan dikirim
  const formData = {
    title: content.value.title,
    segment: content.value.segementcategory,
    category: content.value.category,
    description: content.value.description,
  };

  try {
    // Mengirim data ke API
    const response = await axios.post('https://your-api-endpoint.com/create', formData);

    // Respon sukses
    if (response.status === 200) {
      alert('Form submitted successfully!');
      // Reset form setelah submit
      content.value = { title: '', segementcategory: '', category: '', description: '' };
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('There was an error submitting the form.');
  }
};

// Panggil data segment categories saat mounted
onMounted(fetchSegmentCategories);
</script>
