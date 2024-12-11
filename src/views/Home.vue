<template>
    <div>
      <div>
        <img src="../assets/img/tiggo-banner.webp" alt="" class="w-full">
      </div>
      <div class="pt-20 pb-5 bg-slate-200">
        <div class="text-center tracking-wider pt-5 pb-10">
          <h2 class="text-slate-600 text-lg">WELCOME TO</h2>
          <h1 class="text-slate-800 text-3xl">
            <span class="underline underline-offset-[15px] font-bold bg-white rounded-lg px-2">CHERRY TIGGO</span> INDONESIA COMMUNITY
          </h1>
        </div>
  
        <div class="flex gap-5 mx-16 pt-5">
          <h3 class="text-slate-700 text-lg"> <span class="text-3xl text-slate-800">Tigger.id</span> adalah komunitas online yang dihadirkan oleh pengguna mobil Chery Tiggo di Indonesia. Komunitas ini berfokus pada komunikasi, edukasi, dan berbagi pengalaman antara para pemilik kendaraan Chery. Komunitas ini sering kali digunakan sebagai wadah untuk berdiskusi tentang berbagai hal terkait mobil, mulai dari tips penggunaan, perawatan, hingga masalah teknis. Selain itu, Tigger.id juga memungkinkan anggotanya untuk berinteraksi dengan sesama pengguna dan mendapatkan informasi serta masukan dari pihak Chery Indonesia, sehingga memberikan rasa kedekatan antara konsumen dan brand tersebut</h3>
        </div>
  
        <div class="flex mr-16 mt-32">
          <RouterLink to="/about" class="ml-auto bg-white p-1 rounded-lg px-10">Lihat Selengkapnya</RouterLink>
        </div>
      </div>
  
      <!-- ARTICLE -->
      <div class="text-center tracking-wider mb-10 mt-5">
        <!-- <h2 class="text-slate-600 text-lg"></h2> -->
        <h1 class="text-slate-800 text-3xl mt-12">
          ABOUT OUR 
          <span class="underline underline-offset-[15px] font-bold bg-slate-200 rounded-lg px-3">ARTICLE</span> 
        </h1>
      </div>
  
      <div class="mx-8 mb-10">
        <div class="flex justify-end mr-16 mb-5">
          <RouterLink to="/article" class="text-cyan-800 text-lg tracking-wider underline underline-offset-8">All Article</RouterLink>
        </div>
  
        <!-- Render Limited Articles -->
        <CardArticle :articles="limitedArticles" />
      </div>

      <div class="">

      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import CardArticle from "@/components/CardArticle.vue";
  
  export default {
    components: {
      CardArticle,
    },
    data() {
      return {
        articles: [], // Semua artikel yang diambil dari API
      };
    },
    computed: {
      // Mengambil hanya beberapa artikel untuk ditampilkan
      limitedArticles() {
        return this.articles.slice(0, 3); // Batas 3 artikel
      },
    },
    mounted() {
      // Fetch data artikel dari API menggunakan axios
      axios
        .get("https://apitiggerid.tri3a.com/api/article")
        .then((response) => {
          this.articles = response.data; // Menyimpan semua data API ke state
        })
        .catch((error) => {
          console.error("Error fetching articles:", error);
        });
    },
  };
  </script>
  
  <style scoped>
  /* Tambahkan styling tambahan jika diperlukan */
  </style>
  