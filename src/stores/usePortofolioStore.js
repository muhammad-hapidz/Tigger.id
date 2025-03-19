import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const usePortfolioStore = defineStore("portfolio", () => {
  const portfolios = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Fetch data dari API
  const fetchPortfolios = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get("https://apiweb3a.tri3a.com/api/Contents/BySegmentNewsAndEvent");
      portfolios.value = response.data; // Simpan hasil ke state
    } catch (err) {
      error.value = "Gagal mengambil data portofolio.";
    } finally {
      loading.value = false;
    }
  };

  return { portfolios, loading, error, fetchPortfolios };
});
