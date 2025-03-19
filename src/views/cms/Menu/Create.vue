<template>
  <div class="container mx-auto lg:p-6">
    <div class="bg-white shadow-md rounded-lg p-6 lg:w-3/4">
      <h1 class="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 text-center">
        Tambah Menu
      </h1>
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div>
            <label for="no" class="block text-gray-600 font-semibold mb-2">
              Nomor Urut Menu
            </label>
            <input
              type="number"
              id="no"
              v-model="formData.no"
              placeholder="Enter Menu Number"
              class="w-full lg:w-1/2 px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label for="menuName" class="block text-gray-600 font-semibold mb-2">
              Menu Name
            </label>
            <input
              type="text"
              id="menuName"
              v-model="formData.menuName"
              placeholder="Enter Menu Name"
              class="w-full lg:w-1/2 px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label for="icon" class="block text-gray-600 font-semibold mb-2">
              Icon
            </label>
            <select
              id="icon"
              v-model="formData.icon"
              class="w-full lg:w-1/2 px-4 py-2 border rounded-md"
            >
              <option value="" disabled>Select an Icon</option>
              <option
                v-for="icon in icons"
                :key="icon.id"
                :value="icon.descSvg"
              >
                <!-- Tampilkan hanya nama ikon di dropdown -->
                {{ icon.iconName }}
              </option>
            </select>
          </div>
          <div v-if="formData.icon">
            <label class="block text-gray-600 font-semibold mb-2">Selected Icon</label>
            <!-- Tampilkan SVG ikon yang dipilih -->
            <span v-html="formData.icon" class="h-6 w-6"></span>
          </div>
          <div>
            <label for="caption" class="block text-gray-600 font-semibold mb-2">
              Description
            </label>
            <textarea
              id="caption"
              v-model="formData.caption"
              placeholder="Enter caption"
              class="w-full lg:w-1/2 px-4 py-2 border rounded-md"
              rows="6"
            ></textarea>
          </div>
          <div>
            <label for="menuUrl" class="block text-gray-600 font-semibold mb-2">
              Menu URL
            </label>
            <input
              type="text"
              id="menuUrl"
              v-model="formData.menuUrl"
              placeholder="Enter Menu URL name"
              class="w-full lg:w-1/2 px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label class="block text-gray-600 font-semibold mb-2">Status</label>
            <div class="flex items-center gap-4">
              <label class="flex items-center">
                <input
                  type="radio"
                  value="true"
                  v-model="formData.isActive"
                  class="mr-2"
                />
                Active
              </label>
              <label class="flex items-center">
                <input
                  type="radio"
                  value="false"
                  v-model="formData.isActive"
                  class="mr-2"
                />
                Nonactive
              </label>
            </div>
          </div>
        </div>

        <div class="pt-16 flex justify-end gap-2">
          <button
            type="button"
            @click="goBack"
            class="px-4 py-2 border border-slate-800 rounded-md hover:bg-slate-800 hover:text-white duration-200"
          >
            Back
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:opacity-80"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue';
import api from '@/Services/api';
import { useToast } from 'vue-toastification';

const formData = reactive({
  no: '',
  menuName: '',
  icon: '', // Menyimpan SVG dari ikon yang dipilih
  caption: '',
  menuUrl: '',
  isActive: true, // Default value set to "Active"
});

const icons = ref([]); // Menyimpan daftar ikon dari API
const toast = useToast();

// Fetch data ikon dari API
const fetchIcons = async () => {
  try {
    const response = await api.get('/Icon/GetAll/cms'); // Sesuaikan endpoint API
    icons.value = response.data; // Simpan data ikon ke state
  } catch (error) {
    console.error('Error fetching icons:', error);
    toast.error('Failed to load icons. Please try again later.');
  }
};

// Kirim data ke API
const handleSubmit = async () => {
  if (!formData.menuName) {
    toast.error('Please enter a menu name');
    return;
  }

  console.log('Data to be sent:', formData);

  try {
    const response = await api.post('https://apiweb3a.tri3a.com/api/Menu/POST/cms', {
      no: Number(formData.no),
      menuName: formData.menuName,
      icon: formData.icon, // Kirim SVG yang dipilih
      caption: formData.caption,
      menuUrl: formData.menuUrl,
      isActive: formData.isActive,
    });

    console.log('Data berhasil ditambahkan:', response.data);

    // Reset form
    formData.no = '';
    formData.menuName = '';
    formData.icon = '';
    formData.caption = '';
    formData.menuUrl = '';
    formData.isActive = true;

    toast.success('Menu successfully added!');
    setTimeout(() => {
      window.history.back();
    }, 1500);
  } catch (error) {
    console.error('Error saat menambahkan data:', error);
    if (error.response) {
      toast.error(error.response.data.message || 'Terjadi kesalahan. Silakan coba lagi.');
    } else {
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    }
  }
};

// Kembali ke halaman sebelumnya
const goBack = () => {
  window.history.back();
};

// Fetch data ikon saat halaman dimuat
onMounted(fetchIcons);
</script>
