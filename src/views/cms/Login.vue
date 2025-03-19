<template>
  <div
    class="flex items-center justify-center h-screen bg-cover bg-center px-6 bg-login"
  >
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <img
          src="@/assets/img/logotigger.png"
          alt="Logo Tigger ID"
          class="w-28 h-28"
        />
      </div>

      <form class="mt-4" @submit.prevent="login">
        <label class="block">
          <span class="text-sm text-gray-700">Username</span>
          <input
            v-model="username"
            type="text"
            class="p-2 block w-full mt-1 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          />
        </label>

        <label class="block mt-3">
          <span class="text-sm text-gray-700">Password</span>
          <input
            v-model="password"
            type="password"
            class="p-2 block w-full mt-1 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          />
        </label>

        <div class="mt-6">
          <button
            type="submit"
            class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toastification' // Import useToast dari Vue Toast

const router = useRouter()
const username = ref('')
const password = ref('')
const toast = useToast() // Initialize toast

// Fungsi untuk mengambil Role Menu dan menyimpan allowedUrls
async function fetchRoleMenu(token, roleId) {
  try {
    const response = await axios.get(
      `https://apiweb3a.tri3a.com/api/RoleMenu/role/${roleId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    const allowedUrls = response.data.map((item) => item.menu.menuUrl) // Ambil URL dari menu
    localStorage.setItem('allowedUrls', JSON.stringify(allowedUrls)) // Simpan allowedUrls ke localStorage
    return allowedUrls
  } catch (error) {
    console.error('Error fetching RoleMenu:', error)
    return [] // Kembalikan array kosong jika gagal
  }
}

// Fungsi Login
async function login() {
  try {
    const response = await axios.post(
      'https://apiweb3a.tri3a.com/api/Auth/login',
      {
        username: username.value,
        password: password.value,
      }
    )

    const token = response.data.token
    const userRoleId = response.data.user.role.id
    const userId = response.data.user.id
    const fullName = response.data.user.fullName

    if (token) {
      // Simpan token dan informasi pengguna ke Local Storage
      localStorage.setItem('authToken', token)
      localStorage.setItem('userRoleId', userRoleId)
      localStorage.setItem('userId', userId)
      localStorage.setItem('fullName', fullName)

      // Panggil fetchRoleMenu untuk mendapatkan allowedUrls
      const allowedUrls = await fetchRoleMenu(token, userRoleId)
      console.log('Allowed URLs:', allowedUrls) // Debug log untuk memastikan data

      // Tampilkan alert login berhasil
      toast.success('Login berhasil!')

      // Redirect setelah login
      router.push('/cms/dashboard')
    } else {
      toast.error('Login gagal. Silakan periksa kredensial Anda.')
    }
  } catch (error) {
    console.error('Error during login:', error)
    toast.error('Kesalahan login! Silakan coba lagi.')
  }
}
</script>


<style scoped>
/* Kelas untuk menambahkan gambar sebagai background */
.bg-login {
  background-image: url('@/assets/img/2.png');
  background-size: cover; /* Pastikan gambar memenuhi layar */
  background-position: top; /* Fokuskan bagian atas gambar */
  background-repeat: no-repeat; /* Hindari pengulangan gambar */
  min-height: 100vh; /* Pastikan elemen mencakup seluruh tinggi layar */
  width: 100%; /* Pastikan elemen mencakup seluruh lebar layar */
}
</style>


