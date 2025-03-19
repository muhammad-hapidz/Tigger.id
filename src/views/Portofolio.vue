  <template>
    <div class="mt-16">
      <div class="relative group">
        <img src="../assets/img/bg-port.jpg" class="w-full object-cover bg-cover h-[95vh]" alt="">

        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
        <div class="absolute top-1/3 md:left-10 transform -translate-y-1/4 px-6 py-3">
    <h1 class="text-white text-3xl lg:text-6xl font-bold ml-5">PORTOFOLIO</h1>
    <div class="mt-2 mb-2 border-t-[3px] border-white w-1/6 group-hover:w-1/2 transition-all duration-300"></div>
    <h1 class="text-white text-3xl lg:text-6xl font-bold"><span class="font-light">|</span>Hasil Dari Pekerjaan Kami</h1>
   
  </div>
      </div>
      <div class="px-8 lg:px-40 mt-10">
        <div class="md:flex">
          <div class="">
          <h1 class="text-slate-600 uppercase tracking-tight font-light text-xl mr-4">Informasi Umum | </h1>
          <h1 class="text-slate-800 uppercase tracking-tight text-xl">PORTOFOLIO</h1>
        </div>
          <div class="h-96">
            <img src="../../public/img/portofolio1.jpg" class="w-full object-cover h-[350px]" alt="">
          </div>
          <div class="h-96">
            <img src="../../public/img/portofolio2.jpg" class="w-full object-cover h-[350px]" alt="">
          </div>
        </div>
        
        <div> 
        <h2 class="text-3xl text-slate-800 font-semibold "> PT. ADITYA ARTA ABADI</h2>
        <p class="">Kami telah mengerjakan berbagai macam proyek dan studi kasus dari berbagai klien, mulai perusahaan, hingga instansi pemerintahan. Hasil dari pekerjaan kami sebelumnya diharapkan mampu menjadi solusi terbaik untuk kebutuhan sistem aplikasi berbasis web, android maupun dekstop dan mempermudah pekerjaan serta memberikan efisiensi terhadap klien.</p>
      </div>

  </div>
  <!-- CLIENT -->
  <div class="px-7 lg:px-40 mt-10">
  <div class=" pt-10">
    <h1 class="text-slate-600 text-lg">Siapa saja yang sudah bekerja sama dengan kami ?</h1>
    <h2 class="text-slate-800 text-2xl font-semibold mt-2">Berikut Adalah Perusahaan yang sudah mempercayai dan bekerja sama dengan kami</h2>
  </div>
  <div class="flex flex-wrap py-10 gap-16 text-center justify-center">
      <img 
        v-for="(image, index) in images" 
        :key="index" 
        :src="image" 
        alt="Client Logo"
        class="w-64 h-40 object-contain transition duration-300 filter grayscale hover:filter-none"
      />
    </div>

    </div>


    <div class="bg-slate-100 lg:px-40 pb-10">
    <div class="pt-10 mx-5 pb-8 text-center">
      <h1 class="text-2xl font-semibold text-slate-600 tracking-tight uppercase">PORTOFOLIO</h1>
      <h2 class="text-slate-800 text-xl mt-2">Berikut Adalah Hasil Dari Pekerjaan Kami</h2>
    </div>

    <!-- Loading Indicator -->
    <div v-if="portfolioStore.loading" class="flex justify-center items-center py-10">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
    </div>

    <!-- Portofolio Cards -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-5 lg:px-0">
      <div
        v-for="portfolio in portfolioStore.portfolios"
        :key="portfolio.id"
        class="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform duration-300 hover:scale-105"
      >
        <!-- Gambar -->
        <div class="relative">
          <img
            class="w-full h-60 object-cover"
            :src="portfolio.image"
            alt="Portfolio Image"
          />
          <div class="absolute bottom-0 left-0 bg-blue-500 text-white px-4 py-2 text-sm font-semibold">
            {{ portfolio.category.categoryName }}
          </div>
        </div>

        <!-- Konten -->
        <div class="p-5">
          <h5 class="text-xl font-semibold tracking-tight text-gray-900">
            {{ portfolio.title }}
          </h5>
          <p class="text-gray-700 mt-2 line-clamp-3" v-html="portfolio.description">

          </p>
        </div>
      </div>
    </div>
  </div>
  </div>
  </template>

  <script setup>
import { onMounted } from "vue";
import { usePortfolioStore } from "@/stores/usePortofolioStore";

const portfolioStore = usePortfolioStore();
const images = Object.values(import.meta.glob("/public/img/clients/*.png", { eager: true })).map(i => i.default || i);

onMounted(() => {
  portfolioStore.fetchPortfolios(); // Ambil data saat komponen dimuat
});
  </script>

<style scoped>
/* Membatasi deskripsi agar hanya menampilkan 3 baris, jika lebih akan diberikan titik-titik (...) */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>