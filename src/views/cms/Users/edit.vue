<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const router = useRouter();
const route = useRoute();
const toast = useToast();

// State Data
const content = ref({
  fullName: '',
  userName: '',
  email: '',
  password: '', // Optional for edit
  role: null, // Role yang dipilih
  isActive: true, // Default aktif
});

const roles = ref([]); // Menyimpan semua role dari API

// Fetch Roles API
const fetchRoles = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    toast.error('Auth token tidak ditemukan. Harap login terlebih dahulu.');
    return;
  }

  try {
    const response = await axios.get('https://apitiggerid.tri3a.com/api/Roles/Getall/cms', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    roles.value = response.data.map(role => ({
      id: role.id,
      name: role.roleName, // Pastikan name sesuai dengan label di Multiselect
    }));
  } catch (error) {
    console.error('Error fetching roles:', error);
    toast.error('Gagal mengambil data roles.');
  }
};

// Fetch User Data API
const fetchUserData = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    toast.error('Auth token tidak ditemukan. Harap login terlebih dahulu.');
    return;
  }

  const userId = route.params.id;
  try {
    const response = await axios.get(`https://apitiggerid.tri3a.com/api/Users/cms/${userId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const userData = response.data;

    // Temukan role berdasarkan ID dari userData
    const userRole = roles.value.find(role => role.id === userData.role.id) || null;

    content.value = {
      fullName: userData.fullName,
      userName: userData.userName,
      email: userData.email,
      password: '', // Tidak menyertakan password
      role: userRole, // Tetapkan role default
      isActive: userData.isActive,
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    toast.error('Gagal mengambil data pengguna.');
  }
};

// Submit Function
const updateUser = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    toast.error('Auth token tidak ditemukan. Harap login terlebih dahulu.');
    return;
  }

  const userId = route.params.id;
  try {
    const payload = {
      fullName: content.value.fullName,
      userName: content.value.userName,
      email: content.value.email,
      roleId: content.value.role?.id,
      isActive: content.value.isActive,
    };

    if (!payload.fullName || !payload.userName || !payload.email || !payload.roleId) {
      toast.warning('Semua kolom wajib diisi.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      toast.warning('Format email tidak valid.');
      return;
    }

    await axios.put(`https://apitiggerid.tri3a.com/api/Users/cms/${userId}`, payload, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    toast.success('User berhasil diperbarui!');
    router.push('/cms/Users');
  } catch (error) {
    console.error('Error updating user:', error);
    toast.error(error.response.data.message);
  }
};

// On Mounted
onMounted(async () => {
  await fetchRoles(); // Pastikan roles sudah dimuat terlebih dahulu
  await fetchUserData(); // Setelah roles selesai, baru ambil data user
});
</script>

<template>
  <div class="mt-6 p-4 bg-white shadow rounded-lg">
    <h3 class="text-3xl font-semibold text-gray-700 text-center underline">Edit User</h3>

    <form @submit.prevent="updateUser">
      <div class="p-6 bg-white rounded-md shadow-md">
        <div class="grid grid-cols-1 gap-6">
          <!-- Full Name -->
          <div>
            <label for="fullName" class="text-gray-700">Full Name</label>
            <input
              v-model="content.fullName"
              id="fullName"
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              required
            />
          </div>

          <!-- Username -->
          <div>
            <label for="userName" class="text-gray-700">Username</label>
            <input
              v-model="content.userName"
              id="userName"
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              required
            />
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="text-gray-700">Email</label>
            <input
              v-model="content.email"
              id="email"
              type="email"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              required
            />
          </div>

          <!-- Role -->
          <div>
            <label for="role" class="text-gray-700">Role</label>
            <Multiselect
              v-model="content.role"
              :options="roles"
              label="name"
              track-by="id"
              placeholder="Select a role"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          <!-- Is Active -->
          <div class="flex items-center">
            <input type="checkbox" v-model="content.isActive" id="isActive" />
            <label for="isActive" class="ml-2 text-gray-700">Is Active</label>
          </div>
          
          <div>
            <router-link :to="{ name: 'resetPassword', params: { id: userId} }" class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
              Reset Password</router-link>
          </div>

        </div>
        

        <div class="flex justify-end mt-4">
          <router-link to="/cms/users" class="px-4 py-2 bg-red-500 text-white rounded">Back</router-link>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded ml-2">Update</button>
        </div>
      </div>
    </form>
  </div>
</template>