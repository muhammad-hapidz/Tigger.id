<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import axios from 'axios';

// Router and Route instances
const router = useRouter();
const route = useRoute();

// State Data
const content = ref({
  fullName: '',
  userName: '',
  email: '',
  roleId: null, // Role yang dipilih
  isActive: true,
});

const roles = ref([]); // Menyimpan semua role dari API
const filteredRoles = computed(() =>
  roles.value.map(role => ({
    id: role.id,
    name: role.roleName,
  }))
);


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
      role: userRole, // Set default role
      isActive: userData.isActive,
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    alert('Gagal mengambil data pengguna.');
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
    roleId: content.value.role?.id, // Ambil ID dari role yang dipilih
    isActive: content.value.isActive,
    };

    if (!payload.fullName || !payload.userName || !payload.email || !payload.roleId) {
  alert('Semua kolom wajib diisi.');
  return;
}

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
  alert('Format email tidak valid.');
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
    alert('User berhasil diperbarui!');

    // Redirect ke halaman sebelumnya atau halaman /cms/Users
    router.push('/cms/Users');
  } catch (error) {
    console.error('Error updating user:', error);
    alert('Gagal memperbarui user. Silakan coba lagi.');
  }
};

// On Mounted
onMounted(async () => {
  await fetchRoles();
  await fetchUserData();
});
</script>

<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700">Edit User</h3>

    <div class="mt-6">
          <!-- Tombol Back -->
    <router-link
      to="/cms/Users"
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center space-x-2 w-24"
    >
      <svg
        class="h-6 w-6 text-white"
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
        <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
      </svg>
      <span>Back</span>
    </router-link>
    
    </div>

    <div class="mt-8">
      <h4 class="text-gray-600">Form Input</h4>

      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
          <h2 class="text-lg font-semibold text-gray-700 capitalize">
            Edit User Settings
          </h2>

          <form @submit.prevent="updateUser">
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

              <!-- Submit Button -->
              <div class="sm:col-span-2">
                <button
                  type="submit"
                  class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  Update User
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
