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

const segments = ref([]);
const categories = ref([]);
const imagePreviewUrl = ref(null); // Untuk menyimpan URL gambar preview

// Filtered Segments
const filteredSegments = computed(() =>
  segments.value.map(segment => ({ id: segment.id, name: segment.segmentName }))
);

// Filter Categories
const filteredCategories = computed(() =>
  categories.value.filter(
    item =>
      item.segment.segmentId === content.value.segment?.id
  )
)

// Fetch Segments API
const fetchSegments = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.error('Auth token tidak ditemukan. Harap login terlebih dahulu.');
    return;
  }
  try {
    const response = await axios.get('https://apitiggerid.tri3a.com/api/Segments/Getall/cms', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    segments.value = response.data;
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
      headers: { Authorization: `Bearer ${authToken}` },
    });
    categories.value = response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

// Handle Image Preview
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    content.value.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      imagePreviewUrl.value = reader.result;
    };
    reader.readAsDataURL(file);
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
      image: content.value.image, // Jika Anda ingin meng-upload gambar, gunakan objek File
      segmentId: content.value.segment?.id || null,
      categoryId: content.value.category?.id || null,
    };

    const response = await axios.post(
      'https://apitiggerid.tri3a.com/api/Contents/POST/cms',
      payload,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );

    console.log('Content created successfully:', response.data);
    alert('Content berhasil dibuat!');
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
                label="categoryName" 
                track-by="id"
                placeholder="Select or Search Category"
                :disabled="!content.segment"
              />
            </div>

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

            <!-- Input Image -->
            <div class="sm:col-span-2">
              <label class="text-gray-700" for="image">Image Upload</label>
              <input
                @change="handleImageUpload"
                type="file"
                id="image"
                class="p-2 w-full mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
              />
              <!-- Image Preview -->
              <div v-if="imagePreviewUrl" class="mt-4">
                <img :src="imagePreviewUrl" alt="Image Preview" class="w-auto h-64 object-cover rounded-md" />
              </div>
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
