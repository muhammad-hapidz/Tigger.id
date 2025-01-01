<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const contents = ref([])
const users = ref([])
const fullName = localStorage.getItem('fullName');
const authToken = localStorage.getItem('authToken')

// Ref untuk nilai yang akan ditampilkan dengan animasi
const displayedUsers = ref(0)
const displayedContents = ref(0)

// Computed untuk menghitung total data
const totalUsers = computed(() => users.value.length)
const totalContents = computed(() => contents.value.length)

// Fungsi untuk menjalankan animasi angka
const animateNumber = (start, end, duration, refValue) => {
  const startTime = performance.now()

  const updateNumber = (currentTime) => {
    const elapsedTime = currentTime - startTime
    const progress = Math.min(elapsedTime / duration, 1) // Progress antara 0 hingga 1
    refValue.value = Math.floor(start + (end - start) * progress)

    if (progress < 1) {
      requestAnimationFrame(updateNumber) // Lanjutkan animasi
    }
  }

  requestAnimationFrame(updateNumber) // Mulai animasi
}

// Fungsi untuk mengambil data API
const fetchUsers = async () => {
  try {
    const response = await axios.get(
      'https://apitiggerid.tri3a.com/api/Users/Getall/cms',
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
    users.value = response.data

    // Animasi angka untuk total users
    animateNumber(0, totalUsers.value, 1500, displayedUsers)
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

const fetchContents = async () => {
  try {
    const response = await axios.get(
      'https://apitiggerid.tri3a.com/api/Contents/Getall/cms',
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
    contents.value = response.data

    // Animasi angka untuk total contents
    animateNumber(0, totalContents.value, 1500, displayedContents)
  } catch (error) {
    console.error('Error fetching contents:', error)
  }
}

// Ambil data ketika komponen di-mount
onMounted(async () => {
  await Promise.all([fetchUsers(), fetchContents()])
})
</script>

<template>
  <div class="mt-6 p-4 bg-white shadow rounded-lg">
    <h3 class="text-3xl font-medium text-gray-700 border-b pb-2">
      Dashboard
    </h3>

    <div class="mt-4">
      <h2 class="text-2xl font-semibold text-gray-700 text-center border-b pb-2">Welcome, {{ fullName }}</h2>
      <p class="mt-2 text-justify text-indent-8">CHERY COMMUNITY INDONESIA
        <b>Tigger.id </b> adalah Komunitas Eksklusif khusus pengguna dan pemilik Chery Tiggo Series di Indonesia. Berdiri pada tanggal 19 Juli 2024 dengan dukungan dari pihak Chery Sales Indonesia (CSI). Berdiri pada tanggal 19 Juli 2024 oleh beberapa pengguna Chery Tiggo dengan dukungan dari pihak Chery Sales Indonesia (CSI). Komunitas Tigger.id berbentuk non-profit yang bertujuan sebagai wadah berkumpul, tukar pikiran, diskusi, dan having fun bagi seluruh Tiggo owners di Indonesia.</p>

      </div>

    <div class="mt-4">
      <div class="flex flex-wrap -mx-6">
        <div class="w-full px-6 sm:w-1/2 xl:w-1/2">
          <router-link to="/cms/users" class="flex items-center px-5 py-6 bg-indigo-300 border rounded-md shadow hover:bg-indigo-400 transition duration-200">
            <div class="p-3 bg-white rounded-full">
              <svg
                class="w-8 h-8 text-indigo-300"
                viewBox="0 0 28 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                  fill="currentColor"
                />
                <path
                  d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                  fill="currentColor"
                />
                <path
                  d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                  fill="currentColor"
                />
                <path
                  d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                  fill="currentColor"
                />
                <path
                  d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                  fill="currentColor"
                />
                <path
                  d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">
                {{ displayedUsers }}
              </h4>
              <div class="text-gray-500">
                Total Users
              </div>
            </div>
        </router-link>
        </div>

        <div class="w-full px-6 mt-6 sm:w-1/2 xl:w-1/2 sm:mt-0">
          <router-link to="/cms/contents" class="flex items-center px-5 py-6 bg-green-300 border rounded-md shadow hover:bg-green-400 transition duration-200">
            <div class="p-3 bg-white bg-opacity-75 rounded-full">
              <svg class="h-8 w-8 text-green-300"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">
                {{ displayedContents }}
              </h4>
              <div class="text-gray-500">
                Total Contents
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
