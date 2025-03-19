<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

// State
const route = useRoute()
const userId = route.params.id
const user = ref(null)

// Fungsi untuk mengambil data detail user
const fetchUserDetail = async () => {
  const authToken = localStorage.getItem('authToken')

  if (!authToken) {
    console.error('Auth token tidak ditemukan. Harap login terlebih dahulu.')
    return
  }

  try {
    const response = await axios.get(
      `https://apiweb3a.tri3a.com/api/Users/cms/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      }
    )
    user.value = response.data
  } catch (error) {
    console.error('Kesalahan saat mengambil data detail user:', error)
  }
}

// Format tanggal
const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

onMounted(fetchUserDetail)
</script>

<template>
  <div class="mt-6 p-4 bg-white shadow rounded-lg">
    <h3 class="text-gray-700 text-3xl font-medium text-center underline underline-offset-2">User Detail</h3>


    <div v-if="user" class="mt-6 p-4 bg-white shadow rounded-lg">
      <p class="text-lg font-semibold">Name: <span class="text-gray-600">{{ user.fullName }}</span></p>
      <p class="text-lg font-semibold">Username: <span class="text-gray-600">{{ user.userName }}</span></p>
      <p class="text-lg font-semibold">Email: <span class="text-gray-600">{{ user.email }}</span></p>
      <p class="text-lg font-semibold">Role: <span class="text-gray-600">{{ user.role?.roleName }}</span></p>
      <p class="text-lg font-semibold">Status: 
        <span :class="user.isActive ? 'text-blue-500' : 'text-red-500'">
          {{ user.isActive ? 'Active' : 'Non Active' }}
        </span>
      </p>
      <p class="text-lg font-semibold">Created By: <span class="text-gray-600">{{ user.createdBy }}</span></p>
      <p class="text-lg font-semibold">Updated By: <span class="text-gray-600">{{ user.updatedBy }}</span></p>
      <p class="text-lg font-semibold">Created Date: <span class="text-gray-600">{{ formatDate(user.createdDate) }}</span></p>
      <p class="text-lg font-semibold">Update Date: <span class="text-gray-600">{{ formatDate(user.updatedDate) }}</span></p>
    </div>

    <div v-else class="mt-6 text-gray-500">Loading user details...</div>
    <div class="flex justify-end gap-2">
        <router-link
        to="/cms/Users"
        class="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
        <span>Back</span>
        </router-link>
        <router-link 
        :to="{ name: 'userEdit', params: { id: userId.id } }"
        class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit
        </router-link>
    </div>
  </div>
</template>
