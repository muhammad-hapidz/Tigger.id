<script setup>
import { ref, computed, onMounted } from 'vue'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import axios from 'axios'
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'

// Import CSS
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'


// State Data
const segmentcategories = ref([])
const content = ref({
  title: '',
  segmentcategory: null,
  category: null,
  description: ''
})

// Fetch API
const fetchSegmentCategories = async () => {
  const authToken = localStorage.getItem('authToken')
  if (!authToken) {
    console.error('Auth token tidak ditemukan. Harap login terlebih dahulu.')
    return
  }
  try {
    const response = await axios.get('https://apitiggerid.tri3a.com/api/SegmentCategory')
    categories.value = response.data
  } catch (error) {
    console.error('Error fetching segmentcategories:', error)
  }
}

// Fungsi submit form (create)
const create = () => {
  console.log('Content Data:', content.value)
  alert('Form submitted successfully!')
}
const FilePond = vueFilePond()
const files = ref([])

// On Mount
onMounted(fetchSegmentCategories)
</script>

<template>
  <div>
    <!-- Judul Halaman -->
    <h3 class="text-3xl font-semibold text-gray-700">
      Create Content
    </h3>

    <!-- Section untuk form -->
    <div class="mt-8">
      <h4 class="text-gray-600">Forms</h4>

      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
          <h2 class="text-lg font-semibold text-gray-700 capitalize">
            Content Settings
          </h2>

          <form @submit.prevent="create">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2"> 
                <!-- Input title -->
                <div class="sm:col-span-2">
                <label class="text-gray-700" for="title">Title</label>
                <input
                  v-model="content.title"
                  id="title"
                  class="p-2 w-full mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="text"
                />
              </div>

              <!-- Input Category -->
              <div class="sm:col-span-2">
                <label class="text-gray-700" for="categories">Category</label>
                <select
                    v-model="content.segementcategory"
                    id="categories"
                    class="p-2 w-full mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                >
                <option
                        v-for="segementcategory in segmentcategories"
                        :key="segmentcategory.id"
                        :value="segmentcategory.segement.segmentName"
                    >
                        {{ segmentcategory.segement.segmentName }}
                    </option>
                </select>
                </div>
            </div>

            <!-- Input Segment -->
            <div class="sm:col-span-2 mt-4">
                <label class="text-gray-700" for="categories">Segment</label>
                <select
                    v-model="content.category"
                    id="categories"
                    class="p-2 w-full mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                >
                <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.categoryName"
                    >
                        {{ category.categoryName }}
                    </option>
                </select>
                </div>

                  <!-- Input Description -->
                  <div class="sm:col-span-2 mt-4">
                <label class="text-gray-700" for="description">Description</label>
                <textarea
                  v-model="content.description"
                  id="description"
                  rows="4"
                  class="p-2 w-full mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                ></textarea>
            </div>

            <!-- Tombol Submit -->
            <div class="flex justify-end mt-4">
              <button
                type="submit"
                class="px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              >
                Save
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
