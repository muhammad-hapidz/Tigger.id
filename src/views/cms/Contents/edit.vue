<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import axios from 'axios';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const router = useRouter();
const route = useRoute();
const contentId = route.params.id;

const content = ref({
  title: '',
  description: '',
  image: null,
  segment: null,
  category: null,
});

const segments = ref([]);
const categories = ref([]);
let quillEditor = null;

const filteredSegments = computed(() =>
  segments.value.map(segment => ({ id: segment.id, name: segment.segmentName }))
);

const filteredCategories = computed(() =>
  categories.value.filter(item => item.segment.segmentId === content.value.segment?.id)
);

const fetchSegments = async () => {
  const authToken = localStorage.getItem('authToken');
  try {
    const response = await axios.get('https://apitiggerid.tri3a.com/api/Segments/Getall/cms', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    segments.value = response.data;
  } catch (error) {
    console.error('Error fetching segments:', error);
  }
};

const fetchCategories = async () => {
  const authToken = localStorage.getItem('authToken');
  try {
    const response = await axios.get('https://apitiggerid.tri3a.com/api/Category/Getall/cms', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    categories.value = response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

const fetchContent = async () => {
  const authToken = localStorage.getItem('authToken');
  try {
    const response = await axios.get(`https://apitiggerid.tri3a.com/api/Contents/cms/${contentId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const data = response.data;
    content.value = {
      title: data.title,
      description: data.description,
      image: data.image,
      segment: segments.value.find(segment => segment.id === data.segmentId) || null,
      category: categories.value.find(category => category.id === data.categoryId) || null,
    };
    quillEditor.root.innerHTML = data.description;
  } catch (error) {
    console.error('Error fetching content:', error);
  }
};

const updateContent = async () => {
  const authToken = localStorage.getItem('authToken');

  // Ambil nilai dari Quill.js
  content.value.description = quillEditor.root.innerHTML;

  const payload = {
    title: content.value.title,
    description: content.value.description,
    image: content.value.image,
    segmentId: content.value.segment?.id || '',
    categoryId: content.value.category?.id || '',
  };

  try {
    const response = await axios.put(
      `https://apitiggerid.tri3a.com/api/Contents/cms/${contentId}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log('Content updated successfully:', response.data);
    alert('Content berhasil diperbarui!');
    router.push('/cms/Contents');
  } catch (error) {
    console.error('Error updating content:', error);
    alert('Gagal memperbarui content. Silakan coba lagi.');
  }
};

onMounted(() => {
  fetchSegments();
  fetchCategories();
  fetchContent();

  const quillContainer = document.getElementById('editor');
  quillEditor = new Quill(quillContainer, {
    theme: 'snow',
    placeholder: 'Edit the content description...',
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ],
    },
  });
});
</script>

<template>
  <div class="mt-6 p-4 bg-white shadow rounded-lg">
    <h3 class="text-3xl font-semibold text-gray-700 text-center underline">Edit Content</h3>
    <form @submit.prevent="updateContent">
      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 mb-14">
            <!-- Select Segment -->
            <div class="sm:col-span-2">
              <label class="text-gray-700" for="segment">Segment</label>
              <Multiselect
                class="border border-gray-300 rounded-md mt-2"
                v-model="content.segments"
                :options="filteredSegments"
                label="name"
                track-by="id"
                placeholder="Select a segment"
              />
            </div>

            <!-- Select Category -->
            <div class="sm:col-span-2">
              <label class="text-gray-700" for="category">Category</label>
              <Multiselect
                class="border border-gray-300 rounded-md mt-2"
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
              <div v-if="content.image" class="mt-4">
                <img :src="content.image" alt="Preview Image" class="w-auto h-64 object-cover rounded-md" />
              </div>
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
              <div v-if="content.image" class="mt-4">
                <img :src="content.image" alt="Preview Image" class="w-auto h-64 object-cover rounded-md" />
              </div>
            </div>

            <!-- Input Description -->
            <div class="sm:col-span-2 mt-4">
              <label class="text-gray-700" for="description">Description</label>
              <div id="editor" class="border border-gray-300 rounded-md p-2 w-full h-auto"></div>
            </div>
          </div>
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
            Update Content
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
