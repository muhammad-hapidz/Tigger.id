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

// Fungsi untuk mengambil data dari cache atau API
const fetchWithCache = async (key, fetchFunction, expiryInMs = 60000) => {
  const cachedData = localStorage.getItem(key);
  const cachedTime = localStorage.getItem(`${key}_time`);

  if (cachedData && cachedTime && Date.now() - cachedTime < expiryInMs) {
    return JSON.parse(cachedData); // Gunakan data dari cache jika masih valid
  }

  // Jika cache tidak valid, ambil data dari API
  const data = await fetchFunction();
  localStorage.setItem(key, JSON.stringify(data));
  localStorage.setItem(`${key}_time`, Date.now().toString());
  return data;
};


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
    const fetchMenusAPI = async () => {
      const response = await api.get('/Menu/Getall/cms');
      return response.data.map((menu) => ({
        ...menu,
        isActive: false, // Default
      }));
    };
    menus.value = await fetchWithCache('menus', fetchMenusAPI, 3600000); // Cache valid selama 1 jam
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
    const fetchRoleMenusAPI = async () => {
      const response = await axios.get(
        'https://apitiggerid.tri3a.com/api/RoleMenu/Getall/cms',
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      return response.data;
    };
    roleMenus.value = await fetchWithCache('roleMenus', fetchRoleMenusAPI, 60000); // Cache valid selama 1 menit
  } catch (error) {
    console.error('Error fetching role menus:', error);
    roleMenus.value = [];
  }
};


// Sinkronisasi menu dengan role-menu
const synchronizeMenusWithRoleMenus = () => {
  menus.value = menus.value.map((menu) => {
    const isLinked = roleMenus.value.some(
      (roleMenu) => roleMenu.menu.menuId === menu.id && roleMenu.role.roleId === role.value.id
    );
    return { ...menu, isActive: isLinked };
  });
};

const invalidateCache = (key) => {
  localStorage.removeItem(key);
  localStorage.removeItem(`${key}_time`);
};

const updateRoleMenu = debounce(async (menu) => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    toast.error('Token autentikasi tidak ditemukan. Silakan login ulang.');
    return;
  }

  try {
    if (menu.isActive) {
      await axios.post(
        'https://apitiggerid.tri3a.com/api/RoleMenu/POST/cms',
        { roleId: role.value.id, menuId: menu.id },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      toast.success(`Menu "${menu.menuName}" berhasil ditambahkan.`);
    } else {
      const roleMenu = roleMenus.value.find(
        (rm) => rm.menu.menuId === menu.id && rm.role.roleId === role.value.id
      );
      if (roleMenu) {
        await axios.delete(
          `https://apitiggerid.tri3a.com/api/RoleMenu/cms/${roleMenu.roleMenuId}`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        toast.warning(`Menu "${menu.menuName}" berhasil dihapus.`);
      } else {
        console.warn('Role menu tidak ditemukan untuk penghapusan.');
      }
    }

    // Invalidate cache dan refresh data
    invalidateCache('roleMenus');
    await fetchRoleMenus(); // Sinkronkan ulang data
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


