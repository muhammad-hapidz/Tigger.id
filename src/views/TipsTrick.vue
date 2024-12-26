<template>
  <div class="bg-primary mt-[68px]">
  <div class="space-y-4 px-10 flex justify-center flex-col py-20">
    <!-- Tampilkan pesan jika tidak ada data -->
    <div v-if="errorMessage" class="text-center text-red-600 font-semibold">
      {{ errorMessage }}
    </div>

    <!-- Accordion Item -->
    <div
      v-else
      v-for="(item, index) in accordionItems"
      :key="index"
      class="border rounded-md bg-white"
    >
      <button
        class="w-full flex justify-between items-center px-4 py-2 bg-slate-200 text-left focus:outline-none"
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
  methods: {
    async fetchAccordionData() {
      try {
        const response = await axios.get(
          "https://apitiggerid.tri3a.com/api/Contents/ByTipsAndTrick"
        );

        if (response.data.length === 0) {
          this.errorMessage = "No data available at the moment. Please check back later.";
          return;
        }

        const groupedData = {};
        response.data.forEach((item) => {
          const type = item.category.categoryName;

          if (!groupedData[type]) {
            groupedData[type] = {
              type,
              contents: [],
            };
          }

          groupedData[type].contents.push({
            title: item.title,
            image: item.image,
            content: item.description,
          });
        });

        this.accordionItems = Object.values(groupedData);
        this.errorMessage = null;

        // Set item pertama terbuka secara otomatis
        this.activeIndex = 0;
      } catch (error) {
        console.error("Error fetching accordion data:", error);
        this.errorMessage = "Data Pada Menu Ini Tidak Tersedia / Tidak Ada";
      }
    },

    toggleAccordion(index) {
      // Jika item yang sama diklik, tutup dengan mengatur activeIndex ke null
      this.activeIndex = this.activeIndex === index ? null : index;
    },
  },

  mounted() {
    // Fetch data saat komponen dimuat
    this.fetchAccordionData();
  },
};
</script>

<style scoped>
/* Tambahkan gaya jika diperlukan */
</style>
