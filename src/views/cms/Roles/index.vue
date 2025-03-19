<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// State
const roles = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;

// Fungsi untuk mengambil data Role dari API
const fetchRoles = async () => {
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    console.error('Auth token tidak ditemukan. Harap login terlebih dahulu.');
    window.location.href = '/cms/login';
    return;
  }

  try {
    const response = await axios.get(
      'https://apiweb3a.tri3a.com/api/Roles/Getall/cms',
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    roles.value = response.data.sort((a, b) => 
      new Date(a.createdDate) - new Date(b.createdDate)
    );
  } catch (error) {
    console.error('Kesalahan saat mengambil data Role:', error);
    alert('Gagal mengambil data Role. Silakan coba lagi.');
  }
};

// Filtered roles
const filteredRoles = computed(() => {
  if (!searchQuery.value) return roles.value;
  return roles.value.filter((role) =>
    role.roleName?.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Paginasi data
const paginatedRoles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredRoles.value.slice(start, end);
});

// Total halaman
const totalPages = computed(() => 
  Math.ceil(filteredRoles.value.length / itemsPerPage)
);

// Navigasi halaman
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page;
};

// Format tanggal
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const open = ref(false)

onMounted(fetchRoles);
</script>

<template>
  <div class="mt-6 p-4 bg-white shadow rounded-lg">
    <h3 class="text-gray-700 text-3xl font-medium border-b pb-2">Roles</h3>

    <div class="mt-6">
      <router-link to="/cms/roles/create">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          + Create New
        </button>
      </router-link>

      <div class="flex flex-col mt-3 sm:flex-row">
        <div class="relative block mt-2 sm:mt-0">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg viewBox="0 0 24 24" class="w-4 h-4 text-gray-500 fill-current">
              <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z" />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            placeholder="Search"
            class="block w-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-400 rounded focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
          />
        </div>
      </div>

      <!-- Table to display Roles -->
      <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">No</th>
                <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Role Name</th>
                <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Description</th>
                <th class="px-5 py-3 text-xs font-semibold text-left text-gray-600 uppercase bg-gray-100 border-b-2">Created At</th>
                <th class="px-5 py-3 text-xs font-semibold text-center text-gray-600 uppercase bg-gray-100 border-b-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(role, index) in paginatedRoles" :key="role.id">
                <td class="px-5 py-5 text-sm bg-white border-b">{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
                <td class="px-5 py-5 text-sm bg-white border-b">{{ role.roleName }}</td>
                <td class="px-5 py-5 text-sm bg-white border-b">{{ role.description }}</td>
                <td class="px-5 py-5 text-sm bg-white border-b">{{ formatDate(role.createdDate) }}</td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200 flex flex-wrap justify-center gap-2">
                  <router-link
                    :to="{ name: 'DetailRole', params: { id: role.id } }"
                  >
                <button class="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-3">
                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                      <path fill-rule="evenodd" d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </button>
              </router-link>
                <router-link
                    :to="{ name: 'EditRole', params: { id: role.id } }"
                  >
                <button class="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-600">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-3">
                      <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
                      <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
                    </svg>
                </span>
                </button>
                  </router-link>
                  <router-link :to="{ name: 'SettingRole', params: { id: role.id } }">
                  <button 
                    class="px-4 py-2 text-sm font-semibold text-white bg-yellow-500 rounded hover:bg-yellow-600"
                  >
                    <span>
                      <svg class="size-3 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </span>
                  </button>
                </router-link>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center items-center py-4">
            <button @click="goToPage(1)" :disabled="currentPage === 1" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400 disabled:opacity-50">«</button>
            <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400 disabled:opacity-50">‹</button>

            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              :class="{'bg-blue-500 text-white': page === currentPage, 'text-gray-800': page !== currentPage}"
              class="px-4 py-2 text-sm font-semibold mx-1 rounded hover:bg-gray-300"
            >
              {{ page }}
            </button>

            <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400 disabled:opacity-50">›</button>
            <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400 disabled:opacity-50">»</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <!-- <div
      :class="`modal ${
        !open && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div
        class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
        @click="open = false"
      />

      <div
        class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-6xl "
      >
        <div
          class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close"
        >
          <svg
            class="text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
            />
          </svg>
          <span class="text-sm">(Esc)</span>
          </div>

        <div class="h-40 px-6 py-4 text-left modal-content"> -->
          <!-- Title -->
          <!-- <div class="flex items-center justify-between pb-3 ">
            <p class="text-2xl font-bold">
              Setting Role
            </p>
            <div class="z-50 cursor-pointer modal-close" @click="open = false">
              <svg
                class="text-black fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                />
              </svg>
            </div>
          </div> -->
          <!-- Body -->
          <!-- <p>Modal content.</p> -->

          <!-- Footer -->
          <!-- <div class="flex justify-end pt-2">
            <button
              class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
              @click="open = false"
            >
              Close
            </button>
            <button
              class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
              @click="open = false"
            >
              Action
            </button>
          </div>
        </div>
     </div>
  </div> -->
</template>
