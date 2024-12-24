<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import axios from 'axios';

// Router instance
const router = useRouter();

// State Data
const content = ref({
  title: '',
  description: '',
  image: '',
  segment: null, // Segment yang dipilih
  category: null, // Category yang dipilih
});

// Data API
const segments = ref([]);
const categories = ref([]);

// Filtered Segments and Categories
const filteredSegments = computed(() =>
  segments.value.map(segment => ({
    id: segment.id,
    name: segment.segmentName,
  }))
);

const filteredCategories = computed(() =>
  categories.value.map(category => ({
    id: category.id,
    name: category.categoryName,
  }))
);

// Fetch Segments API
const fetchSegments = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.error('Auth token tidak ditemukan. Harap login terlebih dahulu.');
    return;
  }
  try {
    const response = await axios.get('https://apitiggerid.tri3a.com/api/Segments/Getall/cms', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    segments.value = response.data; // Simpan hasil API ke segments
  } catch (error) {
    console.error('Error fetching segments:', error);
  }
};

// Fetch Categories API
const fetchCategories = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.error('Auth token tidak ditemukan. Harap login terlebih dahulu.');
    return;
  }
  try {
    const response = await axios.get('https://apitiggerid.tri3a.com/api/Category/Getall/cms', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    categories.value = response.data; // Simpan hasil API ke categories
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

// Submit Function
const createContent = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.error('Auth token tidak ditemukan. Harap login terlebih dahulu.');
    return;
  }

  try {
    const payload = {
      title: content.value.title,
      description: content.value.description,
      image: content.value.image,
      segmentId: content.value.segment?.id || null, // Ambil ID dari segment yang dipilih
      categoryId: content.value.category?.id || null, // Ambil ID dari category yang dipilih
    };

    const response = await axios.post(
      'https://apitiggerid.tri3a.com/api/Contents/POST/cms',
      payload,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    console.log('Content created successfully:', response.data);
    alert('Content berhasil dibuat!');

    // Redirect ke halaman sebelumnya atau halaman /cms/Contents
    router.push('/cms/Contents');
  } catch (error) {
    console.error('Error creating content:', error);
    alert('Gagal membuat content. Silakan coba lagi.');
  }
};

// On Mounted
onMounted(() => {
  fetchSegments();
  fetchCategories();
});
</script>

<template>
  <div class="mt-6 p-4 bg-white shadow rounded-lg">
    <h3 class="text-3xl font-semibold text-gray-700 text-center underline">Create Content</h3>

    <div class="mt-4">
      <div class="p-6 bg-white rounded-md shadow-md">
        <form @submit.prevent="createContent">
          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <!-- Input Title -->
            <div class="sm:col-span-2">
              <label class="text-gray-700" for="title">Title</label>
              <input
                v-model="content.title"
                id="title"
                class="p-2 w-full mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="text"
                required
              />
            </div>

            <!-- Input Description -->
            <div class="sm:col-span-2">
              <label class="text-gray-700" for="description">Description</label>
              <textarea
                v-model="content.description"
                id="description"
                class="p-2 w-full mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                rows="4"
                required
              ></textarea>
            </div>

            <!-- Input Image -->
            <div class="sm:col-span-2">
              <label class="text-gray-700" for="image">Image URL</label>
              <input
                v-model="content.image"
                id="image"
                class="p-2 w-full mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="text"
              />
            </div>

            <!-- Select Segment -->
            <div class="sm:col-span-2">
              <label class="text-gray-700" for="segment">Segment</label>
              <Multiselect
                class="border border-gray-300 rounded-md"
                v-model="content.segment"
                :options="filteredSegments"
                label="name"
                track-by="id"
                placeholder="Select a segment"
                required
              />
            </div>

            <!-- Select Category -->
            <div class="sm:col-span-2">
              <label class="text-gray-700" for="category">Category</label>
              <Multiselect
                class="border border-gray-300 rounded-md"
                v-model="content.category"
                :options="filteredCategories"
                label="name"
                track-by="id"
                placeholder="Select a category"
                required
              />
            </div>
          </div>
        </form>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end gap-2 mt-4">
        <router-link
          to="/cms/Contents"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </router-link>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Content
        </button>
      </div>
    </div>
  </div>
</template>
