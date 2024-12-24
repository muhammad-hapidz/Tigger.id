<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import axios from 'axios';

// Router instance
const router = useRouter();

// State Data
const content = ref({
  fullName: '',
  userName: '',
  email: '',
  password: '',
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

// Submit Function
const createUser = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.error('Auth token tidak ditemukan. Harap login terlebih dahulu.');
    return;
  }

  try {
    const payload = {
      fullName: content.value.fullName,
      userName: content.value.userName,
      email: content.value.email,
      password: content.value.password,
      roleId: content.value.role?.id || null, // Ambil ID dari role yang dipilih
      isActive: content.value.isActive,
    };

    const response = await axios.post(
      'https://apitiggerid.tri3a.com/api/Users/Post/all',
      payload,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    console.log('User created successfully:', response.data);
    alert('User berhasil dibuat!');

    // Redirect ke halaman sebelumnya atau halaman /cms/Users
    router.push('/cms/Users');
  } catch (error) {
    console.error('Error creating user:', error);
    alert('Gagal membuat user. Silakan coba lagi.');
  }
};

// On Mounted
onMounted(fetchRoles);
</script>

<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700">Edit User</h3>

    <div class="mt-6">
      <router-link to="/cms/Users">
        <button
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2"
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
        </button>
      </router-link>
    </div>

    <div class="mt-8">
      <h4 class="text-gray-600">Form Input</h4>

      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
          <h2 class="text-lg font-semibold text-gray-700 capitalize">
            User Settings
          </h2>

          <form @submit.prevent="createUser">
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

              <!-- Input Password -->
              <div class="sm:col-span-2 relative">
                <label class="text-gray-700" for="password">Password</label>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="content.password"
                  id="password"
                  class="p-2 w-full mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  required
                />
                <button
                  type="button"
                  @click="togglePasswordVisibility"
                  class="absolute right-3 top-3 text-gray-500 focus:outline-none"
                >
                  <svg
                    v-if="showPassword"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.963 9.963 0 013.874-7.825m15.152 1.666a9.935 9.935 0 012.949 6.159c0 5.523-4.477 10-10 10a9.935 9.935 0 01-6.159-2.949m-3.22-3.222a10.054 10.054 0 01-.655-1.167"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.21.649-.456 1.267-.738 1.853m-2.252 3.873A9.953 9.953 0 0112 19c-4.477 0-8.268-2.943-9.542-7"
                    />
                  </svg>
                </button>
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
                  Create User
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
