<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const content = ref(null);

const fetchContent = async () => {
  const authToken = localStorage.getItem('authToken');
  const contentId = route.params.id; // ID konten dari parameter route

  try {
    const response = await axios.get(`https://apitiggerid.tri3a.com/api/Contents/cms/${contentId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    content.value = response.data;
  } catch (error) {
    console.error('Error fetching content:', error);
    alert('Gagal mengambil detail konten. Silakan coba lagi.');
  }
};

// Format tanggal
const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes} ${day}/${month}/${year}`;
}


onMounted(() => {
  fetchContent();
});
</script>
<template>
  <div class="mt-6 p-4 bg-white shadow rounded-lg">
    <h3 class="text-3xl font-semibold text-gray-700 text-center underline">Content Details</h3>
    
    <div v-if="content" class="p-6 bg-white rounded-md shadow-md mt-4">
      <!-- Title -->
      <div class="mb-4">
        <label class="text-gray-700">Title :</label>
        <p class="font-semibold p-2">{{ content.title }}</p>
      </div>

      <!-- Segment -->
      <div class="mb-4">
        <label class="text-gray-700">Segment</label>
        <p class="font-semibold p-2">{{ content.segments.segmentName }}</p>
      </div>

      <!-- Category -->
      <div class="mb-4">
        <label class="text-gray-700">Category</label>
        <p class="font-semibold p-2">{{ content.category.categoryName }}</p>
      </div>

      <!-- Image -->
      <div class="mb-4" v-if="content.image">
        <label class="text-gray-700">Image</label>
        <img :src="content.image" alt="Content Image" class="w-auto h-64 object-cover rounded-md p-2" />
      </div>

      <!-- Description -->
      <div class="mb-4">
        <label class="text-gray-700">Description</label>
        <div v-html="content.description" class="border border-gray-300 rounded-md p-2 mt-2"></div>
      </div>

      <!-- Category -->
      <div class="mb-4">
        <label class="text-gray-700">Create By</label>
        <p class="font-semibold p-2">{{ content.createdBy }}</p>
      </div>

      <div class="mb-4">
        <label class="text-gray-700">Create Date</label>
        <p class="font-semibold p-2">{{ formatDate(content.createdDate) }}</p>
      </div>

      <div class="mb-4" v-if="content.updatedBy">
        <label class="text-gray-700">Updated By</label>
        <p class="font-semibold p-2">{{ content.updatedBy }}</p>
      </div>

      <div class="mb-4" v-if="content.updatedDate">
        <label class="text-gray-700">Updated Date</label>
        <p class="font-semibold p-2">{{ formatDate(content.updatedDate) }}</p>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <router-link
          to="/cms/Contents"
          class="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
          <span>Back</span>
        </router-link>
        <router-link 
        :to="{ name: 'contentEdit', params: { id: content.id } }"
        class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit
        </router-link>
      </div>
    </div>
  </div>
</template>
