<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const route = useRoute();
const router = useRouter();
const toast = useToast(); // Initialize toast

// State Data
const resetPasswordForm = ref({
  password: '',
  confirmPassword: '',
});

// State untuk toggle visibility password
const showPasswords = ref({
  password: false,
  confirmPassword: false,
});

// Toggle Visibility Function
const togglePasswordVisibility = (field) => {
  showPasswords.value[field] = !showPasswords.value[field];
};

// Submit Function
const resetPassword = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.error('Auth token tidak ditemukan. Harap login terlebih dahulu.');
    return;
  }

  const userId = route.params.id;

  try {
    const payload = {
      password: resetPasswordForm.value.password,
      confirmPassword: resetPasswordForm.value.confirmPassword,
    };

    if (!payload.password || !payload.confirmPassword) {
      toast.warning('Semua kolom wajib diisi.');
      return;
    }

    if (payload.password !== payload.confirmPassword) {
      toast.warning('Password baru dan konfirmasi password tidak cocok.');
      return;
    }

    const response = await axios.post(
      `https://apitiggerid.tri3a.com/api/Users/ChangePassword/cms/${userId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    toast.success('Password berhasil direset!');
    // Reset form fields after success
    resetPasswordForm.value.password = '';
    resetPasswordForm.value.confirmPassword = '';

    // Redirect to previous page
    router.go(-1);
  } catch (error) {
    toast.error(error.response?.data?.message || 'Terjadi kesalahan saat mereset password.');
  }
};
</script>

<template>
  <div class="mt-6 p-4 bg-white shadow rounded-lg">
    <h3 class="text-3xl font-semibold text-gray-700 text-center underline">Reset Password</h3>

    <form @submit.prevent="resetPassword">
      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
          <h2 class="text-lg font-semibold text-gray-700 capitalize">
            Reset Password Form
          </h2>

          <div class="grid grid-cols-1 gap-6 mt-4">
            <!-- Input New Password -->
            <div class="relative">
              <label class="text-gray-700" for="password">New Password</label>
              <input
                v-model="resetPasswordForm.password"
                id="password"
                class="p-2 w-full mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                :type="showPasswords.password ? 'text' : 'password'"
                required
              />
              <button
                type="button"
                @click="togglePasswordVisibility('password')"
                class="absolute right-3 top-10 text-gray-500 focus:outline-none"
              >
                <svg
                  v-if="showPasswords.password"
                  class="h-5 w-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <svg
                  v-else
                  class="h-5 w-5 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>

            <!-- Input Confirm Password -->
            <div class="relative">
              <label class="text-gray-700" for="confirmPassword">Confirm Password</label>
              <input
                v-model="resetPasswordForm.confirmPassword"
                id="confirmPassword"
                class="p-2 w-full mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                :type="showPasswords.confirmPassword ? 'text' : 'password'"
                required
              />
              <button
                type="button"
                @click="togglePasswordVisibility('confirmPassword')"
                class="absolute right-3 top-10 text-gray-500 focus:outline-none"
              >
                <!-- SVG Code -->
              </button>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end gap-2">
          <button
            type="button"
            @click="router.go(-1)"
            class="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            Back
          </button>
          <button
            type="submit"
            class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            Reset Password
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
