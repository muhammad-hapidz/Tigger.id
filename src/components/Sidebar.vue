<template>
  <div class="flex">
    <!-- Backdrop -->
    <div
      :class="isOpen ? 'block' : 'hidden'"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
      @click="isOpen = false"
    />
    <!-- End Backdrop -->

    <div
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0"
    >
      <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">
          <img
            src="@/assets/img/logotigger.png"
            alt="Logo Tigger ID"
            class="w-16 h-16 bg-white"
          />
          <span class="mx-2 text-2xl font-semibold text-white">TIGGER.ID</span>
        </div>
      </div>

      <nav class="mt-10">
        <router-link
          v-for="menuItem in menu"
          :key="menuItem.id"
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[ $route.path.startsWith(menuItem.menu.menuUrl) ? activeClass : inactiveClass ]"
          :to="menuItem.menu.menuUrl"
        >
          <!-- SVG Icon based on menuItem.menu.menuUrl -->
          <div>
            <template v-if="menuItem.menu.menuUrl === '/cms/Users'">
              <svg
                class="h-6 w-6 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </template>
            <template v-else-if="menuItem.menu.menuUrl === '/cms/dashboard'">
              <svg
                class="h-6 w-6 text-gray-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="12" cy="13" r="2" />
                <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
              </svg>
            </template>
            
            <template v-else-if="menuItem.menu.menuUrl === '/cms/Contens'">
              <svg
                class="h-6 w-6 text-gray-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="12" cy="13" r="2" />
                <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
              </svg>
            </template>
            <template v-else>
              <!-- Default SVG -->
              <svg class="h-6 w-6 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <line x1="12" y1="2" x2="12" y2="6" />  <line x1="12" y1="18" x2="12" y2="22" />  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />  <line x1="2" y1="12" x2="6" y2="12" />  <line x1="18" y1="12" x2="22" y2="12" />  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" /></svg>
            </template>
          </div>
          <span class="mx-4">{{ menuItem.menu.menuName }}</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>


<script setup>
import { ref,onMounted  } from 'vue'
import { useSidebar } from '../composables/useSidebar'
import api from '@/Services/api';
const { isOpen } = useSidebar()
const menu = ref([]);

// Fungsi untuk mengambil data menu
const fetchMenu = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const roleId = localStorage.getItem('userRoleId'); // Ambil roleId dari localStorage
    console.log(roleId);
    if (!token) {
      alert('Token tidak ditemukan. Silakan login.');
      window.location.href = '/cms/login';
      return;
    }
    const response = await api.get(`/RoleMenu/role/${roleId}`, {
      headers: { Authorization: `Bearer ${token}` }, // Tambahkan token ke header
    });
    menu.value = response.data || [];
  } catch (error) {
    console.error('Error fetching menu:', error);
    alert('Gagal mengambil data Menu. Silakan coba lagi.');
  }
};

// Kelas aktif dan tidak aktif
const activeClass = 'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100';
const inactiveClass = 'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100';

// Ambil data menu saat komponen dimuat
onMounted(fetchMenu);
</script>