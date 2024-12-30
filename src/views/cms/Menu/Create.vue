<script setup>
import { reactive } from 'vue';
import api from '@/Services/api'; // Pastikan konfigurasi Axios benar
import { useToast } from 'vue-toastification';

const formData = reactive({
  no: '',
  menuName: '',
  icon: '',
  caption: '',
  menuUrl: '',
  isActive: true, // Default value set to "Active"
});

const toast = useToast();

const handleSubmit = async () => {
  // Validasi jika menuName kosong
  if (!formData.menuName) {
    toast.error('Please enter a menu name');
    return;
  }

  // Menampilkan data yang akan dikirim
  console.log('Data to be sent:', formData);

  try {
    // Kirim data ke API
    const response = await api.post('https://apitiggerid.tri3a.com/api/Menu/POST/cms', {
      no: Number(formData.no), // Pastikan no dikirim sebagai angka
      menuName: formData.menuName,
      icon: formData.icon,
      caption: formData.caption,
      menuUrl: formData.menuUrl,
      isActive: formData.isActive, // Status sebagai boolean
    });

    console.log('Data berhasil ditambahkan:', response.data);

    // Reset form
    formData.no = '';
    formData.menuName = '';
    formData.icon = '';
    formData.caption = '';
    formData.menuUrl = '';
    formData.isActive = true; // Reset ke default "Active"

    // Tampilkan toast sukses
    toast.success('Menu successfully added!');
    // Kembali ke halaman sebelumnya
    setTimeout(() => {
      window.history.back();
    }, 1500); // Memberi waktu untuk toast tampil
  } catch (error) {
    console.error('Error saat menambahkan data:', error);
    // Periksa apakah error memiliki response dari server
    if (error.response) {
      toast.error(error.response.data.message || 'Terjadi kesalahan. Silakan coba lagi.');
    } else {
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    }
  }
};

const goBack = () => {
  window.history.back();
};
</script>

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
            <input
              type="text"
              id="icon"
              v-model="formData.icon"
              placeholder="Paste icon SVG"
              class="w-full lg:w-1/2 px-4 py-2 border rounded-md"
            />
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
