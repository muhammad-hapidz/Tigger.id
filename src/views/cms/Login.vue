<template>
  <div
    class="flex items-center justify-center h-screen bg-cover bg-center px-6 bg-login"
  >
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <img
          src="@/assets/img/logo.png"
          alt="Logo Tigger ID"
          class="w-24 h-24"
        />
      </div>

      <form class="mt-4" @submit.prevent="login">
        <label class="block">
          <span class="text-sm text-gray-700">Username</span>
          <input
            v-model="username"
            type="text"
            class="p-2 block w-full mt-1 border border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          />
        </label>

        <label class="block mt-3">
          <span class="text-sm text-gray-700">Password</span>
          <input
            v-model="password"
            type="password"
            class="p-2 block w-full mt-1 border border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
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
import { useToast } from 'vue-toastification'; // Import useToast from Vue Toast

const router = useRouter()
const username = ref('')
const password = ref('')
const toast = useToast(); // Initialize toast

// Fungsi Login
async function login() {
  try {
    const response = await axios.post(
      'https://apitiggerid.tri3a.com/api/Auth/login',
      {
        username: username.value,
        password: password.value,
      }
    )

    const token = response.data.token
    if (token) {
      // Simpan token ke Local Storage
      localStorage.setItem('authToken', token)
      
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
  background-position: center; /* Pusatkan gambar */
  background-repeat: no-repeat; /* Hindari pengulangan gambar */
}
</style>
