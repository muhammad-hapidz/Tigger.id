<template>
  <div class="bg-primary pb-10">
    <div>
      <img src="../assets/img/2.png" alt="" class="w-full mt-[68px]">
    </div>
    <div class="pt-10 lg:pt-20 pb-5 lg:mx-4 lg:mt-8 rounded-r-sm">
      <div class="text-center tracking-wider pt-5 pb-10">
        <h2 class="text-accent1 text-lg">WELCOME TO</h2>
        <h1 class="text-3xl text-white">
          <span class="underline underline-offset-4 font-bold bg-white text-slate-800 rounded-lg px-2 pb-1 md:pb-2 leading-relaxed md:leading-none">CHERRY TIGGO</span> INDONESIA COMMUNITY
        </h1>
      </div>

      <div class="flex gap-5 mx-5 lg:mx-16 pt-5">
        <h3 class="text-text text-lg text-justify"> <span class="text-3xl text-slate-100 ">Tigger.id</span> adalah komunitas online yang dihadirkan oleh pengguna mobil Chery Tiggo di Indonesia. Komunitas ini berfokus pada komunikasi, edukasi, dan berbagi pengalaman antara para pemilik kendaraan Chery. Komunitas ini sering kali digunakan sebagai wadah untuk berdiskusi tentang berbagai hal terkait mobil, mulai dari tips penggunaan, perawatan, hingga masalah teknis. Selain itu, Tigger.id juga memungkinkan anggotanya untuk berinteraksi dengan sesama pengguna dan mendapatkan informasi serta masukan dari pihak Chery Indonesia, sehingga memberikan rasa kedekatan antara konsumen dan brand tersebut</h3>
      </div>

      <div class="flex mr-5 mt-10 lg:mr-16 lg:mt-32">
        <RouterLink
        to="/about" 
        class="ml-auto bg-white p-1 rounded-lg px-10"
        @click="scrollToTop">Lihat Selengkapnya</RouterLink>
      </div>
    </div>

    <!-- ARTICLE -->
     <div class="bg-white lg:mr-16">
    <div class="tracking-wider mt-10 text-center lg:text-left mb-10 lg:mb-5 lg:ml-12">
      <h1 class="text-slate-800 text-3xl mt-10 pt-10">
               <span class="underline underline-offset-[15px] font-semibold">ARTICLE</span> 
      </h1>
    </div>

    <div class="mx-8 mb-10">
      <div class="flex justify-end mb-5">
        <RouterLink 
        to="/article"  @click="scrollToTop"
        class="text-cyan-800 text-lg tracking-wider underline underline-offset-8 lg:mr-10">All Article</RouterLink>
      </div>

      <!-- Loading Spinner for Articles -->
      <div v-if="loading" class="flex justify-center py-10">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>

      <!-- Display Articles After Loading -->
      <CardArticle v-else :articles="limitedArticles" />
    </div>
    
    <!-- News and Events Section -->
    <div class="lg:mx-10 py-5 pb-5">
      <div class="tracking-wider text-center lg:text-left  mt-5 pt-5">
        <!-- <h1 class="text-accent1 lg:px-5 text-xl mt-12"> </h1> -->
        <h2 class="text-3xl bg-white p-1 rounded-lg lg:px-3 underline underline-offset-[15px] inline-block font-semibold">NEWS AND EVENT</h2>
      </div>

      <div class="mx-8 mb-10 pt-5">
        <div class="flex justify-end mb-5">
          <RouterLink to="/news-and-event"
          @click="scrollToTop"
          class="text-cyan-800 text-lg tracking-wider underline underline-offset-8 lg:mr-10">See All</RouterLink>
        </div>

        <!-- Loading Spinner for News and Events -->
        <div v-if="loading" class="">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        </div>

        <!-- Display News and Events After Loading -->
        <CardNewsEvent v-else :newsAndEvents="limitedNewsevents"/>
      </div>
    </div>
  </div>

  <div class="my-8 border-t border-gray-300"></div>

<!-- Tampilkan Video YouTube -->
<h1 class="text-accent1 bg-white w-1/2 lg:w-1/5 p-2 font-semibold text-2xl mb-5">Our Content</h1>
<div class="flex justify-center">
  <div class="ml-5">
  <video
      class="rounded border-[4px] border-white w-full max-w-md"
      height="auto"
      controls>
      <source src="../assets/video/video-1.mp4" type="video/mp4">
      Browser Anda tidak mendukung tag video.
    </video>
  </div>

<div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-4 pb-8 ml-8">

  <iframe
    width="570"
    class="rounded border-[10px] border-white"
    height="315"
    src="https://www.youtube.com/embed/heZ_f6_9FV0?si=CVDe05g0tGr20HK3"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>

  <iframe
    width="570"
    class="rounded border-[10px] border-white"
    height="315"
    src="https://www.youtube.com/embed/mZj37lmOhZQ?si=AKhni1IIMvfV9EzE"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>

  <iframe
    width="570"
    class="rounded border-[10px] border-white"
    height="315"
    src="https://www.youtube.com/embed/Cq9IRCKqPnA?si=YDT-u22PXhXZ90Hw"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
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
  methods: {
    // Scroll to top of the page
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
};

</script>

<style scoped>
/* Additional styling for the loading spinner */
</style>
