<template>
  <div class="bg-slate">
    <div class="mt-14 bg-slate-200">
<section class="bg-center bg-no-repeat bg-[url('../assets/img/bg-hero2.jpg')] bg-gray-400 bg-blend-multiply bg-cover">
    <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Kami Membangun Solusi Digital untuk Masa Depan</h1>
        <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Dari strategi hingga implementasi, kami membantu bisnis beradaptasi dan tumbuh di era digital.</p>
        <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a href="/about" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-button hover:bg-opacity-0 border-2 border-button transition">
                About Us
            </a>
            <a href="/contact-us" class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400 transition">
                Contact Us
            </a>  
        </div>
    </div>
</section>

     <!-- Layanan, Berpengalaman, Butuh Bantuan -->
<div class="relative inset-x-0 lg:-mt-20 -mt-5 drop-shadow-xl flex justify-center px-5 lg:px-40 z-10">
  <div class="grid grid-cols-1 md:grid-cols-3">
    
    <div class="relative bg-white shadow-lg p-5 hover:-translate-y-4 transition duration-300 group">
      <h1 class="text-slate-800 text-3xl font-medium">LAYANAN</h1>
      <div class="mt-2 mb-2 border-t-[2.5px] border-button w-1/6 group-hover:w-1/4 transition-all duration-300"></div>
      <p class="text-gray-700 mb-3">
        Kami menawarkan layanan pembuatan website, pengembangan aplikasi Android, konsultasi IT, dan IT support yang dirancang untuk meningkatkan efisiensi, keamanan, dan daya saing bisnis Anda.
      </p>
      <div class="flex justify-end pt-5">
        <RouterLink to="/about" class="px-3 py-2 rounded bg-button border text-white hover:text-button hover:bg-white hover:border-button transition opacity-0 group-hover:opacity-100 duration-200">Selengkapnya</RouterLink>
      </div>
    </div>

    <div class="relative bg-white shadow-lg p-5 hover:-translate-y-4 transition duration-300 group">
      <h1 class="text-slate-800 text-3xl font-medium uppercase">Berpengalaman</h1>
      <div class="mt-2 mb-2 border-t-[2.5px] border-button w-1/3 group-hover:w-1/2 transition-all duration-300"></div>
      <p class="text-gray-700 mb-12 pt-4">
        Berpengalaman dan berhasil membangun kerja sama dengan perusahaan-perusahaan besar!
      </p>
      <div class="flex justify-end pt-5">
        <RouterLink to="/portofolio" class="px-3 py-2 rounded bg-button border text-white hover:text-button hover:bg-white hover:border-button transition opacity-0 group-hover:opacity-100 duration-200">Selengkapnya</RouterLink>
      </div>
    </div>

    <div class="relative bg-button shadow-lg p-10 py-20 group">
      <h1 class="text-white text-3xl font-bold">Butuh Bantuan? Kami Siap Membantu.</h1>
      <div class="absolute bottom-5 right-5">
        <RouterLink to="/contact-us" class="bg-white px-4 py-2 rounded shadow-md border hover:bg-button hover:border-white hover:text-white">
          Hubungi Kami
        </RouterLink>
      </div>
    </div>

  </div>
</div>
<div class="mt-20 lg:mt-32 p-4 w-full relative z-0">
    <div class="text-center mb-10">
      <h1 class="text-2xl text-slate-700 capitalize">Ingin tahu siapa saja tenaga ahli nya?</h1>
      <h2 class="text-3xl capitalize text-slate-800 font-bold">Salam Kenal dari Kami!</h2>
    </div>

    <!-- Swiper Slider -->
    <swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="3"
      :spaceBetween="1"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 2500, disableOnInteraction: false }"
      :modules="modules"
      class="mySwiper"
      :breakpoints="{
        640: { slidesPerView: 1, spaceBetween: 5 },
        1024: { slidesPerView: 3, spaceBetween: 10 }
      }"
    >
      <swiper-slide v-for="(member, index) in teamMembers" :key="index">
        <div class="relative w-64 h-96 shadow-lg dark:bg-gray-800 overflow-hidden group rounded-lg">
          <img class="absolute inset-0 w-full h-full object-cover" :src="member.image" :alt="member.name">
          <div class="absolute inset-0 group-hover:bg-black group-hover:bg-opacity-50 transition duration-300"></div>
          <div class="absolute bottom-0 w-full p-5 text-white transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <h1 class="mb-2 text-2xl font-bold text-white text-center">{{ member.name }}</h1>
            <p class="mb-3 font-normal text-white text-center">{{ member.position }}</p>
          </div>
        </div>
      </swiper-slide>
    </swiper>

  </div>
  </div>
  <div class="bg-slate-200 py-16">
    <div class=" px-6">
        <h1 class="text-3xl font-semibold text-slate-600 ml-5 mb-8">Mengapa Memilih Kami?</h1>
        <ul class="flex justify-between flex-wrap text-left gap-5">
            <li class="flex items-start gap-4 bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition max-w-3xl">
                <span class="text-blue-500 text-2xl">✅</span>
                <span class="text-gray-700">
                    <strong>Berpengalaman & Profesional</strong> – Tim kami terdiri dari para ahli di bidangnya yang siap memberikan solusi terbaik untuk setiap tantangan teknologi yang dihadapi bisnis Anda.
                </span>
            </li>
            <li class="flex items-start gap-4 bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition max-w-3xl">
                <span class="text-blue-500 text-2xl">✅</span>
                <span class="text-gray-700">
                    <strong>Teknologi Terkini</strong> – Kami selalu mengadopsi teknologi terbaru dalam setiap solusi yang kami kembangkan, memastikan bahwa sistem yang Anda gunakan aman, efisien, dan dapat berkembang seiring waktu.
                </span>
            </li>
            <li class="flex items-start gap-4 bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition max-w-3xl">
                <span class="text-blue-500 text-2xl">✅</span>
                <span class="text-gray-700">
                    <strong>Kustomisasi Sesuai Kebutuhan</strong> – Kami memahami bahwa setiap bisnis memiliki kebutuhan unik. Oleh karena itu, kami menghadirkan layanan yang dapat disesuaikan dengan kebutuhan dan tujuan bisnis Anda.
                </span>
            </li>
            <li class="flex items-start gap-4 bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition max-w-3xl">
                <span class="text-blue-500 text-2xl">✅</span>
                <span class="text-gray-700">
                    <strong>Dukungan & Maintenance</strong> – Kami tidak hanya berhenti pada tahap pengembangan. Kami juga menyediakan layanan dukungan dan pemeliharaan agar sistem Anda tetap optimal dan dapat berkembang sesuai kebutuhan bisnis.
                </span>
            </li>
            <li class="flex items-start gap-4 bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition max-w-3xl">
                <span class="text-blue-500 text-2xl">✅</span>
                <span class="text-gray-700">
                    <strong>Komitmen terhadap Kepuasan Klien</strong> – Kepuasan Anda adalah prioritas kami. Kami selalu berusaha memberikan layanan terbaik dengan komunikasi yang transparan dan hasil yang sesuai dengan harapan.
                </span>
            </li>
        </ul>
    </div>
</div>

  </div>
</template>
<script>

import axios from "axios";
import CardArticle from "@/components/CardArticle.vue";
import CardNewsEvent from "@/components/CardNewsEvent.vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import "swiper/css/autoplay";

// import Members from "@/components/Members.vue";
export default {
  components: {
    CardArticle,
    CardNewsEvent,
    Swiper,
    SwiperSlide,
    // Members,
  },
  data() {
    return {
      articles: [], // All articles fetched from API
      newsAndEvents: [], // All news and events fetched from API
      loading: true, // Loading state to show spinner while fetching data
      modules: [EffectCoverflow, Pagination],
      teamMembers: [
        { name: "Muhammad Astrid", position: "Senior Developer", image: "/img/members/acid2.jpg" },
        { name: "Robi Ilham", position: "Senior Developer", image: "/img/members/robi.jpg" },
        { name: "Risma ", position: "Admin IT", image: "/img/members/nina.jpg" },
        { name: "Santo", position: "Senior Developer", image: "/img/members/santo.jpeg" },
        { name: "Rian", position: "Senior Developer", image: "/img/members/rian.jpeg" },
      ],
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
.mySwiper {
  padding-bottom: 40px;
}

.swiper-slide {
  display: flex;
  justify-content: center;
}
</style>
