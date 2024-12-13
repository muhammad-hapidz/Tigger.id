<template>
  <div class="space-y-4 mt-20 px-10 flex justify-center flex-col mb-20">
    <!-- Accordion Item -->
    <div
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
          <div v-for="content in item.contents" :key="content.title">
            <h2 class="font-bold">{{ content.title }}</h2>
            <p class="px-4">{{ content.content }}</p>
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
    };
  },
  methods: {
  async fetchAccordionData() {
    try {
      const response = await axios.get(
        "https://apitiggerid.tri3a.com/api/Contents/ByTipsAndTrick"
      );

      // Proses data agar item.type hanya muncul satu kali
      const groupedData = {};
      response.data.forEach((item) => {
        const type = item.category.categoryName;

        if (!groupedData[type]) {
          groupedData[type] = {
            type,
            contents: [], // Menyimpan kombinasi title dan content
          };
        }

        groupedData[type].contents.push({
          title: item.title,
          content: item.description,
        });
      });

      // Ubah menjadi array untuk penggunaan pada v-for
      this.accordionItems = Object.values(groupedData);
    } catch (error) {
      console.error("Error fetching accordion data:", error);
    }
  },
  toggleAccordion(index) {
    this.activeIndex = this.activeIndex === index ? null : index;
  },
},

  mounted() {
    // Fetch data saat komponen dimuat
    this.fetchAccordionData();
  },
};
</script>
