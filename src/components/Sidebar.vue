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
          :key="menuItem.menu.id"
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[ $route.path.startsWith(menuItem.menu.menuUrl) ? activeClass : inactiveClass ]"
          :to="menuItem.menu.menuUrl"
        >
          <!-- Render Icon dynamically from API -->
          <div v-html="menuItem.menu.icon" class="h-6 w-6 text-gray-500"></div>
          <span class="mx-4">{{ menuItem.menu.menuName }}</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>
