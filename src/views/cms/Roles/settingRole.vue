<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import api from '@/Services/api';
import debounce from 'lodash/debounce';

const route = useRoute();
const id = route.params.id;

// State
const role = ref(null);
const menus = ref([]);
const roleMenus = ref([]);
const isLoading = ref(true);
const toast = useToast();

// Fungsi untuk mengambil detail role
const fetchRole = async () => {
  try {
    const response = await api.get(`/Roles/cms/${id}`);
    role.value = response.data;
  } catch (error) {
    console.error('Error fetching role:', error);
    role.value = null;
  }
};

// Fungsi untuk mengambil data menu
const fetchMenus = async () => {
  try {
    const response = await api.get('/Menu/Getall/cms');
    menus.value = response.data.map((menu) => ({
      ...menu,
      isActive: false, // Default
    }));
  } catch (error) {
    console.error('Error fetching menus:', error);
    menus.value = [];
  }
};

// Fungsi untuk mengambil data role-menu
const fetchRoleMenus = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.error('Auth token tidak ditemukan. Harap login terlebih dahulu.');
    return;
  }

  try {
    const response = await axios.get(
      'https://apiweb3a.tri3a.com/api/RoleMenu/Getall/cms',
      { headers: { Authorization: `Bearer ${authToken}` } }
    );

    roleMenus.value = response.data.map((item) => ({
      roleMenuId: item.roleMenuId,
      roleId: item.role?.roleId, // Pastikan data sesuai
      menuId: item.menu?.id,     // Ambil ID menu
    }));
  } catch (error) {
    console.error('Error fetching role menus:', error);
    roleMenus.value = [];
  }
};



// Sinkronisasi menu dengan role-menu
const synchronizeMenusWithRoleMenus = () => {
  if (!role.value || !roleMenus.value || !menus.value) return;

  menus.value = menus.value.map((menu) => {
    const isLinked = roleMenus.value.some(
      (roleMenu) =>
        roleMenu.menuId === menu.id && roleMenu.roleId === role.value.id
    );
    return { ...menu, isActive: isLinked };
  });

  console.log('Menus:', menus.value);
  console.log('RoleMenus:', roleMenus.value);
};

// Update hak akses role-menu
const updateRoleMenu = debounce(async (menu) => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    toast.error('Token autentikasi tidak ditemukan. Silakan login ulang.');
    return;
  }

  try {
    if (menu.isActive) {
      // Tambahkan akses
      await axios.post(
        'https://apiweb3a.tri3a.com/api/RoleMenu/POST/cms',
        { roleId: role.value.id, menuId: menu.id },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      toast.success(`Menu "${menu.menuName}" berhasil ditambahkan.`);
    } else {
      // Hapus akses
      const roleMenu = roleMenus.value.find(
        (rm) => rm.menuId === menu.id && rm.roleId === role.value.id
      );
      if (roleMenu) {
        await axios.delete(
          `https://apiweb3a.tri3a.com/api/RoleMenu/cms/${roleMenu.roleMenuId}`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        toast.warning(`Menu "${menu.menuName}" berhasil dihapus.`);
      } else {
        console.warn('Role menu tidak ditemukan untuk penghapusan.');
      }
    }

    // Refresh data role-menu dan sinkronkan ulang
    await fetchRoleMenus();
    synchronizeMenusWithRoleMenus();
  } catch (error) {
    console.error('Error updating role menu:', error);
    toast.error(`Gagal memperbarui menu "${menu.menuName}".`);
    menu.isActive = !menu.isActive; // Revert checkbox jika gagal
  }
}, 300);


// Ambil data saat komponen di-mount
onMounted(async () => {
  isLoading.value = true;
  await Promise.all([fetchRole(), fetchMenus(), fetchRoleMenus()]);
  synchronizeMenusWithRoleMenus();
  isLoading.value = false;
});
</script>

<template>
  <div class="container mx-auto p-6">
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
      <p class="text-center text-blue-500 text-xl font-semibold animate-pulse">
        Memuat Data ...
      </p>
    </div>

    <div v-else-if="role" class="bg-white shadow-md rounded-lg p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 text-center">
        Setting Roles Menu Access Rights
      </h1>
      <ul class="space-y-4 mb-6">
        <li class="flex">
          <span class="font-semibold text-gray-600 w-40">Role:</span>
          <span class="text-gray-800">{{ role.roleName }}</span>
        </li>
      </ul>

      <div class="overflow-x-auto">
        <table class="min-w-full leading-normal border-collapse border border-gray-200">
          <thead>
            <tr>
              <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b">
                No
              </th>
              <th class="px-5 py-3 text-xs font-semibold text-center text-gray-600 uppercase bg-gray-100 border-b">
                Menu Name
              </th>
              <th class="px-5 py-3 text-xs font-semibold text-center text-gray-600 uppercase bg-gray-100 border-b">
                Access Rights
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(menu, index) in menus" :key="menu.id">
              <td class="px-5 py-5 text-sm bg-white border-b">{{ index + 1 }}</td>
              <td class="px-5 py-5 text-sm bg-white border-b text-center">{{ menu.menuName }}</td>
              <td class="px-5 py-5 text-sm bg-white border-b text-center">
                <input
                  type="checkbox"
                  v-model="menu.isActive"
                  @change="updateRoleMenu(menu)"
                  class="w-5 h-5 text-indigo-600 rounded-md focus:ring-indigo-500"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-end gap-2">
        <router-link
          to="/cms/roles"
          class="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <span>Back</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
