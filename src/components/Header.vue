<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useSidebar } from '../composables/useSidebar'

const dropdownOpen = ref(false)
const { isOpen } = useSidebar()
const router = useRouter()

function logout() {
  localStorage.removeItem('authToken') // Hapus token
  router.push('/cms/login') // Redirect ke halaman login
}
</script>

<template>
  <header
    class="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600"
  >
    <div class="flex items-center">
      <button
        class="text-gray-500 focus:outline-none lg:hidden"
        @click="isOpen = true"
      >
        <svg
          class="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div class="flex items-center">
      <div class="relative">
        <button
          class="relative z-10 block w-50 h-8 px-4 py-1 overflow-hidden rounded-full shadow focus:outline-none 
          hover:bg-blue-600 hover:text-white transition-colors duration-200"
          @click="dropdownOpen = !dropdownOpen"
        >
          Hello! Admin
        </button>

        <div
          v-show="dropdownOpen"
          class="fixed inset-0 z-10 w-full h-full"
          @click="dropdownOpen = false"
        ></div>

        <transition
          enter-active-class="transition duration-150 ease-out transform"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in transform"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <div
            v-show="dropdownOpen"
            class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl"
          >
            <button
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
              @click="logout"
            >
              Log out
            </button>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>
