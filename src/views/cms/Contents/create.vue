<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import axios from 'axios';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useToast } from 'vue-toastification'; // Import useToast from Vue Toast

const router = useRouter();
const toast = useToast(); // Initialize toast

const content = ref({
  title: '',
  description: '',
  image: null, // URL gambar setelah upload
  segment: null,
  category: null,
});

const previousImage = ref(null); // Menyimpan URL gambar lama
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

const uploadImage = async (file) => {
  const authToken = localStorage.getItem('authToken');
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post(
      'https://apitiggerid.tri3a.com/api/UploadImage/upload-image/cms',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log('Image uploaded successfully:', response.data);
    return `https://apitiggerid.tri3a.com/${response.data.imagePath}`;
  } catch (error) {
    console.error('Error uploading image:', error);
    toast.error('Gagal mengunggah gambar. Silakan coba lagi.');
    throw error;
  }
};

const deleteImage = async (imagePath) => {
  const authToken = localStorage.getItem('authToken');

  try {
    const response = await axios.delete(
      `https://apitiggerid.tri3a.com/api/UploadImage/delete-image`,
      {
        data: { imagePath }, // Hanya kirim path relatif
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    console.log('Image deleted successfully:', response.data);
  } catch (error) {
    console.error('Error deleting image:', error.response?.data || error.message);
    toast.error('Gagal menghapus gambar lama. Silakan coba lagi.');
  }
};


const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      // Upload gambar baru
      const newImagePath = await uploadImage(file);

      // Hapus gambar lama jika ada
      if (content.value.image) {
        // Ambil path relatif dari URL gambar lama
        const oldImagePath = content.value.image.split('/')[1];
        if (oldImagePath) {
          await deleteImage(oldImagePath); // Kirim path relatif ke API
        }
      }

      // Simpan URL gambar baru
      content.value.image = newImagePath;
      toast.success('Gambar berhasil diunggah!');
    } catch (error) {
      console.error('Error handling image upload:', error.response?.data || error.message);
    }
  }
};


const createContent = async () => {
  const authToken = localStorage.getItem('authToken');

  // Ambil nilai dari Quill.js
  content.value.description = quillEditor.root.innerHTML;

  // Buat payload JSON
  const payload = {
    title: content.value.title,
    description: content.value.description,
    image: content.value.image, // URL gambar
    segmentId: content.value.segment?.id || '',
    categoryId: content.value.category?.id || '',
  };

  try {
    const response = await axios.post(
      'https://apitiggerid.tri3a.com/api/Contents/POST/cms',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    console.log('Content created successfully:', response.data);
    toast.success('Content berhasil dibuat!');
    router.push('/cms/contents');
  } catch (error) {
    console.error('Error creating content:', error);
    toast('Gagal membuat content. Silakan coba lagi.');
  }
};

onMounted(() => {
  fetchSegments();
  fetchCategories();

  const quillContainer = document.getElementById('editor');
  quillEditor = new Quill(quillContainer, {
    theme: 'snow',
    placeholder: 'Write the content description...',
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        // ['image', 'code-block'],
        // [{ list: 'ordered' }, { list: 'bullet' }],
      ],
    },
  });
});
</script>



<template>
  <div class="mt-6 p-4 bg-white shadow rounded-lg">
    <h3 class="text-3xl font-semibold text-gray-700 text-center underline">Create Content</h3>
    <form @submit.prevent="createContent">
      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 mb-14">
            <!-- Select Segment -->
            <div class="sm:col-span-2">
              <label class="text-gray-700" for="segment">Segment</label>
              <Multiselect
                class="border border-gray-300 rounded-md mt-2"
                v-model="content.segment"
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
            to="/cms/contents"
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
    </form>
  </div>
</template>

