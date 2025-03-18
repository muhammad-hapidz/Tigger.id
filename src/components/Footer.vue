<template>
    <footer class="bg-gray-700 text-white py-8 bottom-0">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-between gap-1">
          <!-- About Section -->
          <div class="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 class="text-lg font-semibold mb-3">About Us</h3>
            <p class="text-sm text-gray-300 text-justify">
              Di PT Aditya Arta Abadi, kami adalah perusahaan teknologi yang berfokus pada pengembangan solusi digital inovatif untuk membantu bisnis dan organisasi berkembang di era transformasi digital. Dengan pengalaman bertahun-tahun dalam industri IT, kami menghadirkan layanan web development, pengembangan aplikasi Android, konsultasi IT, serta pengembangan aplikasi desktop yang dirancang untuk meningkatkan efisiensi, produktivitas, dan daya saing bisnis Anda.
            </p>
          </div>
  
          <!-- Links Section -->
          <!-- <div class="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 class="text-lg font-semibold mb-3">Quick Links</h3>
            <ul class="text-sm text-gray-300 space-y-2">
              <li><RouterLink to="/" @click="scrollToTop" class="hover:text-white">Home</RouterLink></li>
              <li><RouterLink to="/about" @click="scrollToTop" class="hover:text-white">About Us</RouterLink></li>
              <li><RouterLink to="/news-and-event" @click="scrollToTop" class="hover:text-white">News & Event</RouterLink></li>
              <li><RouterLink to="/article" @click="scrollToTop" class="hover:text-white">Article</RouterLink></li>
              <li><RouterLink to="/tips-and-trick" @click="scrollToTop" class="hover:text-white">Tips & Trick</RouterLink></li>
              <li><RouterLink to="/join-us" @click="scrollToTop" class="hover:text-white">Join Us</RouterLink></li>
            </ul>
          </div> -->
  
          <!-- Social Media Section -->
          <div class="md:w-1/3">
            <h3 class="text-lg font-semibold mb-3">Hubungi Kami</h3>
            <div class="flex space-x-4">
              <!-- EMAIL -->
              <a href="mailto:info@tri3a.com" class="sosial-icon hover:scale-125 duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
<path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path><path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path><polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon><path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path><path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"></path>
</svg>
</a>
                <!-- IG -->
              <a href="https://www.instagram.com/zahraideaprima/" class="text-gray-300 hover:scale-125 duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
<radialGradient id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd5"></stop><stop offset=".328" stop-color="#ff543f"></stop><stop offset=".348" stop-color="#fc5245"></stop><stop offset=".504" stop-color="#e64771"></stop><stop offset=".643" stop-color="#d53e91"></stop><stop offset=".761" stop-color="#cc39a4"></stop><stop offset=".841" stop-color="#c837ab"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><radialGradient id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4168c9"></stop><stop offset=".999" stop-color="#4168c9" stop-opacity="0"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"></path><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"></path>
</svg>
              </a>
            </div>
          </div>
        </div>
  
        <!-- Bottom Section -->
        <div class="mt-8 text-center text-sm text-gray-300">
          &copy; 2025 PT.Aditya Arta Abadi. All rights reserved.
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "Footer",
  

  methods:{
    scrollToTop(){
      window.scrollTo({
        top:0,
        behavior:'smooth',
      })
    }
  }
}
  </script>
  
  <style scoped>
.social-icon:hover img {
  filter: brightness(0) invert(1);
}
</style>
