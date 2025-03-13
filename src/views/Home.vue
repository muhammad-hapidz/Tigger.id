<template>
  <div class="bg-primary pb-10">
    <div class="mt-14 mb-20">
<section class="bg-center bg-no-repeat bg-[url('../assets/img/bg-hero2.jpg')] bg-gray-400 bg-blend-multiply bg-cover">
    <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">We invest in the world’s potential</h1>
        <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
        <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a href="/about" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-button hover:bg-opacity-0 border-2 border-button transition">
                About Us
            </a>
            <a href="#" class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400 transition">
                Contact Us
            </a>  
        </div>
    </div>
</section>


   
    <div class="absolute inset-x-0 -mt-20 drop-shadow-xl flex justify-center lg:px-40 rounded-lg">
 
    <div class="grid grid-cols-1 md:grid-cols-3">
  
      <div class="bg-white shadow-lg p-5  hover:-translate-y-4 transition duration-300 group">
        <h1 class="text-slate-800 text-3xl font-medium">LAYANAN</h1>
        <div class="mt-2 mb-2 border-t-[2.5px] rounded-full border-button w-1/3 group-hover:w-1/2 transition-all duration-300"></div>
        <p class="text-gray-700 mb-3 font-light">
          kami menawarkan layanan pembuatan website, pengembangan aplikasi Android, konsultasi IT, dan IT support yang dirancang untuk meningkatkan efisiensi, keamanan, dan daya saing bisnis Anda.
        </p>
        <div class="flex justify-end">
        <RouterLink to="" class="px-3 py-2 rounded bg-button border text-white hover:text-button hover:bg-white hover:border-button transition opacity-0 group-hover:opacity-100 duration-200">Selengkapnya</RouterLink>
      </div>
      </div>

     
      <div class="bg-white shadow-lg p-5  hover:-translate-y-4 transition duration-300 group">
        <h1 class="text-slate-800 text-3xl font-medium uppercase">Berpengalaman</h1>
        <div class="mt-2 mb-2 border-t-[2.5px] rounded-full border-button w-1/3 group-hover:w-1/2 transition-all duration-300"></div>
        <p class="text-gray-700  pt-4">
          Tenaga ahli yang berpengalaman mulai dari junior, intermediate, dan senior
        </p>
      </div>

   
      <div class="bg-button shadow-lg p-10 py-20 group relative">
  <h1 class="text-white text-3xl font-bold">
    Butuh Bantuan? Kami Siap Membantu.
  </h1>
  <div class="absolute bottom-5 right-5">
    <RouterLink to="" class="bg-white px-4 py-2 rounded shadow-md border hover:bg-button hover:border-white hover:text-white">
      Hubungi Kami
    </RouterLink>
  </div>
</div>


      
    </div>
</div>

</div>
    <!-- <div class="pt-10 lg:pt-8 pb-5 lg:mx-4 lg:mt-8 max-w-screen-2xl absolute">
      <div class="text-center tracking-wider pt-5 pb-10">
        <h2 class="text-2xl">About Our Company</h2>
      </div>

      <div class="lg:grid grid-cols-2 px-8">
        <div class="mt-8">
          <img src="../assets/img/about-home.svg" alt="Programmer" class="w-3/4">
        </div>
        <div class="text-2xl text-justify p-4">
          <div class="text-4xl tracking-wider">
            About Our Company
          </div>
          <div class="mt-2 mb-10 border-t-[2.5px] rounded-full border-button w-1/3 ml-5"></div>
        <p class="text-slate-700 text-base"> Di PT. ADITYA ARTA ABADI, kami adalah mitra teknologi terpercaya yang berfokus pada solusi digital inovatif untuk membantu bisnis berkembang di era digital. Sebagai IT Consultant yang berpengalaman, kami menawarkan layanan pembuatan website, pengembangan aplikasi Android, konsultasi IT, dan IT support yang dirancang untuk meningkatkan efisiensi, keamanan, dan daya saing bisnis Anda.</p>
      
        Dengan tim profesional yang berpengalaman di bidangnya, kami berkomitmen untuk memberikan solusi teknologi yang tepat guna, mulai dari pengembangan website profesional, pengembangan aplikasi Android yang user-friendly dan scalable, strategi IT yang efektif, hingga dukungan teknis yang responsif. Kami memahami bahwa setiap bisnis memiliki kebutuhan yang unik, itulah mengapa kami menghadirkan layanan yang fleksibel, scalable, dan sesuai dengan perkembangan teknologi terbaru.

Percayakan kebutuhan teknologi Anda kepada kami dan biarkan [Nama Perusahaan] menjadi bagian dari transformasi digital bisnis Anda!
</div>
      </div> -->
      <!-- <div class="flex mr-5 mt-10 lg:mr-16 lg:mt-32">
        <RouterLink
        to="/about" 
        class="ml-auto bg-white p-1 rounded-lg px-10"
        @click="scrollToTop">Lihat Selengkapnya</RouterLink>
      </div> -->
    <!-- </div> -->

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
