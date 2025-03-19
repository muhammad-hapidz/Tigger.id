<template>
  <div class="mt-16">
    <div class="mb-20 relative group">
  <!-- Gambar utama -->
  <img src="../../public/img/about2.png" class="w-full" alt="">

  <!-- Overlay hitam dengan opacity 50% -->
  <div class="absolute inset-0 bg-black bg-opacity-60"></div>

  <!-- Kontainer untuk teks di atas gambar -->
  <div class="absolute top-1/3 md:left-10 transform -translate-y-1/4 px-6 py-3">
    <h1 class="text-white text-3xl lg:text-6xl font-bold">Kenali Kami Lebih Jauh</h1>
    <div class="mt-2 mb-2 border-t-[3px] border-white w-1/6 group-hover:w-1/2 transition-all duration-300"></div>
  </div>
</div>


    <div class="mx-4 flex gap-10">
    <img src="../../public/img/about1.svg" alt="">
    <div class="">
      <h1 class="text-slate-800 text-3xl">PT. ADITYA ARTA ABADI</h1>
      <p class="text-slate-600 text-lg mt-5">Di PT. ADITYA ARTA ABADI, kami adalah perusahaan teknologi yang berfokus pada pengembangan solusi digital inovatif untuk membantu bisnis dan organisasi berkembang di era transformasi digital. Dengan pengalaman bertahun-tahun dalam industri IT, kami menghadirkan layanan web development, pengembangan aplikasi Android, konsultasi IT, serta pengembangan aplikasi desktop yang dirancang untuk meningkatkan efisiensi, produktivitas, dan daya saing bisnis Anda.</p>
    </div>
  </div>
  <div class="max-w-6xl mx-auto py-10 px-5">
    <h1 class="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-10">Layanan Kami</h1>
    
    <div class="space-y-6">
        <!-- Web Development -->
        <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-lg md:flex-row max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition">
            <img class="object-cover w-1/4 h-40 rounded-t-lg md:rounded-none md:rounded-s-lg border border-r p-2  hover:scale-110 transition hover:border-none" src="../../public/img/web.svg" alt="Web Development">
            <div class="flex flex-col justify-between p-5 leading-normal">
                <h5 class="text-2xl font-bold text-gray-900 dark:text-white">Web Development</h5>
                <p class="text-gray-700 dark:text-gray-400">Kami membangun website profesional yang responsif, cepat, dan sesuai kebutuhan bisnis Anda.</p>
            </div>
        </div>
        
        <!-- Android Development -->
        <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-lg md:flex-row max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition">
            <img class="object-cover w-1/4 h-50 rounded-t-lg md:rounded-none md:rounded-s-lg border border-r p-2 hover:scale-110 transition hover:border-none" src="../../public/img/android.svg" alt="Android Development">
            <div class="flex flex-col justify-between p-5 leading-normal">
                <h5 class="text-2xl font-bold text-gray-900 dark:text-white">Android Development</h5>
                <p class="text-gray-700 dark:text-gray-400">Kami menyediakan solusi aplikasi Android yang inovatif, cepat, dan mudah digunakan oleh pengguna.</p>
            </div>
        </div>
        
        <!-- IT Consulting -->
        <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-lg md:flex-row max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition">
            <img class="object-cover w-1/4 h-40 rounded-t-lg md:rounded-none md:rounded-s-lg border border-r p-2 hover:scale-110 transition hover:border-none" src="../../public/img/dekstop.svg" alt="IT Consulting">
            <div class="flex flex-col justify-between p-5 leading-normal">
                <h5 class="text-2xl font-bold text-gray-900 dark:text-white">IT Consulting</h5>
                <p class="text-gray-700 dark:text-gray-400">Membantu bisnis Anda dalam perencanaan, implementasi, dan optimasi teknologi terbaik.</p>
            </div>
        </div>

        <!-- IT Consulting -->
        <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-lg md:flex-row max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition">
            <img class="object-cover w-1/4 h-50 rounded-t-lg md:rounded-none md:rounded-s-lg border border-r p-2 hover:scale-110 transition hover:border-none" src="../../public/img/itconsult.svg" alt="IT Consulting">
            <div class="flex flex-col justify-between p-5 leading-normal">
                <h5 class="text-2xl font-bold text-gray-900 dark:text-white">IT Consulting</h5>
                <p class="text-gray-700 dark:text-gray-400">Membantu bisnis Anda dalam perencanaan, implementasi, dan optimasi teknologi terbaik.</p>
            </div>
        </div>
    </div>
    
   
</div>
    <!-- <div class="flex flex-wrap">
      <img src="../../public/img/about2.png" class="w-96" alt="">
      <img src="../../public/img/about2.png" class="w-96" alt="">
      <img src="../../public/img/about2.png" class="w-96" alt="">
      <img src="../../public/img/about2.png" class="w-96" alt="">
      <img src="../../public/img/about2.png" class="w-96" alt="">
      <img src="../../public/img/about2.png" class="w-96" alt="">
      <img src="../../public/img/about2.png" class="w-96" alt="">
    </div> -->
</div>
</template>