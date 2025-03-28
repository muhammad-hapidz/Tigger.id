<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import axios from 'axios';
import { useToast } from 'vue-toastification'; // Import useToast from Vue Toast

// Router instance
const router = useRouter();
const toast = useToast(); // Initialize toast

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
    toast.success('User berhasil dibuat!');

    // Redirect ke halaman sebelumnya atau halaman /cms/Users
    router.push('/cms/users');
  } catch (error) {
    console.error('Error creating user:', error);
    toast.error('Gagal membuat user. Silakan coba lagi.');
  }
};

// On Mounted
onMounted(fetchRoles);
</script>

<template>
  <div class="mt-6 p-4 bg-white shadow rounded-lg">
    <h3 class="text-3xl font-semibold text-gray-700 text-center underline">Create User</h3>

    <form @submit.prevent="createUser">
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

              <!-- Input Password -->
              <div class="sm:col-span-2 relative">
                <label class="text-gray-700" for="password">Password</label>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="content.password"
                  id="password"
                  autocomplete="new-password"
                  class="p-2 w-full mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  required
                />
                <button
                  type="button"
                  @click="togglePasswordVisibility"
                  class="absolute right-3 top-11 text-gray-500 focus:outline-none"
                >
                <svg
                v-if="showPassword"
                class="h-5 w-5 text-blue-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>

                  
                  <svg v-else class="h-5 w-5 text-blue-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />  <circle cx="12" cy="12" r="3" /></svg>
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
            </div>
          
        </div>
        <!-- Submit Button -->
        <div class="flex justify-end gap-2">
          <router-link
        to="/cms/users"
        class="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
        <span>Back</span>
        </router-link>
                <button
                  type="submit"
                  class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                >
                  Create User
                </button>
              </div>
      </div>
    </form>
    </div>
</template>
