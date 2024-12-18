<template>
  <div>
    <div>
      <img src="../assets/img/2.png" alt="" class="w-full mt-16">
    </div>
    <div class="pt-20 pb-5 bg-slate-200">
      <div class="text-center tracking-wider pt-5 pb-10">
        <h2 class="text-slate-600 text-lg">WELCOME TO</h2>
        <h1 class="text-slate-800 text-3xl">
          <span class="underline lg:underline-offset-[15px] font-bold bg-white rounded-lg px-2 pb-1 md:pb-2">CHERRY TIGGO</span> INDONESIA COMMUNITY
        </h1>
      </div>

      <div class="flex gap-5 mx-5 lg:mx-16 pt-5">
        <h3 class="text-slate-700 text-lg text-justify"> <span class="text-3xl text-slate-800 ">Tigger.id</span> adalah komunitas online yang dihadirkan oleh pengguna mobil Chery Tiggo di Indonesia. Komunitas ini berfokus pada komunikasi, edukasi, dan berbagi pengalaman antara para pemilik kendaraan Chery. Komunitas ini sering kali digunakan sebagai wadah untuk berdiskusi tentang berbagai hal terkait mobil, mulai dari tips penggunaan, perawatan, hingga masalah teknis. Selain itu, Tigger.id juga memungkinkan anggotanya untuk berinteraksi dengan sesama pengguna dan mendapatkan informasi serta masukan dari pihak Chery Indonesia, sehingga memberikan rasa kedekatan antara konsumen dan brand tersebut</h3>
      </div>

      <div class="flex mr-5 mt-10 lg:mr-16 lg:mt-32">
        <RouterLink to="/about" class="ml-auto bg-white p-1 rounded-lg px-10">Lihat Selengkapnya</RouterLink>
      </div>
    </div>

    <!-- ARTICLE -->
    <div class="text-center tracking-wider mb-10 mt-5">
      <h1 class="text-slate-800 text-3xl mt-12">
        ABOUT OUR 
        <span class="underline underline-offset-[15px] font-bold bg-slate-200 rounded-lg px-3">ARTICLE</span> 
      </h1>
    </div>

    <div class="mx-8 mb-10">
      <div class="flex justify-end  lg:mr-16 mb-5">
        <RouterLink to="/article" class="text-cyan-800 text-lg tracking-wider underline underline-offset-8">All Article</RouterLink>
      </div>

      <!-- Loading Spinner for Articles -->
      <div v-if="loading" class="flex justify-center py-10">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>

      <!-- Display Articles After Loading -->
      <CardArticle v-else :articles="limitedArticles" />
    </div>
    
    <!-- News and Events Section -->
    <div class="bg-slate-100 lg:mx-10 py-5 mb-5">
      <div class="text-center tracking-wider mb-5 mt-5 pt-5">
        <h1 class="text-slate-800 text-3xl mt-12">ABOUT OUR <span class="bg-white p-1 rounded-lg px-3 underline underline-offset-[15px]">NEWS AND EVENT</span></h1>
      </div>

      <div class="mx-8 mb-10 pt-10">
        <div class="flex justify-end lg:mr-16 mb-5">
          <RouterLink to="/news-and-event" class="text-cyan-800 text-lg tracking-wider underline underline-offset-8">See All</RouterLink>
        </div>

        <!-- Loading Spinner for News and Events -->
        <div v-if="loading" class="flex justify-center py-10">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        </div>

        <!-- Display News and Events After Loading -->
        <CardNewsEvent v-else :newsAndEvents="limitedNewsevents"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CardArticle from "@/components/CardArticle.vue";
import CardNewsEvent from "@/components/CardNewsEvent.vue";

export default {
  components: {
    CardArticle,
    CardNewsEvent
  },
  data() {
    return {
      articles: [], // All articles fetched from API
      newsAndEvents: [], // All news and events fetched from API
      loading: true, // Loading state to show spinner while fetching data
    };
  },
  computed: {
    // Get only a limited number of articles to display
    limitedArticles() {
      return this.articles.slice(0, 3); // Limit to 3 articles
    },
    limitedNewsevents() {
      return this.newsAndEvents.slice(0, 3); // Limit to 3 news/events
    }
  },
  mounted() {
    // Fetch articles data from API using axios
    axios
      .get("https://apitiggerid.tri3a.com/api/Contents/BySegmentArticle")
      .then((response) => {
        this.articles = response.data; // Store all API data in state
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });

    // Fetch news and events data from API
    axios
      .get("https://apitiggerid.tri3a.com/api/Contents/BySegmentNewsAndEvent")
      .then((response) => {
        this.newsAndEvents = response.data; // Store all news/events data
      })
      .catch((error) => {
        console.error("Error fetching news and events:", error);
      })
      .finally(() => {
        this.loading = false; // Set loading to false after both data are fetched
      });
  },
};
</script>

<style scoped>
/* Additional styling for the loading spinner */
</style>
