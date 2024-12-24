<template>
  <div class="space-y-4 px-10 flex justify-center flex-col mb-20 mt-32">
    <!-- Tampilkan pesan jika tidak ada data -->
    <div v-if="errorMessage" class="text-center text-red-600 font-semibold">
      {{ errorMessage }}
    </div>

    <!-- Accordion Item -->
    <div
      v-else
      v-for="(item, index) in accordionItems"
      :key="index"
      class="border rounded-md"
    >
      <button
        class="w-full flex justify-between items-center px-4 py-2 bg-gray-100 text-left focus:outline-none"
        @click="toggleAccordion(index)"
      >
        <span class="font-semibold">{{ item.type }}</span>
        <svg
          :class="{ 'rotate-180': activeIndex === index }"
          class="w-5 h-5 transition-transform"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        v-show="activeIndex === index"
        class="overflow-hidden transition-all duration-300"
      >
        <div class="px-4 py-2 space-y-4">
          <div
            v-for="content in item.contents"
            :key="content.title"
            class="flex flex-wrap items-start space-x-6 gap-5"
          >
            <!-- Flex container for image and text -->
            <div class="flex-shrink-0">
              <img
                v-if="content.image"
                :src="content.image"
                alt="Content Image"
                class="w-64 lg:w-96 h-auto rounded-md"
              />
            </div>
            <div class="flex-1">
              <h2 class="font-bold">{{ content.title }}</h2>
              <p class="px-4">{{ content.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      activeIndex: null, // Menyimpan indeks item yang sedang terbuka
      accordionItems: [], // Data awal kosong
      errorMessage: null, // Pesan error atau pemberitahuan
    };
  },
  
  mounted() {
  // Fetch data saat komponen dimuat
  this.fetchAccordionData().then(() => {
    if (this.accordionItems.length > 0) {
      this.activeIndex = 0; // Set accordion pertama terbuka
    }
  });
},

};
</script>

<style scoped>
/* Tambahkan gaya jika diperlukan */
</style>
