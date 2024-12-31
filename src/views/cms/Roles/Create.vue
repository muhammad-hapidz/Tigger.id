<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toastification'; // Import useToast untuk notifikasi

// Router instance
const router = useRouter();
const toast = useToast(); // Initialize toast

// State Data
const content = ref({
  roleName: '',
  description: '',
});

// Submit Function
const createRole = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.error('Auth token tidak ditemukan. Harap login terlebih dahulu.');
    return;
  }

  try {
    const payload = {
      roleName: content.value.roleName,
      description: content.value.description,
    };

    const response = await axios.post(
      'https://apitiggerid.tri3a.com/api/Roles/POST/cms',
      payload,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    console.log('Role created successfully:', response.data);
    toast.success('Role berhasil dibuat!');

    // Redirect ke halaman sebelumnya atau halaman /cms/Roles
    router.push('/cms/Roles');
  } catch (error) {
    console.error('Error creating role:', error);
    toast.error('Gagal membuat role. Silakan coba lagi.');
  }
};
</script>

<template>
  <div class="mt-6 p-4 bg-white shadow rounded-lg">
    <h3 class="text-3xl font-semibold text-gray-700 text-center underline">Create Role</h3>

    <form @submit.prevent="createRole">
      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
          <h2 class="text-lg font-semibold text-gray-700 capitalize">Role Settings</h2>

          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <!-- Input Role Name -->
            <div class="sm:col-span-2">
              <label class="text-gray-700" for="roleName">Role Name</label>
              <input
                v-model="content.roleName"
                id="roleName"
                class="p-2 w-full mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="text"
                required
              />
            </div>

            <!-- Input Description -->
            <div class="sm:col-span-2">
              <label class="text-gray-700" for="description">Description</label>
              <textarea
                v-model="content.description"
                id="description"
                class="p-2 w-full mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                rows="4"
                placeholder="Enter role description"
              ></textarea>
            </div>
          </div>
        </div>
        <!-- Submit Button -->
        <div class="flex justify-end gap-2">
          <router-link
            to="/cms/Roles"
            class="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <span>Back</span>
          </router-link>
          <button
            type="submit"
            class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            Create Role
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
