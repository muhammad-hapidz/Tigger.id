<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import axios from 'axios';
import { useToast } from 'vue-toastification';

// Router and Route instances
const router = useRouter();
const route = useRoute();
const toast = useToast(); // Initialize toast

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
const filteredRoles = computed(() =>
  roles.value.map(role => ({
    id: role.id,
    name: role.roleName,
  }))
);

// Password Visibility Toggle
const showPassword = ref(false);
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Fetch Roles API
const fetchRoles = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.error('Auth token tidak ditemukan. Harap login terlebih dahulu.');
    return;
  }
  try {
    const response = await axios.get('https://apitiggerid.tri3a.com/api/Roles/Getall/cms', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    roles.value = response.data; // Simpan hasil API ke roles
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
};

const fetchUserData = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.error('Auth token tidak ditemukan. Harap login terlebih dahulu.');
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

    // Cari role berdasarkan ID dari userData.roleId
    const userRole = roles.value.find(role => role.id === userData.roleId) || null;

    content.value = {
      fullName: userData.fullName,
      userName: userData.userName,
      email: userData.email,
      password: '', // Tidak menyertakan password
      role: userRole, // Set default role
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
    console.error('Auth token tidak ditemukan. Harap login terlebih dahulu.');
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

    const response = await axios.put(
      `https://apitiggerid.tri3a.com/api/Users/cms/${userId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    console.log('User updated successfully:', response.data);
    toast.success('User berhasil diperbarui!');

    // Redirect ke halaman sebelumnya atau halaman /cms/Users
    router.push('/cms/Users');
  } catch (error) {
    console.error('Error updating user:', error);
    toast.error('Gagal memperbarui user. Silakan coba lagi.');
  }
};

// On Mounted
onMounted(async () => {
  await fetchRoles(); // Pastikan roles sudah dimuat
  await fetchUserData(); // Setelah roles selesai, baru ambil data user
});
</script>

<template>
  <div class="mt-6 p-4 bg-white shadow rounded-lg">
    <h3 class="text-3xl font-semibold text-gray-700 text-center underline">Edit User</h3>

    <form @submit.prevent="updateUser">
      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
          <h2 class="text-lg font-semibold text-gray-700 capitalize">
            User Settings
          </h2>

          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <!-- Input Full Name -->
            <div class="sm:col-span-2">
              <label class="text-gray-700" for="fullName">Full Name</label>
              <input
                v-model="content.fullName"
                id="fullName"
                class="p-2 w-full mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="text"
                required
              />
            </div>

            <!-- Input Username -->
            <div class="sm:col-span-2">
              <label class="text-gray-700" for="userName">Username</label>
              <input
                v-model="content.userName"
                id="userName"
                autocomplete="new-username"
                class="p-2 w-full mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="text"
                required
              />
            </div>

            <!-- Input Email -->
            <div class="sm:col-span-2">
              <label class="text-gray-700" for="email">Email</label>
              <input
                v-model="content.email"
                id="email"
                class="p-2 w-full mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="email"
                required
              />
            </div>

            <!-- Select Role -->
            <div class="sm:col-span-2">
              <label class="text-gray-700" for="role">Role</label>
              <Multiselect
                class="border border-gray-300 rounded-md"
                v-model="content.role"
                :options="filteredRoles"
                label="name"
                track-by="id"
                placeholder="Select a role"
              />
            </div>

            <!-- Checkbox IsActive -->
            <div class="sm:col-span-2 flex items-center">
              <input
                v-model="content.isActive"
                id="isActive"
                type="checkbox"
                class="mr-2"
              />
              <label for="isActive" class="text-gray-700">Is Active</label>
            </div>
          </div>
        </div>
        <!-- Submit Button -->
        <div class="flex justify-end gap-2">
          <router-link
            to="/cms/Users"
            class="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <span>Back</span>
          </router-link>
          <button
            type="submit"
            class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            Update User
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
