<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const username = ref('')
const password = ref('')

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
      alert('Login berhasil!')
      
      // Redirect setelah login
      router.push('/cms/dashboard') 
    } else {
      alert('Login gagal. Silakan periksa kredensial Anda.')
    }
  } catch (error) {
    console.error('Error during login:', error)
    alert('Kesalahan login! Silakan coba lagi.')
  }
}
</script>

<template>
  <div
    class="flex items-center justify-center h-screen px-6"
    style="background: url('/src/assets/img/2.png') no-repeat center center / cover"
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
