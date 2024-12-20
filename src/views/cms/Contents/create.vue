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
    const response = await axios.get(
      'https://apitiggerid.tri3a.com/api/SegmentCategory/Getall/cms',
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      }
    )
    segmentcategories.value = response.data
  } catch (error) {
    console.error('Error fetching segmentcategories:', error)
  }
}

// Hapus duplikat berdasarkan segmentName
const uniqueSegments = computed(() => {
  const seen = new Set()
  return segmentcategories.value.filter(item => {
    const name = item.segment.segmentName
    if (seen.has(name)) {
      return false
    }
    seen.add(name)
    return true
  })
})

// Filter Categories
const filteredCategories = computed(() =>
  segmentcategories.value.filter(
    item =>
      item.segment.segmentId === content.value.segmentcategory?.segmentId
  )
)

// Submit Function
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
    <h3 class="text-3xl font-semibold text-gray-700">Create Content</h3>

    <div class="mt-6">
      <router-link to="/cms/Contents">
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2">
          <svg class="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  
            <path stroke="none" d="M0 0h24v24H0z"/>  
            <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
          </svg>
          <span>Back</span>
        </button>
      </router-link>
    </div>


    <div class="mt-8">
      <h4 class="text-gray-600">Forms</h4>

      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
          <h2 class="text-lg font-semibold text-gray-700 capitalize">
            Content Settings
          </h2>

          <form @submit.prevent="create">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <!-- Select Segment -->
              <div class="sm:col-span-2">
                <label class="text-gray-700" for="segmentcategory">Segment</label>
                <Multiselect class="border border-gray-300 rounded-md"
                  v-model="content.segmentcategory"
                  :options="uniqueSegments.map(item => item.segment) "
                  label="segmentName"
                  placeholder="Select or Search Segment"
                />
              </div>

              <!-- Select Category -->
              <div class="sm:col-span-2">
                <label class="text-gray-700" for="category">Category</label>
                <Multiselect class="border border-gray-300 rounded-md"
                  v-model="content.category"
                  :options="filteredCategories.map(item => item.category)"
                  label="categoryName"
                  placeholder="Select or Search Category"
                  :disabled="!content.segmentcategory"
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
                />
              </div>

              <!-- Input Description -->
              <div class="sm:col-span-2">
                <label class="text-gray-700" for="description">Description</label>
                <textarea
                  v-model="content.description"
                  id="description"
                  rows="4"
                  class="p-2 w-full mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                ></textarea>
              </div>
            </div>

            <!-- Upload Image -->
            <div class="sm:col-span-2">
            <FilePond
              v-model="files"
              name="files"
              allow-multiple
              accepted-file-types="image/*"
              label-idle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              allow-image-preview
              image-preview-height="200"
            />
            </div>

            <!-- Submit Button -->
            <div class="sm:col-span-2 flex justify-end mt-8">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2"
              type="submit">
              <svg class="h-5 w-5 text-white-900"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />  <polyline points="17 21 17 13 7 13 7 21" />  <polyline points="7 3 7 8 15 8" /></svg>
                <span>Save</span>
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
