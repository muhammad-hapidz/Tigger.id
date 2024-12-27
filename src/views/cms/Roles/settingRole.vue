<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import api from '@/Services/api';

// Ambil parameter ID dari route
const route = useRoute();
const router = useRouter();
const id = route.params.id;

// State
const role = ref(null);
const roleMenus = ref([]); // Menyimpan data role-menu
const menus = ref([]); // Menyimpan data menu
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

const fetchMenus = async () => {
  try {
    const response = await api.get('/Menu/Getall/cms');

    // Filter hanya menu yang aktif (isActive: true)
    menus.value = response.data
      .filter((menu) => menu.isActive) // Hanya pilih menu dengan isActive: true
      .map((menu) => ({
        ...menu,
        isActive: true, // Tetap tambahkan properti isActive ke true
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
      'https://apitiggerid.tri3a.com/api/RoleMenu/Getall/cms',
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    roleMenus.value = response.data;
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
    return {
      ...menu,
      isActive: isLinked, // Tandai isActive jika menu terhubung ke role
    };
  });
};

// Fungsi untuk menyimpan role-menu
const saveRoleMenus = async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      toast.error('Token autentikasi tidak ditemukan. Silakan login ulang.');
      return;
    }

    const selectedMenus = menus.value.filter((menu) => menu.isActive);
    const payload = selectedMenus.map((menu) => ({
      roleId: role.value.id,
      menuId: menu.id,
    }));

    for (const data of payload) {
      await axios.post(
        'https://apitiggerid.tri3a.com/api/RoleMenu/POST/cms',
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    }

    toast.success('Role Menu berhasil disimpan!');
    router.push('/cms/roles');
  } catch (error) {
    console.error('Error saving role menus:', error);
    toast.error('Gagal menyimpan Role Menu. Silakan coba lagi.');
  }
};

// Fungsi untuk kembali ke halaman sebelumnya
const goBack = () => {
  window.history.back();
};

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
                Hak Akses
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
                  class="w-5 h-5 text-indigo-600 rounded-md focus:ring-indigo-500"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pt-6 flex justify-end gap-2">
        <button
          type="button"
          @click="goBack"
          class="px-4 py-2 border border-slate-800 rounded-md hover:bg-slate-800 hover:text-white duration-200"
        >
          Back
        </button>
        <button
          type="button"
          @click="saveRoleMenus"
          class="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-600"
        >
          Save
        </button>
      </div>
    </div>

    <div v-else class="flex justify-center items-center min-h-screen">
      <p class="text-center text-red-500 text-xl font-semibold">
        Gagal memuat data. Silakan coba lagi nanti.
      </p>
    </div>
  </div>
</template>
