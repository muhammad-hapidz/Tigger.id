<template>
  <div class="mt-16">
    <div class="">
      <img src="../../public/img/img.jpg" class="w-full object-cover bg-cover h-[95vh]" alt="">
    </div>
    <div class="px-8 lg:px-40 mt-10">
      <div class="flex">
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
<div class=" px-40 mt-10">
 <div class=" pt-10">
  <h1 class="text-slate-600 text-lg">Siapa saja yang sudah bekerja sama dengan kami ?</h1>
  <h2 class="text-slate-800 text-2xl font-semibold mt-2">Berikut Adalah Perusahaan yang sudah mempercayai dan bekerja sama dengan kami</h2>
 </div>
<div class="flex flex-wrap py-10 gap-16 text-center justify-center">
  <img src="../../public/img/clients/client1.png" alt="" class="w-60 h-40 filter grayscale transition duration-300 hover:filter-none hover:text-black">
  <img src="../../public/img/clients/client2.png" alt="" class="w-60 h-40 filter grayscale transition duration-300 hover:filter-none hover:text-black">
  <img src="../../public/img/clients/client3.png" alt="" class="w-60 h-40 filter grayscale transition duration-300 hover:filter-none hover:text-black">
  <img src="../../public/img/clients/client4.png" alt="" class="w-60 h-40 filter grayscale transition duration-300 hover:filter-none hover:text-black">
  <img src="../../public/img/clients/client5.png" alt="" class="w-60 h-40 filter grayscale transition duration-300 hover:filter-none hover:text-black">
  <img src="../../public/img/clients/client6.png" alt="" class="w-60 h-40 filter grayscale transition duration-300 hover:filter-none">
  <img src="../../public/img/clients/client7.png" alt="" class="w-60 h-40 filter grayscale transition duration-300 hover:filter-none">
  <img src="../../public/img/clients/client8.png" alt="" class="w-60 h-40 filter grayscale transition duration-300 hover:filter-none">
  <img src="../../public/img/clients/client9.png" alt="" class="w-64 h-40 filter grayscale transition duration-300 hover:filter-none">
  <img src="../../public/img/clients/client10.png" alt="" class="w-60 h-40 filter grayscale transition duration-300 hover:filter-none">
  <img src="../../public/img/clients/client11.png" alt="" class="w-60 h-40 filter grayscale transition duration-300 hover:filter-none">
  <img src="../../public/img/clients/client12.png" alt="" class="w-60 h-40 filter grayscale transition duration-300 hover:filter-none">
  <img src="../../public/img/clients/client13.png" alt="" class="w-64 h-40 filter grayscale transition duration-300 hover:filter-none">
  <img src="../../public/img/clients/client14.png" alt="" class="w-64 h-40 filter grayscale transition duration-300 hover:filter-none">
  <img src="../../public/img/clients/client15.png" alt="" class="w-60 h-40 filter grayscale transition duration-300 hover:filter-none">
</div>

  </div>


<div class="bg-slate-100 lg:px-40 pb-10">
   <div class="pt-10 mx-5 pb-8">
     <h1 class="text-2xl font-semibold text-slate-600 tracking-tight"> PORTOFOLIO </h1>
     <h2 class="text-slate-800 text-xl">Berikut Adalah Hasil Dari Pekerjaan Kami</h2> 
    </div>

  <!-- <div class="mt-2 bg-white lg:mx-14 p-2"> -->
    <!-- Input Pencarian dan Dropdown Filter Category -->
    <!-- <div class="flex flex-wrap justify-between lg:mx-10 mb-5 p-5 items-center"> -->
      <!-- Input Pencarian -->
      <!-- <div class="mb-5">
        <input
          v-model="searchQuery"
          @input="applyFilter"
          type="text"
          placeholder="Search News and Events..."
          class="w-full lg:w-80 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> -->

      <!-- Dropdown Filter Category -->
      <!-- <div class="mb-5">
        <select
          v-model="selectedCategory"
          @change="applyFilter"
          class="w-full px-4 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Category</option>
          <option v-for="category in uniqueCategories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
    </div>-->
  <!-- </div>  -->

<div class="flex gap-10 justify-evenly justify-items-start flex-wrap">
<div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
  <div class="">
        <img class="p-8 rounded-t-lg hover:scale-110 transition" src="../../public/img/portofolio/port1.png" alt="Portofolio image" />
      </div>
    <div class="px-5 pb-5">
      <div class="mb-3 px-3 py-2 bg-blue-500 text-white">Web Development</div>
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">SFA (Sales Force Automation)</h5>
        
        <div class="flex items-center mt-2.5 mb-5">
          <p>Digunakan oleh admin untuk pengaturan  data pendukung seperti data customer, data produk, data harga, dll</p>
        </div>
        
    </div>
</div>
<div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
  <div class="">
        <img class="p-8 rounded-t-lg hover:scale-110 transition" src="../../public/img/portofolio/port2.png" alt="Portofolio image" />
      </div>
    <div class="px-5 pb-5">
      <div class="mb-3 px-3 py-2 bg-blue-500 text-white">Web Development</div>
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Monitoring Karyawan</h5>
        
        <div class="flex items-center mt-2.5 mb-5">
          <p>Digunakan oleh perusahaan untuk memonitoring karyawan (daftar hadir, dll)</p>
        </div>
        
    </div>
</div>
<div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
  <div class="">
        <img class="p-8 rounded-t-lg hover:scale-110 transition" src="../../public/img/portofolio/port3.png" alt="Portofolio image" />
      </div>
    <div class="px-5 pb-5">
      <div class="mb-3 px-3 py-2 bg-blue-500 text-white">Web Development</div>
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">E-Procurement</h5>
        
        <div class="flex items-center mt-2.5 mb-5">
          <p>Digunakan oleh admin untuk pengaturan  data pendukung seperti data customer, data produk, data harga, dll</p>
        </div>
        
    </div>
</div>
<div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
  <div class="">
        <img class="p-8 rounded-t-lg hover:scale-110 transition" src="../../public/img/portofolio/port4.png" alt="Portofolio image" />
      </div>
    <div class="px-5 pb-5">
      <div class="mb-3 px-3 py-2 bg-blue-500 text-white">Web Development</div>
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Yayasan Kesejahteraan Pegawai (YKP)</h5>
        
        <div class="flex items-center mt-2.5 mb-5">
          <p>Aplikasi untuk mengelola dana karyawan yang akan di pergunakan untuk karyawan itu sendiri dengan keperluan kesehatan dll</p>
        </div>
        
    </div>
</div>
</div>

    <!-- Tampilkan Loading -->
    <!-- <div v-if="loading" class="flex justify-center items-center py-10">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
    </div> -->

    <!-- Tampilkan Card NewsEvent setelah data dimuat -->
    <!-- <CardNewsEvent v-else :newsAndEvents="paginatedNewsAndEvents" /> -->

    <!-- Tampilkan Pagination -->
    <!-- <div v-if="filteredNewsAndEvents.length > 0" class="flex justify-end mt-10 mb-5 mx-10">
      <button
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
        class="px-4 py-2 bg-slate-400 text-white rounded-l-md hover:bg-slate-600"
      >
        Prev
      </button>
      <span class="mx-4 text-lg">{{ currentPage }}</span>
      <button
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
        class="px-4 py-2 bg-slate-400 text-white rounded-r-md hover:bg-slate-600"
      >
        Next
      </button>
    </div> -->

    <!-- Tampilkan pesan jika tidak ada hasil -->
    <!-- <div v-else class="text-center py-5 text-gray-600">
      <p>No News and Events found.</p>
    </div> -->

    <!-- <div class="my-8 border-t border-gray-300"></div>

    
    <div class="flex flex-wrap justify-around gap-3 pb-8">
      <iframe
        width="560"
        class="rounded-md"
        height="315"
        src="https://www.youtube.com/embed/heZ_f6_9FV0?si=CVDe05g0tGr20HK3"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <iframe
        width="560"
        class="rounded-md"
        height="315"
        src="https://www.youtube.com/embed/mZj37lmOhZQ?si=AKhni1IIMvfV9EzE"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>

      <iframe
        width="560"
        class="rounded-md"
        height="315"
        src="https://www.youtube.com/embed/Cq9IRCKqPnA?si=YDT-u22PXhXZ90Hw"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div> -->
<!-- 
    <div v-if="loadingInstagram" class="flex justify-center items-center py-10">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
    </div> -->

    <!-- IG -->
     <!-- <div v-if="!loadingInstagram" class="flex flex-wrap w-96 mx-10 pb-3 gap-10">
      <blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DDIoeEkTrV9/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/DDIoeEkTrV9/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/DDIoeEkTrV9/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by @tigger.id_official</a></p></div></blockquote>
      <blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DDIoeEkTrV9/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/DDIoeEkTrV9/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/DDIoeEkTrV9/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by @tigger.id_official</a></p></div></blockquote>
      <blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DDIoeEkTrV9/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/DDIoeEkTrV9/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/DDIoeEkTrV9/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by @tigger.id_official</a></p></div></blockquote>
     </div> -->
  </div>
</div>
</template>

<script>
import CardNewsEvent from '@/components/CardNewsEvent.vue';
import axios from 'axios';

export default {
  components: {
    CardNewsEvent,
  },
  data() {
    return {
      newsAndEvents: [],
      searchQuery: "",
      selectedCategory: "",
      currentPage: 1,
      newsPerPage: 5,
      loading: true, // Menambahkan status loading
      loadingInstagram: true,  // Menandakan status loading Instagram
    };
  },
  computed: {
    filteredNewsAndEvents() {
      let filtered = this.newsAndEvents;
      if (this.searchQuery) {
        filtered = filtered.filter((item) =>
          item.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      if (this.selectedCategory) {
        filtered = filtered.filter(
          (item) => item.category.categoryName === this.selectedCategory
        );
      }
      return filtered;
    },
    totalPages() {
      return Math.ceil(this.filteredNewsAndEvents.length / this.newsPerPage);
    },
    paginatedNewsAndEvents() {
      const start = (this.currentPage - 1) * this.newsPerPage;
      const end = start + this.newsPerPage;
      return this.filteredNewsAndEvents.slice(start, end);
    },
    uniqueCategories() {
      const categories = this.newsAndEvents.map((item) => item.category.categoryName);
      return [...new Set(categories)].filter(Boolean);
    },
  },
  methods: {
    async fetchNewsAndEvents() {
      this.loading = true; // Set loading true sebelum mengambil data
      try {
        const response = await axios.get(
          'https://apitiggerid.tri3a.com/api/Contents/BySegmentNewsAndEvent'
        );
        this.newsAndEvents = response.data;
      } catch (error) {
        console.error('Error fetching news and events:', error);
      } finally {
        this.loading = false; // Set loading false setelah proses selesai
      }
    },
    applyFilter() {
      this.currentPage = 1;
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    loadInstagramScript() {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = () => {
        window.instgrm?.Embeds.process(); // Memastikan Instagram embed diproses
        this.loadingInstagram = false;  // Menandakan bahwa loading Instagram selesai
      };
      document.body.appendChild(script);
    },
  },
  mounted() {
    this.fetchNewsAndEvents();
    window.instgrm?.Embeds.process(); // Ini memastikan bahwa semua embed Instagram diproses
    this.loadInstagramScript();
  },
};
</script>
