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
  :class="[
    $route.path.startsWith(menuItem.menu.menuUrl) ? activeClass : inactiveClass,
  ]"
  :to="menuItem.menu.menuUrl"
>
  <svg
    class="w-5 h-5"
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Placeholder SVG -->
    <path
      d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
      fill="currentColor"
    />
  </svg>
  <span class="mx-4">{{ menuItem.menu.menuName }}</span>
</router-link>
 </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useSidebar } from '../composables/useSidebar';
import api from '@/Services/api';

const { isOpen } = useSidebar();
const menu = ref([]);

// Fungsi untuk mengambil data menu
const fetchMenu = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const roleId = localStorage.getItem('userRoleId'); // Ambil roleId dari localStorage

    if (!token) {
      console.warn("Token tidak ditemukan. Menggunakan menu default.");
      menu.value = [
        { id: 1, name: "Home", path: "/" },
        { id: 2, name: "About Us", path: "/about" },
        { id: 3, name: "News & Event", path: "/news-and-event" },
        { id: 4, name: "Article", path: "/article" },
        { id: 5, name: "Tips & Trick", path: "/tips-and-trick" },
        { id: 6, name: "Join Us", path: "/join-us" },
      ];
      return;
    }

    const response = await api.get(`/RoleMenu/role/${roleId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Periksa apakah data ada dan valid
    if (!response.data || response.data.length === 0) {
      console.warn("Tidak ada menu ditemukan.");
      return;
    }

    // Urutkan menu berdasarkan 'no' dan pastikan setiap item memiliki menuUrl
    menu.value = response.data
      .filter(item => item.menu && item.menu.menuUrl)  // Hanya ambil yang memiliki menuUrl
      .sort((a, b) => a.menu.no - b.menu.no);  // Urutkan berdasarkan 'no'
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
