<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import axios from 'axios';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useToast } from 'vue-toastification'; // Import useToast from Vue Toast

const router = useRouter();
const route = useRoute();
const contentId = route.params.id;
const toast = useToast(); // Initialize toast

const content = ref({
  title: '',
  description: '',
  image: null,
  segment: null,
  category: null,
});

const segments = ref([]);
const categories = ref([]);
const fCategories = ref([]);
let quillEditor = null;

// const filteredSegments = computed(() =>
//   segments.value.map(segment => ({ id: segment.id, name: segment.segmentName }))
// );




// const fetchSegments = async () => {
//   const authToken = localStorage.getItem('authToken');
//   try {
//     const response = await axios.get('https://apiweb3a.tri3a.com/api/Segments/Getall/cms', {
//       headers: { Authorization: `Bearer ${authToken}` },
//     });
//     segments.value = response.data;
//   } catch (error) {
//     console.error('Error fetching segments:', error);
//   }
// };

const fetchSegments = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    toast.error('Auth token tidak ditemukan. Harap login terlebih dahulu.');
    return;
  }

  try {
    const response = await axios.get('https://apiweb3a.tri3a.com/api/Segments/Getall/cms', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    segments.value = response.data.map(segment => ({
      id: segment.id,
      name: segment.segmentName, // Pastikan name sesuai dengan label di Multiselect
    }));
  } catch (error) {
    console.error('Error fetching segments:', error);
    toast.error('Gagal mengambil data segments.');
  }
};

// const fetchCategories = async () => {
//   const authToken = localStorage.getItem('authToken');
//   try {
//     const response = await axios.get('https://apiweb3a.tri3a.com/api/Category/Getall/cms', {
//       headers: { Authorization: `Bearer ${authToken}` },
//     });
//     categories.value = response.data;
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//   }
// };

const fetchCategories = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    toast.error('Auth token tidak ditemukan. Harap login terlebih dahulu.');
    return;
  }

  try {
    const response = await axios.get('https://apiweb3a.tri3a.com/api/Category/Getall/cms', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    fCategories.value = response.data
    

    categories.value = response.data.map(category => ({
      id: category.id,
      categoryName: category.categoryName, // Pastikan name sesuai dengan label di Multiselect
    }));

  } catch (error) {
    console.error('Error fetching segments:', error);
    toast.error('Gagal mengambil data segments.');
  }
};


const filteredCategories = computed(() =>
fCategories.value.filter(item => item.segment.segmentId === content.value.segment?.id)
);


const fetchContent = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.error('Auth token tidak ditemukan. Harap login terlebih dahulu.');
    return;
  }

  try {
    const response = await axios.get(`https://apiweb3a.tri3a.com/api/Contents/cms/${contentId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const data = response.data;

    // Validasi segments dan categories
    const contentSegment = segments.value.find(segment => segment.id === data.segments.segmentId) || null;
    const contentCategory = categories.value.find(category => category.id === data.category.categoryId) || null;

    content.value = {
      title: data.title,
      description: data.description,
      image: data.image,
      segment: contentSegment,
      category: contentCategory,
    };

    // Pastikan quillEditor terdefinisi sebelum diakses
    if (quillEditor && quillEditor.root) {
      quillEditor.root.innerHTML = data.description;
    } else {
      console.warn('quillEditor belum diinisialisasi.');
    }
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
      `https://apiweb3a.tri3a.com/api/Contents/cms/${contentId}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log('Content updated successfully:', response.data);
    toast.success('Content berhasil diperbarui!');
    router.push('/cms/contents');
  } catch (error) {
    console.error('Error updating content:', error);
    toast.error('Gagal memperbarui content. Silakan coba lagi. Pastikan Category Sesuai Dengan Segment yang anda pilih');
  }
};

const initializeQuillEditor = () => {
  const quillContainer = document.getElementById('editor');
  quillEditor = new Quill(quillContainer, {
    theme: 'snow',
    placeholder: 'Edit the content description...',
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ],
    },
  });

  // Set nilai awal jika sudah ada data deskripsi
  if (content.value.description) {
    quillEditor.root.innerHTML = content.value.description;
  }
};

onMounted(async () => {
  await fetchSegments();
  await fetchCategories();
  await fetchContent();
  initializeQuillEditor();
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
                v-model="content.segment"
                :options="segments"
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
